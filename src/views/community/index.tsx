import MusicLoader from '@/components/music-loader'

import { memo, useEffect, useState } from "react"
import type { FC } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAppSelector } from "@/store"
import {
  BgWrapper,
  CommunityLayout,
  FollowPanel,
  FeedPanel,
  UserCard,
  EventCard,
  ResourceCard,
  Composer,
  EmptyTip,
  SectionTitle,
} from "./style"
import NotLoggedIn from "@/components/Not-logged-in"
import { getFollows, getEvents, getTopicHotEvents, getUserDetails, getSongDetails, getAlbumCovers, shareResource, deleteEvent, likeResource, getEventComments, sendEventComment, deleteEventComment, searchSongs, type FollowUser, type EventItem, type TopicEventItem, type UserDetail, type SongDetail, type SongItem } from "./service"
import { toast } from '@/utils/toast'
import { getImageSize } from "@/utils/format"
import { CustomerServiceOutlined, HeartOutlined, HeartFilled, CommentOutlined, MoreOutlined, DeleteOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons"
import { X } from "lucide-react"

const EVENT_TYPE_MAP: Record<number, string> = {
  18: "分享单曲",
  19: "分享专辑",
  20: "分享歌单",
  22: "分享MV",
  35: "分享节目",
  39: "分享视频",
  13: "分享图片",
}

const RESOURCE_ROUTE: Record<number, string> = {
  18: '/discover/song',      // 分享单曲
  19: '/discover/album',     // 分享专辑
  20: '/discover/playlist',  // 分享歌单
  22: '/discover/song',      // 分享MV → 走单曲
  35: '/discover/program',   // 分享节目
}

const Community: FC = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { isLoggedIn, userId, cookie, profile } = useAppSelector((state) => ({
    isLoggedIn: state.loginUser.isLoggedIn,
    userId: state.loginUser.profile?.userId,
    cookie: state.loginUser.cookie,
    profile: state.loginUser.profile,
  }))

  const [follows, setFollows] = useState<FollowUser[]>([])
  const [topicEvents, setTopicEvents] = useState<TopicEventItem[]>([])
  const [followEvents, setFollowEvents] = useState<EventItem[]>([])
  const [userMap, setUserMap] = useState<Record<number, UserDetail>>({})
  const [songMap, setSongMap] = useState<Record<number, SongDetail>>({})
  const [loading, setLoading] = useState(true)
  const [feedTab, setFeedTab] = useState<'recommend' | 'following'>(
    searchParams.get('tab') === 'following' ? 'following' : 'recommend'
  )

  // 侧边栏点击时同步 tab
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'following') setFeedTab('following')
    else setFeedTab('recommend')
  }, [searchParams])
  const [followLasttime, setFollowLasttime] = useState(-1)
  const [followMore, setFollowMore] = useState(true)
  const [loadingFollowMore, setLoadingFollowMore] = useState(false)
  const [composerText, setComposerText] = useState('')
  const [publishing, setPublishing] = useState(false)
  const [deletingEvId, setDeletingEvId] = useState<string | number | null>(null)
  const [showMenuEvId, setShowMenuEvId] = useState<string | number | null>(null)
  const [showSongPicker, setShowSongPicker] = useState(false)
  const [songSearch, setSongSearch] = useState('')
  const [songResults, setSongResults] = useState<SongItem[]>([])
  const [selectedSong, setSelectedSong] = useState<SongItem | null>(null)
  const [searchingSong, setSearchingSong] = useState(false)
  const [albumCoverMap, setAlbumCoverMap] = useState<Record<number, string>>({})
  const [likedThreads, setLikedThreads] = useState<Set<string>>(new Set())
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({})
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())
  const [commentData, setCommentData] = useState<Record<string, { comments: any[]; loading: boolean; total: number; offset: number; hasMore: boolean }>>({})
  const [commentInput, setCommentInput] = useState<Record<string, string>>({})
  const [sendingComment, setSendingComment] = useState<Set<string>>(new Set())

  const loadTopic = async (cookie: string) => {
    const topic = await getTopicHotEvents(cookie, 111551188, 50)
    setTopicEvents(topic.events)
    // 收集作者 userId 并补全 userMap
    const uids = [...new Set(
      topic.events
        .map((ev) => ev.socialUser?.userId || ev.info.commentThread.resourceInfo.userId)
        .filter(Boolean)
    )]
    if (uids.length > 0) {
      const map = await getUserDetails(uids, cookie)
      setUserMap((prev) => ({ ...prev, ...map }))
    }
    // 收集歌曲 ID 并补全 songMap
    const songIds = [...new Set(
      topic.events
        .map((ev) => {
          try { const p = JSON.parse(ev.json); return p.song?.id || p.album?.id } catch { return 0 }
        })
        .filter(Boolean)
    )] as number[]
    if (songIds.length > 0) {
      const sm = await getSongDetails(songIds, cookie)
      setSongMap((prev) => ({ ...prev, ...sm }))
    }
  }

  useEffect(() => {
    if (!isLoggedIn || !userId || !cookie) return
    setLoading(true)
    Promise.all([
      getFollows(userId, cookie),
      loadTopic(cookie),
      getEvents(cookie, 20),
    ])
      .then(async ([f, , follow]) => {
        setFollows(f)
        setFollowEvents(follow.events)
        setFollowLasttime(follow.lasttime)
        // 收集关注事件中的歌曲 ID
        const fSongIds = [...new Set(
          follow.events.map((ev) => {
            try { const p = JSON.parse(ev.json); return p.song?.id || p.album?.id } catch { return 0 }
          }).filter(Boolean)
        )] as number[]
        if (fSongIds.length > 0) {
          const sm = await getSongDetails(fSongIds, cookie)
          setSongMap((prev) => ({ ...prev, ...sm }))
        }
        setFollowMore(follow.more)
      })
      .finally(() => setLoading(false))
  }, [isLoggedIn, userId, cookie])

  const loadMoreFollow = async () => {
    if (loadingFollowMore || !followMore || !cookie) return
    setLoadingFollowMore(true)
    try {
      const res = await getEvents(cookie, 30, followLasttime)
      setFollowEvents((prev) => [...prev, ...res.events])
      setFollowLasttime(res.lasttime)
      setFollowMore(res.more)
      const ids = [...new Set(
        res.events.map((ev) => {
          try { const p = JSON.parse(ev.json); return p.song?.id || p.album?.id } catch { return 0 }
        }).filter(Boolean)
      )] as number[]
      if (ids.length > 0) {
        const sm = await getSongDetails(ids, cookie)
        setSongMap((prev) => ({ ...prev, ...sm }))
      }
    } finally {
      setLoadingFollowMore(false)
    }
  }

  const handleSongSearch = async () => {
    if (!songSearch.trim()) return
    setSearchingSong(true)
    try {
      const results = await searchSongs(songSearch.trim(), cookie || undefined)
      setSongResults(results)
      // 拉专辑封面
      const albumIds = [...new Set(results.map((s) => (s as any).album?.id || s.al?.id).filter(Boolean))] as number[]
      if (albumIds.length > 0) {
        const covers = await getAlbumCovers(albumIds, cookie || undefined)
        setAlbumCoverMap((prev) => ({ ...prev, ...covers }))
      }
    } finally {
      setSearchingSong(false)
    }
  }

  const handleSelectSong = (song: SongItem) => {
    setSelectedSong(song)
    setShowSongPicker(false)
    setSongSearch('')
    setSongResults([])
  }

  const handlePublish = async () => {
    const text = composerText.trim()
    if ((!text && !selectedSong) || publishing || !cookie) return
    setPublishing(true)
    try {
      const params: any = { msg: text }
      if (selectedSong) {
        params.type = 'song'
        params.id = selectedSong.id
      }
      await shareResource(cookie, params)
      const songName = selectedSong ? `「${selectedSong.name}」` : ''
      const fullText = songName ? (text ? `${songName}\n${text}` : songName) : text
      setComposerText('')
      setSelectedSong(null)
      // 本地乐观插入
      const optimistic: TopicEventItem = {
        threadId: `optimistic_${Date.now()}`,
        discussId: '',
        actName: '',
        insiteForwardCount: 0,
        topEvent: false,
        musicianSay: false,
        typeDesc: '',
        encryptUserId: '',
        socialUser: userId ? { userId, nickname: profile?.nickname || '', avatarUrl: profile?.avatarUrl || '' } : null,
        pics: [],
        json: JSON.stringify({ msg: fullText, song: selectedSong ? { id: selectedSong.id, name: selectedSong.name } : undefined }),
        info: { commentThread: { id: '', resourceInfo: { id: selectedSong?.id || 0, userId: userId || 0, name: selectedSong ? `分享单曲：${selectedSong.name}` : '', eventType: selectedSong ? 18 : 0, imgUrl: selectedSong?.al?.picUrl || null }, resourceTitle: selectedSong ? `分享单曲：${selectedSong.name}` : '', likedCount: 0, shareCount: 0, commentCount: 0 } },
        tailMark: null,
      }
      setTopicEvents((prev) => [optimistic, ...prev])
    } catch {
      toast.error('发布失败')
    } finally {
      setPublishing(false)
    }
  }

  const handleDelete = async (evId: number | string) => {
    if (!cookie || !evId) return
    setDeletingEvId(evId)
    setShowMenuEvId(null)
    try {
      await deleteEvent(cookie, evId)
      setTopicEvents((prev) => prev.filter((ev) => (ev.threadId || ev.discussId) !== String(evId)))
      setFollowEvents((prev) => prev.filter((ev) => ev.id !== evId))
    } catch {
      toast.error('删除失败')
    } finally {
      setDeletingEvId(null)
    }
  }

  /* 点赞 / 取消点赞 */
  const handleLike = async (threadId: string, _cid: string, isLiked: boolean, currentCount: number) => {
    if (!cookie || !threadId) return
    const t = isLiked ? 0 : 1
    // 乐观更新
    setLikedThreads((prev) => {
      const next = new Set(prev)
      if (t === 1) next.add(threadId)
      else next.delete(threadId)
      return next
    })
    setLikeCounts((prev) => ({
      ...prev,
      [threadId]: currentCount + (t === 1 ? 1 : -1),
    }))
    try {
      await likeResource(threadId, _cid, t, cookie)
    } catch (err) {
      console.error('[点赞] 失败:', err)
      // 回滚
      setLikedThreads((prev) => {
        const next = new Set(prev)
        if (t === 1) next.delete(threadId)
        else next.add(threadId)
        return next
      })
      setLikeCounts((prev) => ({
        ...prev,
        [threadId]: (prev[threadId] || 0) + (t === 1 ? -1 : 1),
      }))
    }
  }

  /* 切换评论展开 */
  const handleToggleComments = async (threadId: string) => {
    setExpandedComments((prev) => {
      const next = new Set(prev)
      if (next.has(threadId)) {
        next.delete(threadId)
      } else {
        next.add(threadId)
      }
      return next
    })
    if (!commentData[threadId] && threadId) {
      setCommentData((prev) => ({ ...prev, [threadId]: { comments: [], loading: true, total: 0, offset: 10, hasMore: true } }))
      try {
        const res = await getEventComments(threadId, cookie || '', 0, 10)
        const list = res.comments || res.data?.comments || []
        setCommentData((prev) => ({
          ...prev,
          [threadId]: {
            comments: list,
            loading: false,
            total: res.total || res.data?.total || 0,
            offset: 10,
            hasMore: list.length >= 10,
          },
        }))
      } catch {
        setCommentData((prev) => ({ ...prev, [threadId]: { comments: [], loading: false, total: 0, offset: 0, hasMore: false } }))
      }
    }
  }

  /* 加载更多评论 */
  const handleLoadMoreComments = async (threadId: string) => {
    const data = commentData[threadId]
    if (!data || data.loading || !data.hasMore || !cookie) return
    setCommentData((prev) => ({ ...prev, [threadId]: { ...data, loading: true } }))
    try {
      const res = await getEventComments(threadId, cookie, data.offset, 10)
      const list = res.comments || res.data?.comments || []
      setCommentData((prev) => ({
        ...prev,
        [threadId]: {
          comments: [...data.comments, ...list],
          loading: false,
          total: res.total || res.data?.total || data.total,
          offset: data.offset + 10,
          hasMore: list.length >= 10,
        },
      }))
    } catch {
      setCommentData((prev) => ({ ...prev, [threadId]: { ...data, loading: false } }))
    }
  }

  /* 发送评论（本地缓存） */
  const handleSendComment = async (threadId: string) => {
    const text = (commentInput[threadId] || '').trim()
    if (!text || !cookie || sendingComment.has(threadId)) return
    setSendingComment((prev) => new Set(prev).add(threadId))
    setCommentInput((prev) => ({ ...prev, [threadId]: '' }))
    // 本地乐观插入
    const optimistic: any = {
      commentId: -Date.now(), // 临时 ID，负数标记为本地
      content: text,
      time: Date.now(),
      user: {
        userId: userId!,
        nickname: profile?.nickname || '我',
        avatarUrl: profile?.avatarUrl || '',
      },
      _local: true,
    }
    const cur = commentData[threadId]
    setCommentData((prev) => ({
      ...prev,
      [threadId]: {
        comments: [optimistic, ...(cur?.comments || [])],
        loading: false,
        total: (cur?.total ?? 0) + 1,
        offset: cur?.offset ?? 0,
        hasMore: cur?.hasMore ?? false,
      },
    }))
    try {
      await sendEventComment(threadId, text, cookie)
    } catch {
      // 失败后移除本地评论
      const cur2 = commentData[threadId]
      setCommentData((prev) => ({
        ...prev,
        [threadId]: {
          comments: (cur2?.comments || []).filter((c: any) => c.commentId !== optimistic.commentId),
          loading: false,
          total: Math.max(0, (cur2?.total ?? 0) - 1),
          offset: cur2?.offset ?? 0,
          hasMore: cur2?.hasMore ?? false,
        },
      }))
      toast.error('评论发送失败')
    } finally {
      setSendingComment((prev) => {
        const next = new Set(prev)
        next.delete(threadId)
        return next
      })
    }
  }

  /* 删除评论 */
  const handleDeleteComment = async (threadId: string, commentId: number) => {
    if (!cookie) return
    const curDel = commentData[threadId]
    setCommentData((prev) => ({
      ...prev,
      [threadId]: {
        comments: (curDel?.comments || []).filter((c: any) => c.commentId !== commentId),
        loading: false,
        total: Math.max(0, (curDel?.total ?? 0) - 1),
        offset: curDel?.offset ?? 0,
        hasMore: curDel?.hasMore ?? false,
      },
    }))
    try {
      await deleteEventComment(threadId, commentId, cookie)
    } catch {
      toast.error('删除失败')
    }
  }

  if (!isLoggedIn) {
    return (
      <BgWrapper>
        <NotLoggedIn />
      </BgWrapper>
    )
  }

  const parseFollowJson = (ev: EventItem) => {
    try { return JSON.parse(ev.json) as any } catch { return {} }
  }

  const renderTopicCard = (ev: TopicEventItem) => {
    const info = ev.info.commentThread
    const ri = info.resourceInfo
    const uid = ev.socialUser?.userId || ri.userId
    const author = userMap[uid]
    const avatarUrl = author?.avatarUrl || ""
    const displayName = author?.nickname || `用户 ${uid}`
    const route = RESOURCE_ROUTE[ri.eventType]

    // 解析 json 拿正文和真实资源 ID
    let msg = ""
    let realId = ri.id
    let pj: any = {}
    try {
      pj = JSON.parse(ev.json)
      msg = pj.msg || ""
      if (pj.song) realId = pj.song.id
      else if (pj.album) realId = pj.album.id
      else if (pj.playlist) realId = pj.playlist.id
      else if (pj.program) realId = pj.program.id
    } catch { /* ignore */ }

    const evId = ev.threadId || ev.discussId
    const isOwn = uid === userId

    return (
      <EventCard key={ev.threadId}>
        {isOwn && (
          <div className="ev-own-menu">
            <MoreOutlined
              className="ev-own-trigger"
              onClick={() => setShowMenuEvId(showMenuEvId === evId ? null : evId)}
            />
            {showMenuEvId === evId && (
              <div className="ev-own-dropdown">
                <button onClick={() => handleDelete(evId)} disabled={deletingEvId === evId}>
                  <DeleteOutlined /> {deletingEvId === evId ? '删除中...' : '删除'}
                </button>
              </div>
            )}
          </div>
        )}
        <div className="ev-header">
          <img
            src={getImageSize(avatarUrl, 40)}
            alt={displayName}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/user/${uid}`)}
          />
          <div className="ev-user">
            <span
              className="ev-nickname"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/user/${uid}`)}
            >
              {displayName}
            </span>
            <span className="ev-type">
              {EVENT_TYPE_MAP[ri.eventType] || ev.typeDesc || "动态"}
            </span>
          </div>
        </div>
        {msg && <p className="ev-text">{msg}</p>}
        {route && ri.name && (
          <ResourceCard>
            {songMap[realId]?.al?.picUrl && (
              <img
                className="rc-cover"
                src={getImageSize(songMap[realId].al.picUrl, 96)}
                alt=""
                style={{ cursor: 'pointer' }}
                onClick={(e) => { e.stopPropagation(); navigate(`${route}/${realId}`) }}
              />
            )}
            <div className="rc-info">
              <span
                className="rc-name"
                style={{ cursor: 'pointer', color: '#4A90D9' }}
                onClick={(e) => { e.stopPropagation(); navigate(`${route}/${realId}`) }}
              >
                {ri.name.replace(/^分享单曲：/, '')}
              </span>
              {(songMap[realId]?.ar || pj.song?.ar) && (
                <span className="rc-artist">
                  {(songMap[realId]?.ar || pj.song?.ar).map((a: any, i: number) => (
                    <span key={a.id}>
                      {i > 0 && ' / '}
                      {a.name}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </ResourceCard>
        )}
        {ev.pics && ev.pics.length > 0 && (
          <div className="ev-pics ev-pics--topic">
            {ev.pics.slice(0, 9).map((pic, i) => (
              <img key={i} src={pic.squareUrl || pic.originUrl} alt="" />
            ))}
          </div>
        )}
        <div className="ev-actions">
          <span
            className={`action-item ${likedThreads.has(ev.threadId) ? 'liked' : ''}`}
            onClick={() => handleLike(ev.threadId, ev.discussId, likedThreads.has(ev.threadId), (likeCounts[ev.threadId] ?? info.likedCount) || 0)}
          >
            {likedThreads.has(ev.threadId) ? <HeartFilled /> : <HeartOutlined />}
            {' '}{(likeCounts[ev.threadId] ?? info.likedCount) || 0}
          </span>
          <span
            className={`action-item ${expandedComments.has(ev.threadId) ? 'liked' : ''}`}
            onClick={() => handleToggleComments(ev.threadId)}
          >
            <CommentOutlined /> {info.commentCount || 0}
          </span>
        </div>

        {/* 评论区 */}
        {expandedComments.has(ev.threadId) && (
          <div className="ev-comments">
            {/* 评论输入 - 固定在顶部 */}
            {cookie && (
              <div className="ev-comment-input ev-comment-input--fixed">
                <input
                  placeholder="发表评论..."
                  value={commentInput[ev.threadId] || ''}
                  onChange={(e) => setCommentInput((prev) => ({ ...prev, [ev.threadId]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendComment(ev.threadId)
                  }}
                />
                <button
                  onClick={() => handleSendComment(ev.threadId)}
                  disabled={!commentInput[ev.threadId]?.trim() || sendingComment.has(ev.threadId)}
                >
                  {sendingComment.has(ev.threadId) ? '...' : '发送'}
                </button>
              </div>
            )}

            {/* 评论列表 - 可滚动 */}
            <div className="ev-comments-scroll">
              {commentData[ev.threadId]?.loading && (!commentData[ev.threadId]?.comments?.length) ? (
                <div className="ev-comments-loading"><MusicLoader /></div>
              ) : (
                <>
                  {commentData[ev.threadId]?.comments?.map((c: any) => {
                    const isMine = c._local || c.user?.userId === userId
                    return (
                    <div key={c.commentId} className="ev-comment-item">
                      <img
                        className="c-avatar"
                        src={getImageSize(c.user?.avatarUrl || '', 32)}
                        alt=""
                        onClick={() => c.user?.userId && navigate(`/user/${c.user.userId}`)}
                      />
                      <div className="c-body">
                        <div className="c-meta">
                          <span
                            className="c-nickname"
                            onClick={() => c.user?.userId && navigate(`/user/${c.user.userId}`)}
                          >
                            {c.user?.nickname}
                          </span>
                          <span className="c-time">
                            {c.time ? new Date(c.time).toLocaleDateString('zh-CN') : ''}
                          </span>
                        </div>
                        <div className="c-content">{c.content}</div>
                      </div>
                      {isMine && (
                        <button className="c-del-btn" onClick={() => handleDeleteComment(ev.threadId, c.commentId)}>
                          <X size={14} />
                        </button>
                      )}
                    </div>
                    )
                  })}
                  {(!commentData[ev.threadId] || commentData[ev.threadId]?.comments?.length === 0) && (
                    <div className="ev-comments-empty">暂无评论</div>
                  )}
                </>
              )}

              {/* 加载更多 */}
              {commentData[ev.threadId]?.hasMore && (
                <button
                  className="ev-comments-more"
                  disabled={commentData[ev.threadId]?.loading}
                  onClick={() => handleLoadMoreComments(ev.threadId)}
                >
                  {commentData[ev.threadId]?.loading ? <MusicLoader /> : '加载更多'}
                </button>
              )}
            </div>
          </div>
        )}
      </EventCard>
    )
  }

  const renderFollowCard = (ev: EventItem) => {
    const isOwn = ev.user?.userId === userId
    const pj = parseFollowJson(ev)
    const msg: string = pj.msg || pj.comment || ''
    const song: any = pj.song
    let resRoute: string | undefined
    let resId: number | undefined
    let resName = ev.info?.commentThread?.resourceTitle || ''
    if (song) { resRoute = '/discover/song'; resId = song.id; resName = resName || `分享单曲：${song.name}` }
    else if (pj.album) { resRoute = '/discover/album'; resId = pj.album.id; resName = resName || `分享专辑` }
    else if (pj.playlist) { resRoute = '/discover/playlist'; resId = pj.playlist.id; resName = resName || `分享歌单` }
    else if (pj.program) { resRoute = '/discover/program'; resId = pj.program.id; resName = resName || `分享节目` }

    const tid = ev.threadId || ev.info?.commentThread?.id || `A_EV_2_${ev.user.userId}_${ev.id}`
    const cid = String(ev.id)
    const likeTotal = likeCounts[tid] || ev.info?.commentThread?.likedCount || 0

    return (
    <EventCard key={ev.id}>
      {isOwn && (
        <div className="ev-own-menu">
          <MoreOutlined
            className="ev-own-trigger"
            onClick={() => setShowMenuEvId(showMenuEvId === ev.id ? null : String(ev.id))}
          />
          {showMenuEvId === String(ev.id) && (
            <div className="ev-own-dropdown">
              <button onClick={() => handleDelete(ev.id)} disabled={deletingEvId === ev.id}>
                <DeleteOutlined /> {deletingEvId === ev.id ? '删除中...' : '删除'}
              </button>
            </div>
          )}
        </div>
      )}
      <div className="ev-header">
        <img
          src={getImageSize(ev.user?.avatarUrl || "", 40)}
          alt={ev.user?.nickname || ""}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(`/user/${ev.user.userId}`)}
        />
        <div className="ev-user">
          <span
            className="ev-nickname"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/user/${ev.user.userId}`)}
          >
            {ev.user?.nickname}
          </span>
          <span className="ev-type">
            {EVENT_TYPE_MAP[ev.type] || "动态"}
            {" · "}
            {ev.eventTime
              ? new Date(ev.eventTime).toLocaleDateString("zh-CN")
              : ""}
          </span>
        </div>
      </div>
      {msg && <p className="ev-text">{msg.length > 200 ? msg.slice(0, 200) + '...' : msg}</p>}
      {resRoute && resId && resName && (
        <ResourceCard>
          {songMap[resId]?.al?.picUrl && (
            <img
              className="rc-cover"
              src={getImageSize(songMap[resId].al.picUrl, 96)}
              alt=""
              style={{ cursor: 'pointer' }}
              onClick={(e) => { e.stopPropagation(); navigate(`${resRoute}/${resId}`) }}
            />
          )}
          <div className="rc-info">
            <span
              className="rc-name"
              style={{ cursor: 'pointer', color: '#4A90D9' }}
              onClick={(e) => { e.stopPropagation(); navigate(`${resRoute}/${resId}`) }}
            >
              {resName.replace(/^分享单曲：/, '')}
            </span>
            {(songMap[resId]?.ar || song?.ar) && (
              <span className="rc-artist">
                {(songMap[resId]?.ar || song?.ar).map((a: any, i: number) => (
                  <span key={a.id}>
                    {i > 0 && ' / '}
                    {a.name}
                  </span>
                ))}
              </span>
            )}
          </div>
        </ResourceCard>
      )}
      {ev.pics && ev.pics.length > 0 && (
        <div className="ev-pics ev-pics--topic">
          {ev.pics.slice(0, 9).map((pic, i) => (
            <img key={i} src={pic.squareUrl || pic.originUrl} alt="" />
          ))}
        </div>
      )}
      <div className="ev-actions">
        <span
          className={`action-item ${likedThreads.has(tid) ? 'liked' : ''}`}
          onClick={() => handleLike(tid, cid, likedThreads.has(tid), likeTotal)}
        >
          {likedThreads.has(tid) ? <HeartFilled /> : <HeartOutlined />}
          {' '}{likeTotal}
        </span>
        <span
          className={`action-item ${expandedComments.has(tid) ? 'liked' : ''}`}
          onClick={() => handleToggleComments(tid)}
        >
          <CommentOutlined /> 评论
        </span>
      </div>

      {/* 评论区 */}
      {expandedComments.has(tid) && (
        <div className="ev-comments">
          {/* 评论输入 - 固定在顶部 */}
          {cookie && (
            <div className="ev-comment-input ev-comment-input--fixed">
              <input
                placeholder="发表评论..."
                value={commentInput[tid] || ''}
                onChange={(e) => setCommentInput((prev) => ({ ...prev, [tid]: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendComment(tid)
                }}
              />
              <button
                onClick={() => handleSendComment(tid)}
                disabled={!commentInput[tid]?.trim() || sendingComment.has(tid)}
              >
                {sendingComment.has(tid) ? '...' : '发送'}
              </button>
            </div>
          )}

          {/* 评论列表 - 可滚动 */}
          <div className="ev-comments-scroll">
            {commentData[tid]?.loading && (!commentData[tid]?.comments?.length) ? (
              <div className="ev-comments-loading"><MusicLoader /></div>
            ) : (
              <>
                {commentData[tid]?.comments?.map((c: any) => {
                  const isMine = c._local || c.user?.userId === userId
                  return (
                  <div key={c.commentId} className="ev-comment-item">
                    <img
                      className="c-avatar"
                      src={getImageSize(c.user?.avatarUrl || '', 32)}
                      alt=""
                      onClick={() => c.user?.userId && navigate(`/user/${c.user.userId}`)}
                    />
                    <div className="c-body">
                      <div className="c-meta">
                        <span
                          className="c-nickname"
                          onClick={() => c.user?.userId && navigate(`/user/${c.user.userId}`)}
                        >
                          {c.user?.nickname}
                        </span>
                        <span className="c-time">
                          {c.time ? new Date(c.time).toLocaleDateString('zh-CN') : ''}
                        </span>
                      </div>
                      <div className="c-content">{c.content}</div>
                    </div>
                    {isMine && (
                      <button className="c-del-btn" onClick={() => handleDeleteComment(tid, c.commentId)}>
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  )
                })}
                {(!commentData[tid] || commentData[tid]?.comments?.length === 0) && (
                  <div className="ev-comments-empty">暂无评论</div>
                )}
              </>
            )}

            {/* 加载更多 */}
            {commentData[tid]?.hasMore && (
              <button
                className="ev-comments-more"
                disabled={commentData[tid]?.loading}
                onClick={() => handleLoadMoreComments(tid)}
              >
                {commentData[tid]?.loading ? <MusicLoader /> : '加载更多'}
              </button>
            )}
          </div>
        </div>
      )}
    </EventCard>
    )
  }

  return (
    <BgWrapper $loggedIn>
      <CommunityLayout>
        {/* 中间：发布器（固定顶部）+ 动态流（可滑动） */}
        <FeedPanel>
          <Composer>
            {selectedSong && (
              <div className="composer-attachment">
                <div className="att-info">
                  <span className="att-name">{selectedSong.name}</span>
                  <span className="att-artist">{(selectedSong.ar || (selectedSong as any).artists)?.map((a: any) => a.name).join('/')}</span>
                </div>
                <CloseOutlined className="att-remove" onClick={() => setSelectedSong(null)} />
              </div>
            )}
            <textarea
              className="composer-input"
              placeholder="分享你的音乐动态..."
              rows={2}
              value={composerText}
              onChange={(e) => setComposerText(e.target.value)}
            />
            <div className="composer-actions">
              <button
                className={`action-btn ${selectedSong ? 'active' : ''}`}
                onClick={() => setShowSongPicker(!showSongPicker)}
              >
                <CustomerServiceOutlined /> 歌曲
              </button>
              <button className="publish-btn" disabled={publishing || (!composerText.trim() && !selectedSong)} onClick={handlePublish}>
                {publishing ? '发布中...' : '发布'}
              </button>
            </div>
            {showSongPicker && (
              <div className="composer-song-picker">
                <div className="song-search-bar">
                  <input
                    placeholder="搜索歌曲..."
                    value={songSearch}
                    onChange={(e) => setSongSearch(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSongSearch() }}
                  />
                  <button onClick={handleSongSearch} disabled={searchingSong}>
                    <SearchOutlined />
                  </button>
                </div>
                {songResults.length > 0 && (
                  <div className="song-results">
                    {songResults.map((s) => {
                      const albumId = (s as any).album?.id || s.al?.id
                      const pic = albumCoverMap[albumId] || (s as any).al?.picUrl || (s as any).album?.picUrl || ''
                      return (
                      <div key={s.id} className="song-item" onClick={() => handleSelectSong(s)}>
                        {pic ? (
                          <img className="si-cover" src={getImageSize(pic, 60)} alt="" />
                        ) : (
                          <div className="si-cover si-cover-placeholder" />
                        )}
                        <span className="si-name">{s.name}</span>
                        <span className="si-sep"> - </span>
                        <span className="si-artist">{(s.ar || (s as any).artists)?.map((a: any) => a.name).join('/')}</span>
                      </div>
                    )})}
                  </div>
                )}
                {searchingSong && <div className="song-searching">搜索中...</div>}
                {!searchingSong && songResults.length === 0 && songSearch.trim() && (
                  <div className="song-empty">无结果</div>
                )}
              </div>
            )}
          </Composer>

          <div className="feed-tabs">
            <button
              className={`tab-item ${feedTab === 'recommend' ? 'active' : ''}`}
              onClick={() => { setFeedTab('recommend'); setSearchParams({}) }}
            >
              推荐
            </button>
            <button
              className={`tab-item ${feedTab === 'following' ? 'active' : ''}`}
              onClick={() => { setFeedTab('following'); setSearchParams({ tab: 'following' }) }}
            >
              关注
            </button>
          </div>

          <div className="feed-scroll">
            {loading && <EmptyTip><MusicLoader /></EmptyTip>}
            {!loading && feedTab === 'recommend' && topicEvents.length === 0 && (
              <EmptyTip>暂无推荐</EmptyTip>
            )}
            {!loading && feedTab === 'following' && followEvents.length === 0 && (
              <EmptyTip>关注的人暂无动态</EmptyTip>
            )}
            {feedTab === 'recommend'
              ? topicEvents.map(renderTopicCard)
              : followEvents.map(renderFollowCard)}
            {feedTab === 'following' && followMore && (
              <button
                className="load-more-btn"
                disabled={loadingFollowMore}
                onClick={loadMoreFollow}
              >
                {loadingFollowMore ? <MusicLoader /> : '加载更多'}
              </button>
            )}
          </div>
        </FeedPanel>

        {/* 右列：关注的人 */}
        <FollowPanel>
          <SectionTitle>关注的人</SectionTitle>
          {loading && <EmptyTip><MusicLoader /></EmptyTip>}
          {!loading && follows.length === 0 && <EmptyTip>暂无关注</EmptyTip>}
          {follows.map((u) => (
            <UserCard key={u.userId}>
              <img
                src={getImageSize(u.avatarUrl, 44)}
                alt={u.nickname}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/user/${u.userId}`)}
              />
              <div className="info">
                <span
                  className="name"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/user/${u.userId}`)}
                >
                  {u.nickname}
                </span>
                {u.signature && <span className="sig">{u.signature}</span>}
              </div>
            </UserCard>
          ))}
        </FollowPanel>
      </CommunityLayout>
    </BgWrapper>
  )
}

export default memo(Community)
