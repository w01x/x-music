import { memo } from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import type { IHotSong } from '../../types'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchCurrentSongAction } from '@/views/player/store/player'
import { formatTime } from '@/utils/format'
import { HotSongWrapper } from './style'

interface IProps {
  songs: IHotSong[]
}

const HotSong: FC<IProps> = ({ songs }) => {
  const dispatch = useAppDispatch()
  const currentSongId = useAppSelector(s => s.player.currentSong?.id)

  return (
    <HotSongWrapper>
      {songs.length > 0 ? (
        <div className="song-table">
          <div className="table-header">
            <span className="col-index"></span>
            <span className="col-song">歌曲</span>
            <span className="col-duration">时长</span>
          </div>
          <div className="table-body">
            {songs.map((song, index) => {
              const isActive = currentSongId === song.id
              return (
              <div
                key={song.id}
                className={`song-row ${isActive ? 'active' : ''}`}
                onClick={() => dispatch(fetchCurrentSongAction(song.id))}
              >
                <span className="col-index">
                  <span className="index-num">{index + 1}</span>
                </span>
                <span className="col-song">
                  <Link to={`/discover/song/${song.id}`} onClick={e => e.stopPropagation()}>
                    {song.name}
                  </Link>
                </span>
                <span className="col-duration">{formatTime(song.dt)}</span>
              </div>
            )})}
          </div>
        </div>
      ) : (
        <p className="empty">暂无热门歌曲</p>
      )}
    </HotSongWrapper>
  )
}

export default memo(HotSong)
