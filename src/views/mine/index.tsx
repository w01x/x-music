import MusicLoader from '@/components/music-loader'

import { memo, useEffect, useState, useMemo } from "react"
import type { ReactNode, FC } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "@/store"
import {
  BgWrapper,
  PlaylistLayout,
  PlaylistNav,
  NavSection,
  NavItem,
  TrackListSection,
  PlaylistHeader,
  EmptyTip,
  SectionTitle,
} from "./style"
import NotLoggedIn from "@/components/Not-logged-in"
import SongListTable from "@/components/song-list-table"
import type { ISongItem } from "@/components/song-list-table"
import { getUserPlaylist, getPlaylistTracks, subscribePlaylist, deletePlaylist, removeFromPlaylist, type PlaylistItem, type PlaylistDetail } from "./service/playlist"
import { useCreatePlaylist } from "@/hooks/useCreatePlaylist"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { getRecentSongs } from "./service/recent"
import { CreateBtn } from "./style"
import ToastMessage from "@/components/toast-message"
import { getImageSize, cleanName } from "@/utils/format"

interface IProps {
  children?: ReactNode
}

const ACTIVE_RECENT = -1

const Mine: FC<IProps> = () => {
  const navigate = useNavigate()
  const { isLoggedIn, userId, cookie } = useAppSelector((state) => ({
    isLoggedIn: state.loginUser.isLoggedIn,
    userId: state.loginUser.profile?.userId,
    cookie: state.loginUser.cookie,
  }))

  const [list, setList] = useState<PlaylistItem[]>([])
  const [activeId, setActiveId] = useState<number | null>(null)
  const [tracks, setTracks] = useState<ISongItem[]>([])
  const [detail, setDetail] = useState<PlaylistDetail | null>(null)
  const [tracksLoading, setTracksLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean
    type: "playlist" | "song"
    id: number
    name: string
    loading: boolean
  }>({ open: false, type: "playlist", id: 0, name: "", loading: false })

  /* ---- 最近播放 ---- */
  const [recentSongs, setRecentSongs] = useState<ISongItem[]>([])
  const [recentLoading, setRecentLoading] = useState(false)
  const [displayCount, setDisplayCount] = useState(100)

  useEffect(() => {
    if (!isLoggedIn || !userId || !cookie) return
    setLoading(true)
    getUserPlaylist(userId, cookie)
      .then((data) => {
        setList(data)
        if (data.length > 0) setActiveId(data[0].id)
      })
      .finally(() => setLoading(false))
  }, [isLoggedIn, userId, cookie])

  /* 切换歌单时拉取详情 + 歌曲列表 */
  useEffect(() => {
    if (activeId == null || !cookie) return
    if (activeId === ACTIVE_RECENT) return // 最近播放不拉歌单

    setTracksLoading(true)
    setTracks([])
    setDetail(null)
    getPlaylistTracks(activeId, cookie)
      .then(({ detail, songs }) => {
        setDetail(detail)
        setTracks(songs)
      })
      .finally(() => setTracksLoading(false))
  }, [activeId, cookie])

  /* 最近播放：拉取歌曲 */
  useEffect(() => {
    if (activeId !== ACTIVE_RECENT || !cookie) return
    setRecentLoading(true)
    getRecentSongs(cookie)
      .then((songs) => {
        setRecentSongs(songs)
      })
      .catch(() => {
        setRecentSongs([])
      })
      .finally(() => {
        setRecentLoading(false)
      })
  }, [activeId, cookie])

  const { created, collected } = useMemo(() => {
    const created: PlaylistItem[] = []
    const collected: PlaylistItem[] = []
    for (const item of list) {
      if (item.creator?.userId === userId) {
        created.push(item)
      } else {
        collected.push(item)
      }
    }
    return { created, collected }
  }, [list, userId])

  const handleSubscribe = async () => {
    if (!activeId || !detail || !cookie) return
    const t = detail.subscribed ? 2 : 1
    await subscribePlaylist(t, activeId, cookie)
    setDetail({ ...detail, subscribed: !detail.subscribed })
  }

  const refreshList = async () => {
    if (!userId || !cookie) return
    const data = await getUserPlaylist(userId, cookie)
    setList(data)
    if (!data.find((i) => i.id === activeId)) {
      setActiveId(data.length > 0 ? data[0].id : null)
    }
  }

  const {
    collectModal,
    openModal,
    closeCollectModal,
    setPlaylistName,
    confirmCreatePlaylist,
  } = useCreatePlaylist({ onSuccess: refreshList })

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const item = list.find((i) => i.id === id)
    setDeleteDialog({ open: true, type: "playlist", id, name: item?.name || "", loading: false })
  }

  const confirmDelete = async (e?: React.MouseEvent) => {
    e?.preventDefault()
    const { type, id } = deleteDialog
    setDeleteDialog((prev) => ({ ...prev, loading: true }))
    if (type === "playlist") {
      setDeleting(id)
      try {
        await deletePlaylist(id, cookie!)
        await refreshList()
      } finally {
        setDeleting(null)
        setDeleteDialog({ open: false, type: "playlist", id: 0, name: "", loading: false })
      }
    } else {
      if (!activeId || !cookie) return
      try {
        await removeFromPlaylist(activeId, [id], cookie)
        setTracks((prev) => prev.filter((t) => t.id !== id))
        setDetail((prev) => prev ? { ...prev, trackCount: prev.trackCount - 1 } : null)
        setDeleteDialog({ open: false, type: "song", id: 0, name: "", loading: false })
      } catch {
        setDeleteDialog({ open: false, type: "song", id: 0, name: "", loading: false })
      }
    }
  }

  const handleDeleteSong = (songId: number) => {
    if (!activeId || !cookie) return
    const song = tracks.find((t) => t.id === songId)
    setDeleteDialog({ open: true, type: "song", id: songId, name: song?.name || "", loading: false })
  }

  const handleLoadMore = () => {
    setDisplayCount(300)
  }

  if (!isLoggedIn) {
    return (
      <BgWrapper>
        <NotLoggedIn />
      </BgWrapper>
    )
  }

  const activeItem = list.find((i) => i.id === activeId)

  const renderNavList = (items: PlaylistItem[], isOwn = false) =>
    items.map((item) => (
      <NavItem
        key={item.id}
        $active={item.id === activeId}
        onClick={() => setActiveId(item.id)}
      >
        <img src={item.coverImgUrl} alt={item.name} />
        <div className="info">
          <span className="name">{item.name}</span>
          <span className="count">{item.trackCount}首</span>
        </div>
        {isOwn && (
          <button
            className="delete-btn"
            disabled={deleting === item.id}
            onClick={(e) => handleDelete(item.id, e)}
            title="删除歌单"
          >
            {deleting === item.id ? "..." : "×"}
          </button>
        )}
      </NavItem>
    ))

  return (
    <BgWrapper $loggedIn>
      <PlaylistLayout>
        {/* 左侧歌单导航 */}
        <PlaylistNav>
          {loading && <EmptyTip><MusicLoader /></EmptyTip>}
          {!loading && list.length === 0 && <EmptyTip>暂无歌单</EmptyTip>}

          {/* 我创建的歌单 — 上半部分 */}
          <NavSection>
            <SectionTitle>
              我创建的歌单
              <CreateBtn onClick={() => openModal()} title="新建歌单">+</CreateBtn>
            </SectionTitle>

            <NavItem
              $active={activeId === ACTIVE_RECENT}
              onClick={() => setActiveId(ACTIVE_RECENT)}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" style={{ borderRadius: 4, flexShrink: 0 }}>
                <rect width="40" height="40" rx="4" fill="#2a2a2a" />
                <circle cx="20" cy="20" r="10" fill="none" stroke="#888" strokeWidth="2" />
                <line x1="20" y1="20" x2="20" y2="14" stroke="#FF4D4F" strokeWidth="2" strokeLinecap="round" />
                <line x1="20" y1="20" x2="25" y2="20" stroke="#FF4D4F" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="info">
                <span className="name">最近播放的歌曲</span>
                <span className="count">{recentSongs.length > 0 ? `${recentSongs.length}首` : ''}</span>
              </div>
            </NavItem>

            {created.length > 0 && renderNavList(created, true)}
          </NavSection>

          {/* 我收藏的歌单 — 下半部分 */}
          {collected.length > 0 && (
            <NavSection>
              <SectionTitle>我收藏的歌单</SectionTitle>
              {renderNavList(collected)}
            </NavSection>
          )}
        </PlaylistNav>

        {/* 右侧 */}
        <TrackListSection>
          {/* ---- 最近播放 ---- */}
          {activeId === ACTIVE_RECENT && (
            <>
              {recentLoading && <EmptyTip><MusicLoader /></EmptyTip>}
              {!recentLoading && recentSongs.length > 0 && (
                <>
                  <div className="track-header">
                    <h3>最近播放</h3>
                    <span className="track-count">{recentSongs.length} 首歌</span>
                  </div>
                  <SongListTable songs={recentSongs.slice(0, displayCount)} showCover />
                  {displayCount < recentSongs.length && (
                    <div style={{ textAlign: "center", padding: "24px 0" }}>
                      <button
                        onClick={handleLoadMore}
                        style={{
                          height: 36,
                          padding: "0 32px",
                          background: "transparent",
                          border: "1px solid #FF4D4F",
                          borderRadius: 4,
                          color: "#FF4D4F",
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                      >
                        加载更多
                      </button>
                    </div>
                  )}
                </>
              )}
              {!recentLoading && recentSongs.length === 0 && (
                <EmptyTip>暂无最近播放的歌曲</EmptyTip>
              )}
            </>
          )}

          {/* ---- 歌单 ---- */}
          {activeId !== ACTIVE_RECENT && (
            <>
              {tracksLoading && <EmptyTip><MusicLoader /></EmptyTip>}

              {!tracksLoading && detail && (
                <>
                  <PlaylistHeader>
                    <img
                      className="cover"
                      src={getImageSize(detail.coverImgUrl, 120)}
                      alt={detail.name}
                      style={{ cursor: activeItem && activeItem.creator?.userId !== userId ? "pointer" : "default" }}
                      onClick={() => {
                        if (activeItem && activeItem.creator?.userId !== userId) {
                          navigate(`/discover/playlist/${activeItem.id}`)
                        }
                      }}
                    />
                    <div className="info">
                      <h2>{detail.name}</h2>
                      <div className="creator">
                        <img
                          className="avatar"
                          src={getImageSize(detail.creator.avatarUrl, 28)}
                          alt={detail.creator.nickname}
                        />
                        <span>{detail.creator.nickname}</span>
                        <span className="sep">·</span>
                        <span>
                          {detail.createTime > 0
                            ? new Date(detail.createTime).toLocaleDateString("zh-CN")
                            : ""}
                        </span>
                      </div>
                      {detail.tags.length > 0 && (
                        <div className="tags">
                          {detail.tags.map((tag) => (
                            <span key={tag} className="tag">{tag}</span>
                          ))}
                        </div>
                      )}
                      <div className="stats">
                        <span>{detail.trackCount} 首歌曲</span>
                        <span className="sep">·</span>
                        <span>
                          播放{" "}
                          {detail.playCount > 10000
                            ? `${(detail.playCount / 10000).toFixed(0)} 万`
                            : detail.playCount}
                        </span>
                      </div>
                      {detail.description && (
                        <p className="desc">{detail.description}</p>
                      )}
                    </div>
                  </PlaylistHeader>

                  <div className="track-header">
                    <h3>歌曲列表</h3>
                    <span className="track-count">{tracks.length} 首歌</span>
                  </div>
                  <SongListTable songs={tracks} showCover showDelete onDeleteSong={handleDeleteSong} />
                </>
              )}

              {!tracksLoading && !detail && activeItem && tracks.length === 0 && (
                <EmptyTip>暂无歌曲</EmptyTip>
              )}
              {!activeItem && activeId !== ACTIVE_RECENT && <EmptyTip>请选择歌单</EmptyTip>}
            </>
          )}
        </TrackListSection>
      </PlaylistLayout>

      <AlertDialog open={collectModal.open} onOpenChange={(open) => { if (!open) closeCollectModal() }}>
        <AlertDialogContent size="default">
          <AlertDialogHeader>
            <AlertDialogTitle>新建歌单</AlertDialogTitle>
            <AlertDialogDescription>输入歌单名称来创建新歌单</AlertDialogDescription>
          </AlertDialogHeader>

          <input
            autoFocus
            placeholder="请输入歌单名称"
            value={collectModal.playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") confirmCreatePlaylist()
            }}
            className="w-full h-10 px-3 rounded-lg bg-[#2a2a2a] border border-white/10 text-white text-sm placeholder:text-white/25 outline-none focus:border-white/30 transition-colors"
          />

          {collectModal.status === "createError" && (
            <Alert variant="destructive">
              <AlertDescription>创建失败，请稍后重试</AlertDescription>
            </Alert>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeCollectModal}>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => { e.preventDefault(); confirmCreatePlaylist() }}
              disabled={!collectModal.playlistName.trim() || collectModal.loading}
              className="!bg-[#FF4D4F] hover:!bg-[#ff7875]"
            >
              {collectModal.loading ? "创建中..." : "创建"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => { if (!open) setDeleteDialog({ open: false, type: "playlist", id: 0, name: "", loading: false }) }}>
        <AlertDialogContent size="default">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {deleteDialog.type === "playlist" ? "删除歌单" : "删除歌曲"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteDialog.type === "playlist"
                ? `确定要删除歌单「${deleteDialog.name}」吗？删除后无法恢复。`
                : `确定要从歌单中删除「${deleteDialog.name}」吗？`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialog({ open: false, type: "playlist", id: 0, name: "", loading: false })} disabled={deleteDialog.loading}>取消</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => confirmDelete(e as any)} disabled={deleteDialog.loading} className="!bg-[#FF4D4F] hover:!bg-[#ff7875]">
              {deleteDialog.loading ? "删除中..." : "确定删除"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {collectModal.status === "login" && (
        <ToastMessage msg="请先登录后再创建歌单" onDone={() => closeCollectModal()} />
      )}
    </BgWrapper>
  )
}

export default memo(Mine)
