import { memo, useEffect } from "react"
import type { FC } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector, shallowEqualApp } from "@/store"
import { fetchAlbumDetailAction } from "./store/thunk"
import AlbumInfo from "./c-cpns/album-info"
import SongListTable from "@/components/song-list-table"
import MusicLoader from "@/components/music-loader"
import { AlbumDetailWrapper } from "./style"

const AlbumDetail: FC = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()

  const { album, songs, loading } = useAppSelector(
    (state) => ({
      album: state.albumDetail.album,
      songs: state.albumDetail.songs,
      loading: state.albumDetail.loading
    }),
    shallowEqualApp
  )

  useEffect(() => {
    if (!id) return
    const albumId = Number(id)
    dispatch(fetchAlbumDetailAction(albumId))
  }, [id, dispatch])

  return (
    <AlbumDetailWrapper>
      <div className="main">
        {loading ? (
          <div className="flex items-center justify-center py-40">
            <MusicLoader />
          </div>
        ) : (
          <>
            <AlbumInfo album={album} />

            <div className="song-list-header">
              <h3>包含歌曲列表</h3>
              <span className="count">{songs.length} 首歌</span>
            </div>

            <SongListTable songs={songs} showAlbum={false} />

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
    </AlbumDetailWrapper>
  )
}

export default memo(AlbumDetail)
