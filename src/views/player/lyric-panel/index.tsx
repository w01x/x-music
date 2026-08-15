
import { memo, useEffect, useRef, useCallback, useState } from 'react'
import type { FC } from 'react'
import { Slider } from '@/components/ui/slider'
import { shallowEqualApp, useAppSelector } from '@/store'
import { getImageSize, formatTime } from '@/utils/format'
import { Play, Pause, ListMusic, Shuffle, Repeat1 } from 'lucide-react'
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons'
import {
  LyricPanelWrapper,
  LyricClose,
  LyricScroll,
  LyricInner,
  LyricLine,
  LyricSongTitle,
  NoLyric,
  LyricBottomBar
} from './style'

interface IProps {
  visible: boolean
  onClose: () => void
  isPlaying: boolean
  progress: number
  duration: number
  currentTime: number
  volume: number
  playMode: number
  onPlayPause: () => void
  onPrev: () => void
  onNext: () => void
  onSliderChanging: (value: number[]) => void
  onSliderChanged: (value: number[]) => void
  onVolumeChange: (value: number) => void
  onChangePlayMode: () => void
  onLyricSeek: (timeMs: number) => void
}

const SCROLL_PAUSE_MS = 1500

const LyricPanel: FC<IProps> = (props) => {
  const {
    visible, onClose, isPlaying,
    progress, duration, currentTime,
    volume, playMode,
    onPlayPause, onPrev, onNext,
    onSliderChanging, onSliderChanged,
    onVolumeChange, onChangePlayMode,
    onLyricSeek
  } = props

  const { lyrics, lyricIndex, currentSong } = useAppSelector(
    (state) => ({
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex,
      currentSong: state.player.currentSong
    }),
    shallowEqualApp
  )
  const [closing, setClosing] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const autoScrollPaused = useRef(false)
  const pauseTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const lyricIndexRef = useRef(lyricIndex)

  lyricIndexRef.current = lyricIndex

  useEffect(() => {
    if (!visible) setClosing(false)
  }, [visible])

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(() => onClose(), 500)
  }, [onClose])

  const scrollToLyric = useCallback((index: number) => {
    if (!scrollRef.current) return
    const target = scrollRef.current.querySelector(`[data-index="${index}"]`)
    if (target) {
      target.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (!visible) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [visible, handleClose])

  useEffect(() => {
    if (!visible || autoScrollPaused.current) return
    scrollToLyric(lyricIndex)
  }, [lyricIndex, visible, scrollToLyric])

  useEffect(() => {
    if (!visible) return
    autoScrollPaused.current = false
  }, [visible])

  const handleScroll = useCallback(() => {
    autoScrollPaused.current = true
    clearTimeout(pauseTimer.current)
    pauseTimer.current = setTimeout(() => {
      autoScrollPaused.current = false
      scrollToLyric(lyricIndexRef.current)
    }, SCROLL_PAUSE_MS)
  }, [scrollToLyric])

  const handleLyricClick = useCallback(
    (timeMs: number) => {
      onLyricSeek(timeMs)
    },
    [onLyricSeek]
  )

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) handleClose()
    },
    [handleClose]
  )

  return (
    <LyricPanelWrapper $visible={visible} $closing={closing} onClick={handleOverlayClick}>
      <LyricClose onClick={handleClose}>✕</LyricClose>

      {currentSong?.name && (
        <LyricSongTitle>
          <div className="name">{currentSong.name}</div>
          <div className="artist">
            {currentSong?.ar?.[0]?.name || currentSong?.ar?.map((a: any) => a.name).join(' / ') || '未知歌手'}
          </div>
        </LyricSongTitle>
      )}

      {lyrics.length === 0 ? (
        <NoLyric>暂无歌词</NoLyric>
      ) : (
        <LyricScroll ref={scrollRef} onScroll={handleScroll}>
          <LyricInner>
            {lyrics.map((line, i) => (
              <LyricLine
                key={i}
                data-index={i}
                $distance={Math.abs(i - lyricIndex)}
                onClick={() => handleLyricClick(line.time)}
              >
                {line.text}
              </LyricLine>
            ))}
          </LyricInner>
        </LyricScroll>
      )}

      <LyricBottomBar $playMode={playMode}>
        <div className="left">
          <img
            className="cover"
            src={getImageSize(currentSong?.al?.picUrl, 80)}
            alt=""
          />
          <div className="meta">
            <div className="name">{currentSong?.name || '未知歌曲'}</div>
            <div className="artist">
              {currentSong?.ar?.[0]?.name || '未知歌手'}
            </div>
          </div>
        </div>

        <div className="center">
          <div className="controls">
            <button className="btn" onClick={onPrev}><StepBackwardOutlined /></button>
            <button className="btn play-btn" onClick={onPlayPause}>
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button className="btn" onClick={onNext}><StepForwardOutlined /></button>
          </div>
          <div className="progress-wrap">
            <span className="time">{formatTime(currentTime * 1000)}</span>
            <Slider
              step={0.2}
              value={[progress]}
              onValueChange={onSliderChanging}
              onValueCommit={onSliderChanged}
            />
            <span className="time">{formatTime(duration * 1000)}</span>
          </div>
        </div>

        <div className="right">
          <button className="right-btn" onClick={onChangePlayMode} title={['顺序播放', '随机播放', '单曲循环'][playMode]}>
              {playMode === 0 && <ListMusic className="w-4 h-4" />}
              {playMode === 1 && <Shuffle className="w-4 h-4" />}
              {playMode === 2 && <Repeat1 className="w-4 h-4" />}
            </button>
          <Slider
            min={0}
            max={100}
            value={[volume]}
            onValueChange={(v) => onVolumeChange(v[0])}
          />
        </div>
      </LyricBottomBar>
    </LyricPanelWrapper>
  )
}

export default memo(LyricPanel)
