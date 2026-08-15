import { memo, useEffect } from "react"
import type { FC } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector, shallowEqualApp } from "@/store"
import { fetchPlaylistDetailAction, fetchRelatedPlaylistAction } from "./store/thunk"
import PlaylistInfo from "./c-cpns/playlist-info"
import SongListTable from "@/components/song-list-table"
import Skeleton, { SongListSkeleton, skeletonStyles } from "@/components/skeleton"
import { PlaylistDetailWrapper } from "./style"

const PlaylistDetail: FC = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()

  const { playlist, songs, loading } = useAppSelector(
    (state) => ({
      playlist: state.playlistDetail.playlist,
      songs: state.playlistDetail.songs,
      loading: state.playlistDetail.loading
    }),
    shallowEqualApp
  )

  useEffect(() => {
    if (!id) return
    const playlistId = Number(id)
    dispatch(fetchPlaylistDetailAction(playlistId))
    dispatch(fetchRelatedPlaylistAction(playlistId))
  }, [id, dispatch])

  return (
    <PlaylistDetailWrapper>
      <style>{skeletonStyles}</style>
      <div className="main">
        {loading ? (
          <>
            {/* 头部骨架：封面 + 信息 */}
            <div className="flex gap-7">
              <Skeleton width={200} height={200} radius={14} />
              <div className="flex flex-col justify-center gap-3 flex-1">
                <Skeleton width="55%" height={24} radius={12} />
                <div className="flex items-center gap-3">
                  <Skeleton width={35} height={35} radius={17} />
                  <Skeleton width="30%" height={14} radius={8} />
                </div>
                <div className="flex gap-3 mt-1">
                  <Skeleton width={80} height={34} radius={20} />
                  <Skeleton width={80} height={34} radius={20} />
                </div>
                <div className="flex gap-2 mt-1">
                  <Skeleton width={52} height={22} radius={12} />
                  <Skeleton width={52} height={22} radius={12} />
                  <Skeleton width={40} height={22} radius={12} />
                </div>
                <Skeleton width="70%" height={13} radius={8} />
              </div>
            </div>
            {/* 歌曲列表骨架 */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton width={80} height={18} radius={10} />
                <Skeleton width={50} height={14} radius={8} />
              </div>
              <SongListSkeleton rows={10} />
            </div>
          </>
        ) : (
          <>
            <PlaylistInfo playlist={playlist} />

            <div className="song-list-header">
              <h3>歌曲列表</h3>
              <span className="count">{songs.length} 首歌</span>
            </div>

            <SongListTable songs={songs} />

            <div className="comment-placeholder">
              <h3>评论</h3>
              <div className="placeholder-text">评论区预留位置</div>
            </div>
          </>
        )}
      </div>

      <div className="sidebar">
        <div className="placeholder">相关推荐预留位置</div>
      </div>
    </PlaylistDetailWrapper>
  )
}

export default memo(PlaylistDetail)
