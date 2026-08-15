import { memo, useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import {
  Overlay, BgImage, Noise, Particles, SongPanel, Cover, CoverFallback, Meta,
  LyricsWrap, LyricScroll, LyricLine,
  BottomBar, ProgressTrack, Controls, CtrlCluster, TrackInfo, TrackCover, TrackMeta, CtrlBtn, PlayBtn,
  PlaylistPanel, PanelTabs, PanelContent, PanelTab, QueueItem, CloseBtn, TimeDisplay, LoginPrompt,
} from './style'
import { useAppSelector, useAppDispatch, shallowEqualApp } from '@/store'
import { closeImmersive, fetchChangeMusicAction, playPlaylistAction } from '@/views/player/store/player'
import { getImageSize } from '@/utils/format'
import { getUserPlaylist, type PlaylistItem } from '@/views/mine/service/playlist'
import ToastMessage from '@/components/toast-message'
import {
  StepBackwardOutlined, StepForwardOutlined,
  PauseCircleOutlined, PlayCircleOutlined,
  HeartOutlined, HeartFilled,
} from '@ant-design/icons'

const PEEK_DELAY = 170

const ImmersivePlayer = memo(() => {
  const dispatch = useAppDispatch()
  const [peek, setPeek] = useState(false)
  const [panelTab, setPanelTab] = useState<'queue' | 'mine'>('queue')
  const [myPlaylists, setMyPlaylists] = useState<PlaylistItem[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [barVisible, setBarVisible] = useState(true)
  const [liked, setLiked] = useState(false)
  const [toasts, setToasts] = useState<{ id: number }[]>([])
  const toastIdRef = useRef(0)
  const [coverError, setCoverError] = useState(false)
  // 进度的本地状态（每 200ms 更新一次，减少 re-render）
  const [progress, setProgress] = useState(0)
  const [timeDisplay, setTimeDisplay] = useState({ cur: 0, dur: 0 })

  const isPlayingRef = useRef(false)
  const barTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const peekTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const gradientRef = useRef<HTMLSpanElement>(null)
  const lastDisplayRef = useRef(0)

  const { isLoggedIn, userId, cookie } = useAppSelector((state: any) => ({
    isLoggedIn: state.loginUser.isLoggedIn,
    userId: state.loginUser.profile?.userId,
    cookie: state.loginUser.cookie,
  }), shallowEqualApp)
  const { currentSong, lyrics, lyricIndex, playSongList, playSongIndex } = useAppSelector((state) => ({
    currentSong: state.player.currentSong,
    lyrics: state.player.lyrics,
    lyricIndex: state.player.lyricIndex,
    playSongList: state.player.playSongList,
    playSongIndex: state.player.playSongIndex,
  }), shallowEqualApp)

  const picUrl = currentSong?.al?.picUrl || ''

  /* ── 切换歌曲时重置封面错误状态 ── */
  useEffect(() => { setCoverError(false) }, [picUrl])

  /* ── 歌词滚动 ── */
  const activeRef = useRef<HTMLParagraphElement>(null)
  const lyricScrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const scrollEl = lyricScrollRef.current
    const activeEl = activeRef.current
    if (!scrollEl || !activeEl) return
    // 只滚动歌词框自身（scrollTo 不会像 scrollIntoView 那样把滚动链传播到外层页面）
    const containerTop = scrollEl.getBoundingClientRect().top
    const activeTop = activeEl.getBoundingClientRect().top
    const target = scrollEl.scrollTop + (activeTop - containerTop) - scrollEl.clientHeight / 2 + activeEl.clientHeight / 2
    scrollEl.scrollTo({ top: Math.max(0, target), behavior: 'smooth' })
  }, [lyricIndex])

  /* ── 进度 + 播放状态（单 RAF） */
  useEffect(() => {
    let raf = 0
    const tick = () => {
      const audio = document.querySelector('audio')
      if (!audio) { raf = requestAnimationFrame(tick); return }

      const playing = audio && !audio.paused
      if (playing !== isPlayingRef.current) {
        isPlayingRef.current = playing
        setIsPlaying(playing)
      }

      if (audio.duration) {
        const now = Date.now()
        if (now - lastDisplayRef.current > 200) {
          lastDisplayRef.current = now
          setProgress((audio.currentTime / audio.duration) * 100)
          setTimeDisplay({ cur: audio.currentTime, dur: audio.duration })
        }
      }

      // 歌词渐变
      const span = gradientRef.current
      if (span) {
        const line = lyrics[lyricIndex]
        const next = lyrics[lyricIndex + 1]
        if (line) {
          const end = next?.time || line.time + 4000
          const dur = Math.max(500, end - line.time)
          const pct = Math.max(0, Math.min(100, ((audio.currentTime * 1000 - line.time) / dur) * 100))
          span.style.backgroundImage = `linear-gradient(to right, #FF4D4F ${pct}%, rgba(255,255,255,.3) ${pct}%)`
        }
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [lyricIndex, lyrics])

  /* ── 阻止背景滚动 ── */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  /* ── 我的歌单 ── */
  useEffect(() => {
    if (!isLoggedIn || !userId || !cookie) return
    getUserPlaylist(userId, cookie).then(setMyPlaylists).catch(() => {})
  }, [isLoggedIn, userId, cookie])

  /* ── 底部栏自动隐藏 ── */
  const showBar = useCallback(() => {
    if (peek) return
    setBarVisible(true); clearTimeout(barTimerRef.current!); barTimerRef.current = setTimeout(() => setBarVisible(false), 1000)
  }, [peek])
  useEffect(() => { showBar(); return () => clearTimeout(barTimerRef.current!) }, [])
  useEffect(() => { const m = (e: MouseEvent) => { if (e.clientY > innerHeight - 120 && !peek) showBar() }; window.addEventListener('mousemove', m); return () => window.removeEventListener('mousemove', m) }, [showBar, peek])

  /* ── 左侧面板 peek ── */
  const setPeekSafe = useCallback((on: boolean) => {
    if (on) {
      clearTimeout(peekTimerRef.current!); peekTimerRef.current = null
      setPeek(true); clearTimeout(barTimerRef.current!); setBarVisible(false)
    } else {
      clearTimeout(peekTimerRef.current!)
      peekTimerRef.current = setTimeout(() => setPeek(false), PEEK_DELAY)
    }
  }, [])
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const pp = document.querySelector('[data-immersive-panel]') as HTMLElement | null
      if (!pp) return
      const ex = e.clientX, ey = e.clientY, H = innerHeight
      const inBand = ey > 132 && ey < H - 132
      const inTrigger = ex >= 14 && ex < 78 && inBand
      const rect = pp.getBoundingClientRect()
      const inPanel = peek && ex >= rect.left - 18 && ex <= rect.right + 24 && ey >= rect.top - 22 && ey <= rect.bottom + 22
      if (inTrigger || inPanel) setPeekSafe(true)
      else if (peek && ex > rect.right + 72) setPeekSafe(false)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [peek, setPeekSafe])

  /* ── 键盘── */
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // 只退出沉浸模式，保留全屏（放大模式）状态
        document.body.style.overflow = ''
        dispatch(closeImmersive())
        return
      }
      if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); e.stopPropagation(); togglePlayRef.current() }
    }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [])
  function close() { document.body.style.overflow = ''; dispatch(closeImmersive()); if (document.fullscreenElement) document.exitFullscreen().catch(() => {}) }

  const navigate = useNavigate()
  const handleGoLogin = () => { close(); navigate('/login') }

  const togglePlayRef = useRef(() => { isPlayingRef.current = !isPlayingRef.current; setIsPlaying(isPlayingRef.current); window.dispatchEvent(new CustomEvent('toggle-play')) })
  const togglePlay = () => togglePlayRef.current()
  const handlePrev = useCallback(() => dispatch(fetchChangeMusicAction(false)), [dispatch])
  const handleNext = useCallback(() => dispatch(fetchChangeMusicAction(true)), [dispatch])
  const handleLike = () => {
    if (!isLoggedIn) {
      const id = ++toastIdRef.current
      setToasts(t => [...t, { id }])
      return
    }
    setLiked(v => !v)
  }
  const removeToast = useCallback((id: number) => {
    setToasts(t => t.filter(x => x.id !== id))
  }, [])
  const playAt = (i: number) => window.dispatchEvent(new CustomEvent('play-at-index', { detail: { index: i } }))
  const seekTo = (timeMs: number) => window.dispatchEvent(new CustomEvent('seek-to', { detail: { timeMs } }))
  const handleProgressClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const audio = document.querySelector('audio'); if (audio?.duration) audio.currentTime = pct * audio.duration
  }

  const coverUrl = getImageSize(picUrl, 560), trackThumb = getImageSize(picUrl, 96)

  return createPortal(
    <>
    <Overlay>
      <BgImage $src={coverUrl} /><Noise /><Particles><span className="p3" /></Particles>
      <CloseBtn onClick={close}>✕</CloseBtn>

      <SongPanel>
        <Cover>
          {coverError || !picUrl ? (
            <CoverFallback>
              <div className="cover-title">{currentSong?.name || '未选择歌曲'}</div>
              <div className="cover-artist">{currentSong?.ar?.map((a: any) => a.name).join(' / ') || ''}</div>
            </CoverFallback>
          ) : (
            <img src={getImageSize(picUrl, 560)} alt="" onError={() => setCoverError(true)} />
          )}
        </Cover>
        <Meta><div className="name">{currentSong?.name || '未选择歌曲'}</div><div className="artist">{currentSong?.ar?.map((a: any) => a.name).join(' / ') || '未知歌手'}</div><div className="album">{currentSong?.al?.name || ''}</div></Meta>
      </SongPanel>

      <LyricsWrap>
        <LyricScroll
          ref={lyricScrollRef}
          onWheel={(e) => {
            // 歌词框滚动到边界时，阻止滚轮事件传播到外层（防止整个页面上下移动）
            const el = e.currentTarget
            const canScroll = el.scrollHeight > el.clientHeight + 1
            if (!canScroll) { e.preventDefault(); return }
            const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1 && e.deltaY > 0
            const atTop = el.scrollTop <= 0 && e.deltaY < 0
            if (atBottom || atTop) e.preventDefault()
          }}
        >{lyrics.length === 0 ? <LyricLine $s={0}>暂无歌词</LyricLine> : lyrics.map((line, i) => {
          const d = i - lyricIndex
          const isActive = d === 0
          return (
            <LyricLine key={i} ref={isActive ? activeRef : undefined} $s={d} onClick={() => seekTo(line.time)}>
              <span
                ref={isActive ? gradientRef : undefined}
                className={isActive ? 'active-gradient' : ''}
                style={isActive ? {
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundImage: 'linear-gradient(to right, #FF4D4F 0%, rgba(255,255,255,.3) 0%)',
                } : { color: 'inherit', backgroundImage: 'none', WebkitTextFillColor: 'unset', WebkitBackgroundClip: 'unset' }}
              >{line.text}</span>
            </LyricLine>
          )
        })}</LyricScroll>
      </LyricsWrap>

      <BottomBar $visible={barVisible} onMouseEnter={() => { clearTimeout(barTimerRef.current!); setBarVisible(true) }} onMouseLeave={showBar}>
        <ProgressTrack onClick={handleProgressClick}>
          <div className="fill" style={{ width: `${Math.min(100, progress)}%` }} />
          <div className="thumb" style={{ left: `${Math.min(100, progress)}%` }} />
        </ProgressTrack>
        <TimeDisplay>
          <span>{String(Math.floor(timeDisplay.cur / 60)).padStart(2, '0')}:{String(Math.floor(timeDisplay.cur % 60)).padStart(2, '0')}</span>
          <span>{String(Math.floor(timeDisplay.dur / 60)).padStart(2, '0')}:{String(Math.floor(timeDisplay.dur % 60)).padStart(2, '0')}</span>
        </TimeDisplay>
        <Controls>
          <CtrlCluster $align="left">
            <TrackInfo><TrackCover $src={trackThumb} className={!picUrl ? 'empty' : ''} /><TrackMeta><div className="title">{currentSong?.name || '-'}</div><div className="artist">{currentSong?.ar?.[0]?.name || '-'}</div></TrackMeta></TrackInfo>
          </CtrlCluster>
          <CtrlCluster $align="center">
            <CtrlBtn onClick={handlePrev}><StepBackwardOutlined /></CtrlBtn>
            <PlayBtn onClick={togglePlay}>{isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}</PlayBtn>
            <CtrlBtn onClick={handleNext}><StepForwardOutlined /></CtrlBtn>
          </CtrlCluster>
          <CtrlCluster $align="right">
            <CtrlBtn $liked={liked} onClick={handleLike}>{liked ? <HeartFilled /> : <HeartOutlined />}</CtrlBtn>
          </CtrlCluster>
        </Controls>
      </BottomBar>

      <PlaylistPanel $peek={peek} data-immersive-panel>
        <PanelTabs>
          <PanelTab className={panelTab === 'queue' ? 'active' : ''} onClick={() => setPanelTab('queue')}>播放队列</PanelTab>
          <PanelTab className={panelTab === 'mine' ? 'active' : ''} onClick={() => setPanelTab('mine')}>我的歌单</PanelTab>
        </PanelTabs>
        <PanelContent>
        {panelTab === 'queue' && playSongList.map((s: any, i: number) => (
          <QueueItem key={s.id || i} $active={i === playSongIndex} onClick={() => playAt(i)}>
            <img src={getImageSize(s?.al?.picUrl, 80)} alt="" />
            <div className="info"><div className="name">{s.name}</div><div className="artist">{s?.ar?.[0]?.name}</div></div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,.22)', flexShrink: 0, marginLeft: 8 }}>
              {s.dt ? `${Math.floor(s.dt / 60000)}:${String(Math.floor((s.dt % 60000) / 1000)).padStart(2, '0')}` : ''}
            </span>
          </QueueItem>
        ))}
        {panelTab === 'mine' && (!isLoggedIn ? (
          <LoginPrompt onClick={handleGoLogin}>(˶ᵔ ᵕ ᵔ˶)  要先登录哦</LoginPrompt>
        ) : myPlaylists.length === 0 ? (
          <div style={{ color: 'rgba(255,255,255,.25)', fontSize: '13px', textAlign: 'center', padding: '40px 0' }}>暂无歌单</div>
        ) : myPlaylists.map((p) => (
          <QueueItem key={p.id} $active={false} onClick={() => dispatch(playPlaylistAction(p.id))}>
            <img src={getImageSize(p.coverImgUrl, 80)} alt="" />
            <div className="info"><div className="name">{p.name}</div><div className="artist">{p.trackCount} 首</div></div>
          </QueueItem>
        )))}
        </PanelContent>
      </PlaylistPanel>

    </Overlay>
    {toasts.map((t, i) => (
      <ToastMessage
        key={t.id}
        top={80 + i * 52}
        msg="登录才可以收藏哦"
        icon="(๑☉ᴗ☉)"
        onDone={() => removeToast(t.id)}
      />
    ))}
    </>, document.body)
})

export default ImmersivePlayer
