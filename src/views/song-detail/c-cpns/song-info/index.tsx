
import { memo, useState } from "react"
import type { FC } from "react"
import { useAppDispatch, useAppSelector } from "@/store"
import { fetchCurrentSongAction } from "@/views/player/store/player"
import { SongInfoWrapper } from "./style"
import { getImageSize } from "@/utils/format"
import SelectPlaylistModal from "@/components/select-playlist-modal"

interface IProps {
  song: any
  loading?: boolean
}

const SongInfo: FC<IProps> = ({ song, loading }) => {
  const dispatch = useAppDispatch()
  const [addModal, setAddModal] = useState({ visible: false, songId: 0 })

  const { cookie, userId } = useAppSelector((state) => ({
    cookie: state.loginUser.cookie,
    userId: state.loginUser.profile?.userId,
  }))

  if (loading || !song) return null

  const album = song.al || {}
  const artist = song.ar?.[0] || {}

  return (
    <SongInfoWrapper>
      <div className="cover">
        <img src={getImageSize(album.picUrl, 200)} alt={song.name} />
        <div className="mask" />
      </div>

      <div className="info">
        <div className="title">
          <i className="tag" />
          <h2>{song.name}</h2>
        </div>

        <div className="artist">
          歌手：
          {song.ar?.length ? (
            song.ar.map((a: any, i: number) => (
              <span key={a.id}>
                {i > 0 && ' / '}
                <a href={`#/discover/artist/${a.id}`}>{a.name}</a>
              </span>
            ))
          ) : (
            <a href={`#/discover/artist/${artist.id}`}>未知歌手</a>
          )}
        </div>

        <div className="album">
          专辑：
          <a href={`#/discover/album/${album.id}`}>{album.name || "未知专辑"}</a>
        </div>

        <div className="actions">
          <button
            className="btn btn-play"
            onClick={() => dispatch(fetchCurrentSongAction(song.id))}
          >
            <i className="" />
            播放
          </button>
          <button
            className="btn btn-favor"
            onClick={() => setAddModal({ visible: true, songId: song.id })}
          >
            加入歌单
          </button>
        </div>
      </div>

      <SelectPlaylistModal
        songId={addModal.songId}
        userId={userId ?? 0}
        cookie={cookie ?? ""}
        visible={addModal.visible}
        onClose={() => setAddModal({ visible: false, songId: 0 })}
      />
    </SongInfoWrapper>
  )
}

export default memo(SongInfo)
