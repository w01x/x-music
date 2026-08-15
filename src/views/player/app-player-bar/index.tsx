
import { memo, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ReactNode, FC } from "react";
import { BarControl, BarOperator, BarPlayInfo, PlayerBarWrapper } from "./style";

import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { shallowEqualApp, useAppSelector } from "@/store";
import { getImageSize } from "@/utils/format";
import { useRef, useState } from "react";
import { changeLyricIndexAction, fetchChangeMusicAction, restorePlayerState, fetchCurrentSongAction, toggleImmersive, setCurrentTimeMs } from '@/views/player/store/player'
import { useAppDispatch } from "@/store";
import { formatTime } from "@/utils/format";
import PlaylistPanel from "../playlist-panel";
import { Play, Pause, ListMusic, Shuffle, Repeat1 } from "lucide-react";
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  SoundOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";

export interface IProps {
  children?: ReactNode,
}

const AppPlayerBar: FC<IProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const prevVolumeRef = useRef(50)
  const [showPlaylistPanel, setShowPlaylistPanel] = useState(false)
  const fadeRafRef = useRef<number | null>(null)
  const volumeRef = useRef(volume)
  volumeRef.current = volume
  const { currentSong, lyricIndex, lyrics, currentSongUrl, playMode, playSongList } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      currentSongUrl: state.player.currentSongUrl,
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex,
      playMode: state.player.playMode,
      playSongList: state.player.playSongList,
    }),
    shallowEqualApp
  )

  // 页面刷新后从 IndexedDB 恢复播放状态
  useEffect(() => {
    dispatch(restorePlayerState())
  }, [])

  // 全局空格键控制播放/暂停（输入框内不响应）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      // 方向键切换歌曲（整个播放器全局生效，输入框内不响应）
      if (e.key === 'ArrowLeft') { e.preventDefault(); handleChangeMusic(false); return }
      if (e.key === 'ArrowRight') { e.preventDefault(); handleChangeMusic(true); return }
      // 上下键调节音量（步进 10）
      if (e.key === 'ArrowUp') { e.preventDefault(); handleVolumeChange(Math.min(100, volumeRef.current + 10)); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); handleVolumeChange(Math.max(0, volumeRef.current - 10)); return }
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault()
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) {
          const userVol = volumeRef.current / 100
          cancelFade()
          audio.volume = 0
          setIsPlaying(true)
          audio.play().then(() => fadeVolume(audio, userVol, 500)).catch(() => { audio.volume = userVol })
        } else {
          const userVol = volumeRef.current / 100
          setIsPlaying(false)
          fadeVolume(audio, 0, 600, () => {
            audio.pause()
            audio.volume = userVol
          })
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 监听沉浸模式自定义事件
  useEffect(() => {
    const onTogglePlay = () => handlePlayBtnClick()
    const onPlayAtIndex = (e: Event) => {
      const idx = (e as CustomEvent).detail?.index
      if (typeof idx === 'number') {
        dispatch({ type: 'player/changePlaySongIndexAction', payload: idx })
        const song = playSongList[idx]
        if (song?.id) dispatch(fetchCurrentSongAction(song.id) as any)
      }
    }
    const onSeekTo = (e: Event) => {
      const timeMs = (e as CustomEvent).detail?.timeMs
      if (typeof timeMs === 'number' && audioRef.current) {
        audioRef.current.currentTime = timeMs / 1000
      }
    }
    window.addEventListener('toggle-play', onTogglePlay)
    window.addEventListener('play-at-index', onPlayAtIndex)
    window.addEventListener('seek-to', onSeekTo)
    return () => {
      window.removeEventListener('toggle-play', onTogglePlay)
      window.removeEventListener('play-at-index', onPlayAtIndex)
      window.removeEventListener('seek-to', onSeekTo)
    }
  }, [playSongList, dispatch])

  // 歌词逐帧轮询（RAF 精确跟随）
  const lyricRafRef = useRef<number | null>(null)
  useEffect(() => {
    function tick() {
      if (!audioRef.current) { lyricRafRef.current = requestAnimationFrame(tick); return }
      const sec = audioRef.current.currentTime
      const ms = sec * 1000
      const dur = audioRef.current.duration || 0
      if (dur > 0) {
        setProgress((sec / dur) * 100)
        setCurrentTime(sec)
      }
      if (Math.abs(ms - lastDispatchRef.current) > 80) {
        lastDispatchRef.current = ms
        dispatch(setCurrentTimeMs(ms))
      }
      const idx = lyricIndexAt(ms)
      if (idx >= 0 && idx !== lyricIndex) {
        dispatch(changeLyricIndexAction(idx))
      }
      lyricRafRef.current = requestAnimationFrame(tick)
    }
    lyricRafRef.current = requestAnimationFrame(tick)
    return () => { if (lyricRafRef.current) cancelAnimationFrame(lyricRafRef.current) }
  }, [lyrics, lyricIndex, duration, dispatch])

  // 组件卸载时清理动画帧
  useEffect(() => {
    return () => { if (fadeRafRef.current) cancelAnimationFrame(fadeRafRef.current) }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume / 100
  }, [])

  useEffect(() => {
    if (!currentSongUrl) {
      // 切换歌曲时立即停止播放
      audioRef.current?.pause()
      if (audioRef.current) audioRef.current.src = ''
      return
    }
    audioRef.current?.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false))
    setDuration((currentSong?.dt || 0) / 1000)
    setCurrentTime(0)
    setProgress(0)
  }, [currentSongUrl])

  const lastDispatchRef = useRef(0)

  function lyricIndexAt(timeMs: number) {
    let lo = 0, hi = lyrics.length - 1
    while (lo <= hi) {
      const mid = (lo + hi) >>> 1
      if (lyrics[mid].time <= timeMs) lo = mid + 1
      else hi = mid - 1
    }
    return lo - 1
  }

  function handleTimeUpdate() {
    if (!audioRef.current || !duration) return
    const currentTimeSec = audioRef.current.currentTime
    const currentTimeMs = currentTimeSec * 1000
    const progressValue = (currentTimeSec / duration) * 100
    setProgress(progressValue)
    setCurrentTime(currentTimeSec)
    if (Math.abs(currentTimeMs - lastDispatchRef.current) > 100) {
      lastDispatchRef.current = currentTimeMs
      dispatch(setCurrentTimeMs(currentTimeMs))
    }
    const index = lyricIndexAt(currentTimeMs)
    if (index >= 0 && index !== lyricIndex) {
      dispatch(changeLyricIndexAction(index))
    }
  }

  function handleTimeEnded() {
    if (playMode === 2) {
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    } else {
      handleChangeMusic(true)
    }
  }

  function handleChangeMusic(isNext = true) {
    dispatch(fetchChangeMusicAction(isNext))
  }

  // 取消进行中的淡入淡出
  function cancelFade() {
    if (fadeRafRef.current) {
      cancelAnimationFrame(fadeRafRef.current)
      fadeRafRef.current = null
    }
  }

  // 在 duration 毫秒内将 audio.volume 从当前值渐变到目标值
  function fadeVolume(audio: HTMLAudioElement, to: number, duration: number, onDone?: () => void) {
    cancelFade()
    const from = audio.volume
    const t0 = performance.now()
    const tick = () => {
      const p = Math.min((performance.now() - t0) / duration, 1)
      audio.volume = from + (to - from) * (1 - (1 - p) ** 3) // ease-out
      if (p < 1) { fadeRafRef.current = requestAnimationFrame(tick) }
      else { audio.volume = to; fadeRafRef.current = null; onDone?.() }
    }
    fadeRafRef.current = requestAnimationFrame(tick)
  }

  function handlePlayBtnClick() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      const userVol = volume / 100
      cancelFade()
      audio.volume = 0
      setIsPlaying(true)
      audio.play()
        .then(() => fadeVolume(audio, userVol, 500))
        .catch(() => { audio.volume = userVol; setIsPlaying(false) })
    } else {
      const userVol = volume / 100
      setIsPlaying(false)
      fadeVolume(audio, 0, 600, () => {
        audio.pause()
        audio.volume = userVol
      })
    }
  }

  function handleLyricSeek(timeMs: number) {
    if (!audioRef.current) return
    const timeSec = timeMs / 1000
    audioRef.current.currentTime = timeSec
    setCurrentTime(timeSec)
    setProgress((timeSec / duration) * 100)
    if (!isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true))
    }
  }

  function handleSliderChanged(value: number[]) {
    if (!audioRef.current) return
    const newTime = (value[0] / 100) * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  function handleSliderChanging(value: number[]) {
    const newTime = (value[0] / 100) * duration
    setProgress(value[0])
    setCurrentTime(newTime)
    // 拖动时实时 seek
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  function handleChangePlayMode() {
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch({ type: 'player/changePlayMode', payload: newPlayMode })
  }

  function handleVolumeChange(value: number) {
    cancelFade()
    if (!audioRef.current) return
    audioRef.current.volume = value / 100
    setVolume(value)
    if (value > 0) prevVolumeRef.current = value
  }

  function handleVolumeMuteToggle() {
    cancelFade()
    if (!audioRef.current) return
    if (volume > 0) {
      prevVolumeRef.current = volume
      audioRef.current.volume = 0
      setVolume(0)
    } else {
      const restore = prevVolumeRef.current || 50
      audioRef.current.volume = restore / 100
      setVolume(restore)
    }
  }

  const playModeIcon = () => {
    switch (playMode) {
      case 1: return <Shuffle className="w-4 h-4" />
      case 2: return <Repeat1 className="w-4 h-4" />
      default: return <ListMusic className="w-4 h-4" />
    }
  }

  return (
    <PlayerBarWrapper>
      <div className="top-progress">
        <Slider
          step={0.2}
          value={[progress]}
          onValueChange={handleSliderChanging}
          onValueCommit={handleSliderChanged}
        />
      </div>
      <div className="top-time">
        <span className="current">{formatTime(currentTime * 1000)}</span>
        <span className="duration">{formatTime(duration * 1000)}</span>
      </div>
      <div className="content">
        <BarPlayInfo>
          <img
            className="image"
            src={getImageSize(currentSong?.al?.picUrl, 56)}
            alt={`${currentSong?.al?.name || currentSong.name || '专辑'} 封面`}
            onClick={() => {
              if (currentSong?.al?.id) {
                navigate(`/discover/album/${currentSong.al.id}`)
              } else {
                navigate(`/discover/song/${currentSong.id}`)
              }
            }}
          />
          <div className="info">
            <div className="song">
              <div className="song-info">
                <div className="song-name">{currentSong.name || '未选择歌曲'}</div>
                <div className="singer-name">{currentSong?.ar?.[0]?.name || '未知歌手'}</div>
              </div>
              <div className="song-lyric" onClick={() => dispatch(toggleImmersive())}>
                {lyrics[lyricIndex]?.text || ''}
              </div>
            </div>
          </div>
        </BarPlayInfo>

        <BarControl $isPlaying={isPlaying}>
          <button className="btn prev" onClick={() => handleChangeMusic(false)} aria-label="上一首">
            <StepBackwardOutlined />
          </button>
          <button className="btn play" onClick={handlePlayBtnClick} aria-label={isPlaying ? '暂停' : '播放'}>
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          </button>
          <button className="btn next" onClick={() => handleChangeMusic(true)} aria-label="下一首">
            <StepForwardOutlined />
          </button>
        </BarControl>

        <BarOperator $playMode={playMode}>
          <div className="left">
          </div>
          <div className="right">
            <div className="volume-wrapper">
              <button className="btn volume" onClick={handleVolumeMuteToggle} aria-label={volume > 0 ? '静音' : '取消静音'}>
                <SoundOutlined />
              </button>
              <div className="volume-panel">
                <Slider
                  className="h-24"
                  orientation="vertical"
                  min={0}
                  max={100}
                  step={1}
                  value={[volume]}
                  onValueChange={(v) => handleVolumeChange(v[0])}
                />
              </div>
            </div>
            <button className="btn loop" onClick={handleChangePlayMode} aria-label={['顺序播放', '随机播放', '单曲循环'][playMode]}>
              {playModeIcon()}
            </button>
            <button className="btn immersive" onClick={() => {
              dispatch(toggleImmersive())
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {})
              }
            }} aria-label="沉浸模式" style={{ fontSize: 14 }}>
              ⛶
            </button>
            <button className="btn lyric" onClick={() => dispatch(toggleImmersive())}>
              词
            </button>
            <button className="btn playlist" onClick={() => setShowPlaylistPanel(true)} aria-label={`播放列表 (${playSongList.length} 首)`}>
              <OrderedListOutlined />
              <span className="playlist-count">{playSongList.length}</span>
            </button>
          </div>
        </BarOperator>
      </div>

      <audio
        ref={audioRef}
        src={currentSongUrl}
        onEnded={handleTimeEnded}
      />

      {createPortal(
        <PlaylistPanel
          visible={showPlaylistPanel}
          onClose={() => setShowPlaylistPanel(false)}
        />,
        document.body
      )}
    </PlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
