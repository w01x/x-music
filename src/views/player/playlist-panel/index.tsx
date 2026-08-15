import { memo, useCallback } from 'react'
import type { FC } from 'react'
import { shallowEqualApp, useAppSelector, useAppDispatch } from '@/store'
import {
  fetchCurrentSongAction,
  changePlaySongListAction,
  changePlaySongIndexAction
} from '@/views/player/store/player'
import { formatTime } from '@/utils/format'
import {
  PanelOverlay,
  PanelWrapper,
  PanelHeader,
  SongList,
  SongRow,
  EmptyState
} from './style'

interface IProps {
  visible: boolean
  onClose: () => void
}

const PlaylistPanel: FC<IProps> = ({ visible, onClose }) => {
  const dispatch = useAppDispatch()
  const { playSongList, playSongIndex } = useAppSelector(
    (state) => ({
      playSongList: state.player.playSongList,
      playSongIndex: state.player.playSongIndex
    }),
    shallowEqualApp
  )

  const handleSongClick = useCallback(
    (song: any) => {
      dispatch(fetchCurrentSongAction(song.id))
    },
    [dispatch]
  )

  const handleRemove = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.stopPropagation()
      const newList = playSongList.filter((_item, i) => i !== index)
      dispatch(changePlaySongListAction(newList))
      if (index === playSongIndex) {
        dispatch(changePlaySongIndexAction(-1))
      } else if (index < playSongIndex) {
        dispatch(changePlaySongIndexAction(playSongIndex - 1))
      }
    },
    [dispatch, playSongList, playSongIndex]
  )

  const handleClear = useCallback(() => {
    dispatch(changePlaySongListAction([]))
    dispatch(changePlaySongIndexAction(-1))
  }, [dispatch])

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose()
    },
    [onClose]
  )

  return (
    <>
      <PanelOverlay $visible={visible} onClick={handleOverlayClick} />
      <PanelWrapper $visible={visible}>
        <PanelHeader>
          <div className="title">
            播放列表
            <span className="count">共 {playSongList.length} 首</span>
          </div>
          <div className="actions">
            {playSongList.length > 0 && (
              <button className="clear-btn" onClick={handleClear}>
                清空列表
              </button>
            )}
            <button className="close-btn" onClick={onClose}>
              &times;
            </button>
          </div>
        </PanelHeader>

        {playSongList.length === 0 ? (
          <EmptyState>
            <div>暂无歌曲</div>
            <div className="tip">播放歌曲后将自动加入列表</div>
          </EmptyState>
        ) : (
          <SongList>
            {playSongList.map((song, index) => (
              <SongRow
                key={`${song.id}-${index}`}
                $active={index === playSongIndex}
                onClick={() => handleSongClick(song)}
              >
                {index === playSongIndex ? (
                  <div className="playing-icon">
                    <span className="bar" />
                    <span className="bar" />
                    <span className="bar" />
                    <span className="bar" />
                  </div>
                ) : (
                  <span className="index">{index + 1}</span>
                )}

                <div className="song-info">
                  <div className="song-name">{song.name || '未知歌曲'}</div>
                  <div className="song-artist">
                    {song.ar?.[0]?.name ||
                      song.ar?.map((a: any) => a.name).join(' / ') ||
                      '未知歌手'}
                  </div>
                </div>

                <span className="duration">
                  {formatTime((song.dt || 0))}
                </span>

                <button
                  className="delete-btn"
                  onClick={(e) => handleRemove(e, index)}
                >
                  &times;
                </button>
              </SongRow>
            ))}
          </SongList>
        )}
      </PanelWrapper>
    </>
  )
}

export default memo(PlaylistPanel)
