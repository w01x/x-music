
import { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Play, CirclePlus } from 'lucide-react'
import { SongListTableWrapper } from './style'
import { useAppDispatch, useAppSelector, shallowEqualApp } from '@/store'
import { fetchCurrentSongAction } from '@/views/player/store/player'
import { formatTime, getImageSize } from '@/utils/format'
import { toast } from '@/utils/toast'
import SelectPlaylistModal from '@/components/select-playlist-modal'

export interface ISongItem {
  id: number
  name: string
  dt: number
  ar?: { id: number; name: string }[]
  al?: { id: number; name: string; picUrl: string }
  artists?: { id: number; name: string }[]
  album?: { id: number; name: string; picUrl: string }
}

interface IProps {
  children?: ReactNode
  songs: ISongItem[]
  showHeader?: boolean
  showAlbum?: boolean
  showIndex?: boolean
  showCover?: boolean
  showDelete?: boolean
  onDeleteSong?: (id: number) => void
}

const SongListTable: FC<IProps> = ({
  songs = [],
  showHeader = true,
  showAlbum = true,
  showIndex = true,
  showCover = false,
  showDelete = false,
  onDeleteSong,
}) => {
  const dispatch = useAppDispatch()
  const { currentSongId, cookie, userId } = useAppSelector(
    state => ({
      currentSongId: state.player.currentSong?.id,
      cookie: state.loginUser.cookie,
      userId: state.loginUser.profile?.userId,
    }),
    shallowEqualApp
  )
  const [addModal, setAddModal] = useState({ visible: false, songId: 0 })

  function handlePlaySong(e: React.MouseEvent, id: number) {
    e.stopPropagation()
    dispatch(fetchCurrentSongAction(id))
  }

  return (
    <SongListTableWrapper>
      {showHeader && (
        <div className="header">
          {showIndex && <div className="th th-index"></div>}
          <div className="th th-title">歌曲标题</div>
          <div className="th th-duration">时长</div>
          <div className="th th-singer">歌手</div>
          {showAlbum && <div className="th th-album">专辑</div>}
        </div>
      )}

      {songs.map((item, index) => {
        const isActive = currentSongId === item.id
        const singers = item.ar || item.artists || []
        const album = item.al || item.album

        return (
          <div
            className={`song-item ${isActive ? 'active' : ''}`}
            key={item.id}
            onClick={() => dispatch(fetchCurrentSongAction(item.id))}
          >
            {showIndex && (
              <div className="td td-index">
                <span className="num">{index + 1}</span>
              </div>
            )}

            <div className="td td-title">
              {showCover && album?.picUrl && (
                <img src={getImageSize(album.picUrl, 40)} alt="" />
              )}
              <a
                href={`#/discover/song/${item.id}`}
                onClick={e => e.stopPropagation()}
              >
                {item.name}
              </a>
              <div className="operator">
                <button
                  className="btn play"
                  title="播放"
                  onClick={e => handlePlaySong(e, item.id)}
                >
                  <Play className="w-3 h-3 fill-current" />
                </button>
                <button
                  className="btn add"
                  title="添加到歌单"
                  onClick={e => {
                    e.stopPropagation()
                    if (!cookie) { toast.warning('请先登录'); return }
                    setAddModal({ visible: true, songId: item.id })
                  }}
                >
                  <CirclePlus className="w-3.5 h-3.5" />
                </button>

                {showDelete && (
                  <button
                    className="btn del"
                    title="从歌单删除"
                    onClick={e => {
                      e.stopPropagation()
                      onDeleteSong?.(item.id)
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="td td-duration">{formatTime(item.dt)}</div>

            <div className="td td-singer">
              {singers.map((ar, idx) => (
                <span key={ar.id}>
                  {idx > 0 && ' / '}
                  <a
                    href={`#/discover/artist/${ar.id}`}
                    onClick={e => e.stopPropagation()}
                  >
                    {ar.name}
                  </a>
                </span>
              ))}
            </div>

            {showAlbum && (
              <div className="td td-album" title={album?.name}>
                {album?.id ? (
                  <a
                    href={`#/discover/album/${album.id}`}
                    onClick={e => e.stopPropagation()}
                  >
                    {album?.name}
                  </a>
                ) : (
                  album?.name
                )}
              </div>
            )}
          </div>
        )
      })}
      <SelectPlaylistModal
        songId={addModal.songId}
        userId={userId ?? 0}
        cookie={cookie ?? ''}
        visible={addModal.visible}
        onClose={() => setAddModal({ visible: false, songId: 0 })}
      />
    </SongListTableWrapper>
  )
}

export default memo(SongListTable)
