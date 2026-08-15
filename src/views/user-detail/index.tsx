import MusicLoader from '@/components/music-loader'

import { memo, useEffect, useState, useCallback } from 'react'
import type { FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store'
import { Headphones, LibraryBig, Heart, Activity, Play } from 'lucide-react'
import { HeartOutlined, HeartFilled, CommentOutlined, RetweetOutlined, MoreOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  BgWrapper,
  DetailLayout,
  HeaderCard,
  ActionBtn,
  TabBar,
  TabItem,
  CardGrid,
  PlaylistCard,
  SongRow,
  SongCard,
  EventCard,
  SectionTitle,
  ViewMore,
  EmptyTip,
  Divider,
  LoadMoreBtn,
} from './style'
import { getUserDetail, getUserPlaylists, getRecentSongs, getUserEvents, followUser, type UserProfile, type UserPlaylist, type UserEventItem, type RecentSong } from './service'
import { deleteEvent, getSongDetails, likeResource, forwardEvent, type SongDetail } from '../community/service'
import { ResourceCard } from '../community/style'
import { toast } from '@/utils/toast'
import { getImageSize } from '@/utils/format'
import { playPlaylistAction } from '@/views/player/store/player'

type Tab = 'home' | 'playlist' | 'event' | 'favorite'

const EVENT_TYPE_MAP: Record<number, string> = {
  13: '分享图片', 18: '分享单曲', 19: '分享专辑',
  20: '分享歌单', 22: '分享MV', 35: '分享节目', 39: '分享视频',
}

const UserDetail: FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const uid = Number(id)
  const { cookie } = useAppSelector((state) => ({ cookie: state.loginUser.cookie }))

  const [profile, setProfile] = useState<UserProfile>()
  const [playlists, setPlaylists] = useState<UserPlaylist[]>([])
  const [recentSongs, setRecentSongs] = useState<RecentSong['data'][]>([])
  const [events, setEvents] = useState<UserEventItem[]>([])
  const [songMap, setSongMap] = useState<Record<number, SongDetail>>({})
  const [tab, setTab] = useState<Tab>('home')
  const [loading, setLoading] = useState(true)
  const [eventsLoading, setEventsLoading] = useState(false)
  const [eventLasttime, setEventLasttime] = useState(-1)
  const [sigExpanded, setSigExpanded] = useState(false)
  const [eventMore, setEventMore] = useState(true)
  const [showMenuEvId, setShowMenuEvId] = useState<number | null>(null)
  const [deletingEvId, setDeletingEvId] = useState<number | null>(null)
  const [likedThreads, setLikedThreads] = useState<Set<string>>(new Set())
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({})
  const [following, setFollowing] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)

  async function handleFollow() {
    if (!cookie) { toast.warning('请先登录'); return }
    if (followLoading || !uid) return
    setFollowLoading(true)
    const t = following ? 0 : 1
    try {
      const res: any = await followUser(uid, t, cookie)
      if (res.code === 200) {
        setFollowing(!following)
        toast.success(t ? '已关注' : '已取消关注')
      } else {
        toast.error(res.message || '操作失败')
      }
    } catch {
      toast.error('操作失败，请稍后重试')
    } finally {
      setFollowLoading(false)
    }
  }

  function handlePlayClick(e: React.MouseEvent, playlistId: number) {
    e.stopPropagation()
    dispatch(playPlaylistAction(playlistId))
  }

  useEffect(() => {
    if (!uid) return
    setLoading(true)
    Promise.all([
      getUserDetail(uid, cookie || undefined),
      getUserPlaylists(uid, cookie || undefined),
      getRecentSongs(uid, cookie || undefined),
      getUserEvents(uid, cookie || undefined, 10),
    ]).then(([p, pl, songs, ev]) => {
      setProfile(p)
      setPlaylists(pl)
      setRecentSongs(songs)
      setEvents(ev.events)
      setEventLasttime(ev.lasttime)
      setEventMore(ev.more)
      fetchSongCovers(ev.events)
    }).finally(() => setLoading(false))
  }, [uid, cookie])

  const loadMoreEvents = useCallback(async () => {
    if (eventsLoading || !eventMore) return
    setEventsLoading(true)
    try {
      const res = await getUserEvents(uid, cookie || undefined, 20, eventLasttime)
      setEvents((prev) => [...prev, ...res.events])
      setEventLasttime(res.lasttime)
      setEventMore(res.more)
      fetchSongCovers(res.events)
    } finally { setEventsLoading(false) }
  }, [uid, cookie, eventsLoading, eventMore, eventLasttime])

  const fetchSongCovers = async (evts: UserEventItem[]) => {
    const ids = [...new Set(
      evts.map((ev) => {
        try { const p = JSON.parse(ev.json); return p.song?.id || p.album?.id } catch { return 0 }
      }).filter(Boolean)
    )] as number[]
    if (ids.length > 0) {
      const sm = await getSongDetails(ids, cookie || undefined)
      setSongMap((prev) => ({ ...prev, ...sm }))
    }
  }

  const handleDeleteEvent = async (evId: number) => {
    if (!cookie) { toast.warning('请先登录'); return }
    if (!evId) return
    setDeletingEvId(evId)
    setShowMenuEvId(null)
    try {
      await deleteEvent(cookie || '', evId)
      setEvents((prev) => prev.filter((ev) => ev.id !== evId))
    } catch {
      toast.error('删除失败')
    } finally {
      setDeletingEvId(null)
    }
  }

  /* 点赞 */
  const handleLike = async (threadId: string, cid: string, isLiked: boolean, currentCount: number) => {
    if (!cookie) { toast.warning('请先登录'); return }
    if (!threadId) return
    const t = isLiked ? 0 : 1
    setLikedThreads((prev) => {
      const next = new Set(prev)
      if (t === 1) {
        next.add(threadId)
      } else {
        next.delete(threadId)
      }
      return next
    })
    setLikeCounts((prev) => ({
      ...prev,
      [threadId]: currentCount + (t === 1 ? 1 : -1),
    }))
    try {
      await likeResource(threadId, cid, t, cookie)
    } catch (_err) {
      setLikedThreads((prev) => {
        const next = new Set(prev)
        if (t === 1) next.delete(threadId)
        else next.add(threadId)
        return next
      })
    }
  }

  /* 转发 */
  const handleForward = async (evId: string, uid: number) => {
    if (!cookie) { toast.warning('请先登录'); return }
    if (!evId) return
    try {
      await forwardEvent(evId, uid, cookie)
      toast.success('转发成功')
    } catch { toast.error('转发失败') }
  }

  const created = playlists.filter((pl) => pl.creator?.userId === uid)
  const collected = playlists.filter((pl) => pl.creator?.userId !== uid)

  const renderEventContent = (ev: UserEventItem) => {
    try {
      const p = JSON.parse(ev.json)
      const msg = p.msg || p.comment || ''
      return msg.length > 300 ? msg.slice(0, 300) + '...' : msg
    } catch { return '' }
  }

  const renderEventCard = (ev: UserEventItem) => {
    const isOwn = ev.user?.userId === Number(uid)
    let pj: any = {}
    try { pj = JSON.parse(ev.json) } catch { /* */ }
    const song = pj.song as any
    const msg: string = pj.msg || pj.comment || ''
    const resName = ev.info?.commentThread?.resourceTitle || (song && `分享单曲：${song.name}`) || ''
    const resId = song?.id || pj.album?.id || pj.playlist?.id
    const resRoute = song ? '/discover/song' : pj.album ? '/discover/album' : pj.playlist ? '/discover/playlist' : ''
    return (
      <EventCard key={ev.id}>
        {isOwn && (
          <div className="ev-own-menu">
            <MoreOutlined
              className="ev-own-trigger"
              onClick={() => setShowMenuEvId(showMenuEvId === ev.id ? null : ev.id)}
            />
            {showMenuEvId === ev.id && (
              <div className="ev-own-dropdown">
                <button onClick={() => handleDeleteEvent(ev.id)} disabled={deletingEvId === ev.id}>
                  <DeleteOutlined /> {deletingEvId === ev.id ? '删除中...' : '删除'}
                </button>
              </div>
            )}
          </div>
        )}
        <div className="ev-header">
          <img src={getImageSize(ev.user?.avatarUrl || '', 72)} alt="" />
          <div className="ev-user">
            <span className="ev-name">{ev.user?.nickname}</span>
            <span className="ev-meta">
              {EVENT_TYPE_MAP[ev.type] || '动态'}
              {' · '}{new Date(ev.eventTime).toLocaleDateString('zh-CN')}
            </span>
          </div>
        </div>
        {msg && <div className="ev-text">{msg.length > 300 ? msg.slice(0, 300) + '...' : msg}</div>}
        {resRoute && resId && resName && (
          <ResourceCard>
            {songMap[resId]?.al?.picUrl && (
              <img className="rc-cover" src={getImageSize(songMap[resId].al.picUrl, 96)} alt="" />
            )}
            <div className="rc-info">
              <span className="rc-name">{resName.replace(/^分享单曲：/, '')}</span>
              {songMap[resId]?.ar && (
                <span className="rc-artist">{songMap[resId].ar.map((a: any) => a.name).join(' / ')}</span>
              )}
            </div>
          </ResourceCard>
        )}
        {ev.pics?.length > 0 && (
          <div className="ev-pics">
            {ev.pics.slice(0, 9).map((pic, i) => (
              <img key={i} src={pic.squareUrl || pic.originUrl} alt="" />
            ))}
          </div>
        )}
        <div className="ev-actions">
          <span
            className={`action-item ${likedThreads.has(String(ev.id)) ? 'liked' : ''}`}
            onClick={() => handleLike(String(ev.id), String(ev.id), likedThreads.has(String(ev.id)), likeCounts[String(ev.id)] || 0)}
          >
            {likedThreads.has(String(ev.id)) ? <HeartFilled /> : <HeartOutlined />}
            {' '}{likeCounts[String(ev.id)] || 0}
          </span>
          <span className="action-item"><CommentOutlined /> 评论</span>
          <span
            className="action-item"
            onClick={() => handleForward(String(ev.id), ev.user?.userId)}
          >
            <RetweetOutlined /> 分享
          </span>
        </div>
      </EventCard>
    )
  }

  if (loading) return <BgWrapper><EmptyTip><MusicLoader /></EmptyTip></BgWrapper>
  if (!profile) return <BgWrapper><EmptyTip>用户不存在</EmptyTip></BgWrapper>

  return (
    <BgWrapper>
      <DetailLayout>
        {/* ---- Header ---- */}
        <HeaderCard>
          <img className="avatar" src={getImageSize(profile.avatarUrl, 192)} alt="" />
          <div className="detail">
            <div className="nickname">{profile.nickname}</div>
            <div className="stats">
              <span><strong>{profile.follows}</strong> 关注</span>
              <span><strong>{profile.followeds}</strong> 粉丝</span>
              <span><strong>{created.length}</strong> 歌单</span>
              <span><strong>{profile.eventCount || 0}</strong> 动态</span>
            </div>
            {profile.signature && (
  <div className="sig">
    <strong>个人介绍：</strong>
    {sigExpanded ? (
      <>
        {profile.signature}
        <span className="sig-toggle" onClick={() => setSigExpanded(false)}> 收起</span>
      </>
    ) : (
      <>
        {profile.signature.length > 60
          ? profile.signature.slice(0, 60) + '...'
          : profile.signature}
        {profile.signature.length > 60 && (
          <span className="sig-toggle" onClick={() => setSigExpanded(true)}>展开</span>
        )}
      </>
    )}
  </div>
)}
          </div>
          <div className="actions">
            <ActionBtn $primary onClick={handleFollow} disabled={followLoading}>
              {followLoading ? '...' : following ? '已关注' : '+ 关注'}
            </ActionBtn>
          </div>
        </HeaderCard>

        {/* ---- Tab ---- */}
        <TabBar>
          {(['home', 'playlist', 'event', 'favorite'] as Tab[]).map((t) => (
            <TabItem key={t} $active={tab === t} onClick={() => setTab(t)}>
              {{ home: '主页', playlist: '歌单', event: '动态', favorite: '收藏' }[t]}
            </TabItem>
          ))}
        </TabBar>

        {/* ---- 主页 ---- */}
        {tab === 'home' && (
          <>
            {/* 🎵 最近在听 */}
            {recentSongs.length > 0 && (
              <>
                <SectionTitle><Headphones size={18} /> 最近在听</SectionTitle>
                <SongRow>
                  {recentSongs.slice(0, 4).map((s) => (
                    <SongCard key={s.id} onClick={() => navigate(`/discover/song/${s.id}`)}>
                      <img className="cover" src={getImageSize(s.al?.picUrl || '', 96)} alt="" />
                      <div className="info">
                        <div className="name">{s.name}</div>
                        <div className="artist">{s.ar?.map((a) => a.name).join('/')}</div>
                      </div>
                    </SongCard>
                  ))}
                </SongRow>
                <Divider />
              </>
            )}

            {/* 📀 最近创建歌单 */}
            {created.length > 0 && (
              <>
                <SectionTitle>
                  <LibraryBig size={18} /> 最近创建歌单
                  <ViewMore onClick={() => setTab('playlist')}>查看全部 →</ViewMore>
                </SectionTitle>
                <CardGrid>
                  {created.slice(0, 6).map((pl) => (
                    <PlaylistCard key={pl.id} onClick={() => navigate(`/discover/playlist/${pl.id}`)}>
                      <div className="cover-wrap">
                        <img className="cover" src={getImageSize(pl.coverImgUrl, 200)} alt="" />
                        <div
                          className="cover-overlay"
                          onClick={(e) => handlePlayClick(e, pl.id)}
                        >
                          <Play className="play-icon" />
                        </div>
                      </div>
                      <div className="meta">
                        <div className="name">{pl.name}</div>
                        <div className="count">{pl.trackCount} 首</div>
                      </div>
                    </PlaylistCard>
                  ))}
                </CardGrid>
                <Divider />
              </>
            )}

            {/* ❤️ 最近收藏 */}
            {collected.length > 0 && (
              <>
                <SectionTitle>
                  <Heart size={18} /> 最近收藏
                  <ViewMore onClick={() => setTab('favorite')}>查看全部 →</ViewMore>
                </SectionTitle>
                <CardGrid>
                  {collected.slice(0, 6).map((pl) => (
                    <PlaylistCard key={pl.id} onClick={() => navigate(`/discover/playlist/${pl.id}`)}>
                      <div className="cover-wrap">
                        <img className="cover" src={getImageSize(pl.coverImgUrl, 200)} alt="" />
                        <div
                          className="cover-overlay"
                          onClick={(e) => handlePlayClick(e, pl.id)}
                        >
                          <Play className="play-icon" />
                        </div>
                      </div>
                      <div className="meta">
                        <div className="name">{pl.name}</div>
                        <div className="count">{pl.trackCount} 首</div>
                      </div>
                    </PlaylistCard>
                  ))}
                </CardGrid>
                <Divider />
              </>
            )}

            {/* 📝 最新动态 */}
            {events.length > 0 && (
              <>
                <SectionTitle>
                  <Activity size={18} /> 最新动态
                  <ViewMore onClick={() => setTab('event')}>查看全部 →</ViewMore>
                </SectionTitle>
                {events.slice(0, 3).map(renderEventCard)}
              </>
            )}

            {recentSongs.length === 0 && created.length === 0 && collected.length === 0 && events.length === 0 && (
              <EmptyTip>暂无内容</EmptyTip>
            )}
          </>
        )}

        {/* ---- 歌单 ---- */}
        {tab === 'playlist' && (
          created.length > 0 ? (
            <CardGrid>
              {created.map((pl) => (
                <PlaylistCard key={pl.id} onClick={() => navigate(`/discover/playlist/${pl.id}`)}>
                  <div className="cover-wrap">
                    <img className="cover" src={getImageSize(pl.coverImgUrl, 200)} alt="" />
                    <div className="cover-overlay">
                      <Play className="play-icon" />
                    </div>
                  </div>
                  <div className="meta">
                    <div className="name">{pl.name}</div>
                    <div className="count">{pl.trackCount} 首 · {pl.playCount.toLocaleString()} 次播放</div>
                  </div>
                </PlaylistCard>
              ))}
            </CardGrid>
          ) : <EmptyTip>暂无歌单</EmptyTip>
        )}

        {/* ---- 动态 ---- */}
        {tab === 'event' && (
          events.length > 0 ? (
            <>
              {events.map(renderEventCard)}
              {eventMore && (
                <LoadMoreBtn disabled={eventsLoading} onClick={loadMoreEvents}>
                  {eventsLoading ? <span style={{display:"inline-flex",alignItems:"center"}}><MusicLoader /></span> : "加载更多"}
                </LoadMoreBtn>
              )}
            </>
          ) : <EmptyTip>暂无动态</EmptyTip>
        )}

        {/* ---- 收藏 ---- */}
        {tab === 'favorite' && (
          collected.length > 0 ? (
            <CardGrid>
              {collected.map((pl) => (
                <PlaylistCard key={pl.id} onClick={() => navigate(`/discover/playlist/${pl.id}`)}>
                  <div className="cover-wrap">
                    <img className="cover" src={getImageSize(pl.coverImgUrl, 200)} alt="" />
                    <div className="cover-overlay">
                      <Play className="play-icon" />
                    </div>
                  </div>
                  <div className="meta">
                    <div className="name">{pl.name}</div>
                    <div className="count">{pl.trackCount} 首</div>
                  </div>
                </PlaylistCard>
              ))}
            </CardGrid>
          ) : <EmptyTip>暂无收藏</EmptyTip>
        )}
      </DetailLayout>
    </BgWrapper>
  )
}

export default memo(UserDetail)
