import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`from{opacity:0}to{opacity:1}`
const drift = keyframes`0%,100%{transform:scale(1.12)translate(0,0)}50%{transform:scale(1.18)translate(-1.5%,-1%)}`
const breathe = keyframes`0%,100%{transform:scale(1)}50%{transform:scale(1.025)}`
const float = keyframes`0%,100%{transform:translateY(0)translateX(0)}33%{transform:translateY(-24px)translateX(8px)}66%{transform:translateY(-8px)translateX(-6px)}`
const thumbParticleA = keyframes`0%{opacity:.8;transform:translate(-50%,-50%)scale(1)}100%{opacity:0;transform:translate(-18px,-17px)scale(.2)}`
const thumbParticleB = keyframes`0%{opacity:.7;transform:translate(-50%,-50%)scale(1)}100%{opacity:0;transform:translate(16px,13px)scale(.22)}`

/* ── 全屏 ─────────────────────────────── */
export const Overlay = styled.div`
  position: fixed; inset: 0; z-index: 200; display: flex;
  animation: ${fadeIn} .6s ease; overflow: hidden;
  overscroll-behavior: none;
  background: #0a0a0f;
`
export const BgImage = styled.div<{ $src: string }>`
  position: absolute; inset: -60px;
  background: url(${({ $src }) => $src}) center/cover no-repeat;
  filter: blur(100px) saturate(.95) brightness(.42);
  animation: ${drift} 35s ease-in-out infinite;
  &::after {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 35% 45%, rgba(180,40,40,.14) 0%, transparent 60%),
                radial-gradient(ellipse at 70% 60%, rgba(20,10,10,.1) 0%, transparent 50%),
                rgba(0,0,0,.38);
  }
`
export const Noise = styled.div`
  position: absolute; inset: 0; opacity: .025; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
`
export const Particles = styled.div`
  position: absolute; inset: 0; opacity: .12; pointer-events: none;
  &::before, &::after {
    content: ''; position: absolute; border-radius: 50%; background: rgba(255,200,200,.4);
    animation: ${float} 18s ease-in-out infinite;
  }
  &::before { width: 2px; height: 2px; left: 25%; top: 55%; animation-delay: 0s; }
  &::after  { width: 3px; height: 3px; left: 65%; top: 35%; animation-delay: -6s; }
  .p3 { width: 1.5px; height: 1.5px; left: 45%; top: 70%; animation-delay: -12s; position: absolute; border-radius: 50%; background: rgba(255,180,180,.35); animation: ${float} 22s ease-in-out infinite; }
`

/* ── 关闭 ─────────────────────────────── */
export const CloseBtn = styled.button`
  position: absolute; top: 22px; right: 32px; z-index: 30;
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,.05); backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,.06); color: rgba(255,255,255,.45);
  font-size: 17px; cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all .2s ease;
  &:hover { background: rgba(255,255,255,.12); color: #fff; transform: scale(1.05); }
`

/* ── 左侧歌曲面板 ──── */
export const SongPanel = styled.div`
  position: absolute; left: clamp(120px, 10vw, 280px); top: 50%; transform: translateY(-50%); z-index: 5;
  display: flex; flex-direction: column; align-items: flex-start; gap: clamp(14px, 1vw, 28px);
  margin-top: clamp(-56px, -2vw, -28px);
`
export const Cover = styled.div`
  width: 300px; height: 300px; border-radius: 18px; overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.04);
  animation: ${breathe} 6s ease-in-out infinite;
  flex-shrink: 0;
  background: #0a0a0f;
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`
export const CoverFallback = styled.div`
  width: 100%; height: 100%;
  background: #0a0a0f;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 8px; padding: 0 18px; text-align: center;
  .cover-title { font-size: 18px; font-weight: 600; color: rgba(255,255,255,.85); line-height: 1.3; }
  .cover-artist { font-size: 13px; color: rgba(255,255,255,.4); }
`
export const Meta = styled.div`
  .name { font-size: 38px; font-weight: 700; color: #fff; letter-spacing: -.5px; line-height: 1.15; margin-bottom: 6px; max-width: 300px; }
  .artist { font-size: 15px; color: rgba(255,255,255,.4); margin-bottom: 2px; }
  .album { font-size: 12px; color: rgba(255,255,255,.22); }
`

/* ── 歌词 ──── */
export const LyricsWrap = styled.div`
  position: absolute; right: 10%; top: 50%; transform: translateY(-50%);
  width: 32%; height: 72%; z-index: 5;
  overflow: hidden; border-radius: 14px;
  background: transparent;
  /* 边框用伪元素绘制，通过遮罩实现上下两端渐变消失 */
  &::after {
    content: ''; position: absolute; inset: 0; border-radius: 14px;
    border: 1px solid rgba(0,0,0,.45);
    mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
    pointer-events: none;
  }
`
export const LyricScroll = styled.div`
  height: 100%; overflow-y: auto; text-align: center;
  padding: 28px 0;
  overscroll-behavior: contain;
  mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
  scrollbar-width: none; &::-webkit-scrollbar { display: none; }
`
export const LyricLine = styled.p<{ $s: number }>`
  font-size: ${({ $s }) => $s === 0 ? 'clamp(24px, 1.7vw, 42px)' : $s === 1 ? 'clamp(14px, 0.95vw, 24px)' : $s === -1 ? 'clamp(12px, 0.8vw, 20px)' : 'clamp(10px, 0.7vw, 18px)'};
  font-weight: ${({ $s }) => $s === 0 ? 600 : 400};
  color: ${({ $s }) => $s === 0 ? '#fff' : $s === 1 ? 'rgba(255, 255, 255, 0.51)' : $s === -1 ? 'rgba(231, 216, 216, 0.81)' : 'rgba(248, 248, 248, 0.33)'};
  text-shadow: ${({ $s }) => $s === 0 ? '0 0 40px rgba(226, 105, 107, 0.2), 0 0 40px rgba(236, 83, 85, 0.3)' : 'none'};
  line-height: 2.6; cursor: pointer;
  transition: font-size .4s cubic-bezier(.4,0,.2,1), opacity .4s cubic-bezier(.4,0,.2,1);
  &:hover { color: rgba(255,255,255,.5); }
`

/* ══════════════════════════════════════════
   底部悬浮玻璃胶囊播放器
   ══════════════════════════════════════════ */

export const BottomBar = styled.div<{ $visible: boolean }>`
  --accent: #FF4D4F; --accent-rgb: 255,77,79;

  position: fixed; z-index: 6; bottom: 16px; left: 50%;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  width: min(72vw, calc(100vw - 40px));
  padding: 10px 20px 12px;
  border-radius: 50px;
  border: 0;
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  opacity: ${({ $visible }) => ($visible ? .94 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateX(-50%) translateY(0) scale(1)' : 'translateX(-50%) translateY(36px) scale(.972)')};
  transition: opacity .34s cubic-bezier(.16,1,.3,1), transform .46s cubic-bezier(.16,1,.3,1);
  background: ${({ $visible }) => ($visible ? 'rgba(20,20,26,.55)' : 'transparent')};
  backdrop-filter: ${({ $visible }) => ($visible ? 'blur(24px) saturate(1.8) brightness(1.12)' : 'none')};
  -webkit-backdrop-filter: ${({ $visible }) => ($visible ? 'blur(24px) saturate(1.8) brightness(1.12)' : 'none')};
  box-shadow: ${({ $visible }) => ($visible
    ? '0 0 0 1px rgba(255,255,255,.06), 0 0 20px rgba(255,255,255,.04), inset 0 0 2px 1px rgba(255,255,255,.18), inset 0 0 10px 4px rgba(255,255,255,.06), 0 4px 16px rgba(0,0,0,.25), 0 8px 32px rgba(0,0,0,.2), 0 16px 56px rgba(0,0,0,.15), inset 0 4px 16px rgba(0,0,0,.1)'
    : 'none')};
`

/* ── 进度条 ──────────────────────────── */
export const ProgressTrack = styled.div`
  position: relative; z-index: 1; align-self: center;
  width: calc(100% - 120px); height: 2px; margin: 2px auto 0;
  background: rgba(255,255,255,.08); border-radius: 999px;
  cursor: pointer; overflow: visible;
  opacity: 1; transition: height .2s, background .2s;

  &:hover { height: 4px; background: rgba(255,255,255,.14); }

  .fill {
    height: 100%; border-radius: 999px;
    background: linear-gradient(90deg, rgba(255,255,255,.92), rgba(255,77,79,.74));
    transition: width .12s linear;
    box-shadow: 0 0 12px rgba(255,77,79,.14);
  }

  .thumb {
    position: absolute; left: 0; top: 50%; width: 13px; height: 13px;
    border-radius: 50%;
    background: radial-gradient(circle at 34% 28%, #fff 0, #fff 28%, rgba(255,200,200,.86) 74%);
    box-shadow: 0 0 0 1px rgba(255,255,255,.34), 0 0 18px rgba(255,200,200,.28);
    transform: translate(-50%,-50%) scale(.72);
    opacity: 0; pointer-events: none;
    transition: opacity .16s, transform .16s;
    &::before, &::after {
      content: ''; position: absolute; left: 50%; top: 50%;
      width: 3px; height: 3px; border-radius: 50%;
      background: rgba(255,255,255,.9);
      box-shadow: 0 0 10px rgba(255,77,79,.42);
      opacity: 0; transform: translate(-50%,-50%);
    }
  }
  &:hover .thumb, &.dragging .thumb { opacity: 1; transform: translate(-50%,-50%) scale(1); }
  &.dragging .thumb::before { animation: ${thumbParticleA} .62s ease-out infinite; }
  &.dragging .thumb::after  { animation: ${thumbParticleB} .72s ease-out infinite; }
`

export const TimeDisplay = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  width: calc(100% - 120px); font-size: 11px; color: rgba(255,255,255,.35);
  font-variant-numeric: tabular-nums; letter-spacing: .3px;
  margin-top: -4px;
`

/* ── 控制区 3 列网格 ─────────────────── */
export const Controls = styled.div`
  position: relative; z-index: 1;
  width: 100%; display: grid;
  grid-template-columns: minmax(0,1fr) max-content minmax(0,1fr);
  align-items: center; gap: 14px;
`
export const CtrlCluster = styled.div<{ $align: string }>`
  display: flex; align-items: center; gap: 12px; min-width: 0; height: 56px;
  justify-content: ${({ $align }) => $align === 'left' ? 'flex-start' : $align === 'right' ? 'flex-end' : 'center'};
`

/* 曲目信息（左侧） */
export const TrackInfo = styled.div`
  display: flex; align-items: center; gap: 12px; min-width: 0; flex: 1 1 auto;
`
export const TrackCover = styled.div<{ $src: string }>`
  width: 48px; height: 48px; border-radius: 12px; flex: 0 0 auto;
  background: url(${({ $src }) => $src}) center/cover;
  background-color: rgba(255,255,255,.07);
  border: 0;
  box-shadow: 0 10px 28px rgba(0,0,0,.24), inset 0 1px 0 rgba(255,255,255,.15), inset 0 0 0 1px rgba(255,255,255,.06);
  &.empty { background: radial-gradient(circle at 35% 28%, rgba(255,255,255,.15), transparent 24%), linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02)); }
`
export const TrackMeta = styled.div`
  min-width: 0; max-width: min(280px, 100%);
  display: flex; flex-direction: column; gap: 2px;
  .title { font-size: 13px; font-weight: 700; color: rgba(255,255,255,.9); line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; }
  .artist { font-size: 11px; color: rgba(255,255,255,.45); line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; }
`

/* ── 按钮 ────────────────────────────── */
export const CtrlBtn = styled.button<{ $active?: boolean; $liked?: boolean }>`
  flex: 0 0 auto; width: 34px; height: 34px;
  background: transparent; border: 0; border-radius: 11px;
  color: ${({ $liked, $active }) => $liked ? '#ff7a90' : $active ? 'rgba(210,244,241,.9)' : 'rgba(255,255,255,.65)'};
  cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0;
  transition: color .18s, transform .18s, background .18s, box-shadow .18s;
  will-change: transform;
  svg { width: 20px; height: 20px; }
  &:hover {
    color: #fff;
    background: rgba(255,255,255,.04);
    transform: translateY(-1px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.04);
  }
  &:active { transform: translateY(0) scale(.96); }
  &:focus-visible { outline: 1px solid rgba(255,77,79,.34); outline-offset: 2px; }
`

/* 播放按钮（悬浮于胶囊之上） */
export const PlayBtn = styled.button`
  width: 56px; height: 56px; border: 0; border-radius: 50%;
  color: rgba(255,255,255,.96); display: flex; align-items: center; justify-content: center; cursor: pointer;
  background: rgba(20,20,26,.55);
  backdrop-filter: blur(24px) saturate(1.8) brightness(1.1);
  -webkit-backdrop-filter: blur(24px) saturate(1.8) brightness(1.1);
  transition: transform .2s cubic-bezier(.16,1,.3,1), background .2s, box-shadow .2s;
  box-shadow:
    inset 0 0 2px 1px rgba(255,255,255,.18),
    inset 0 0 10px 4px rgba(255,255,255,.06),
    0 6px 24px rgba(0,0,0,.3),
    0 0 18px rgba(255,77,79,.08);
  svg { width: 24px; height: 24px; }
  &:hover {
    background: rgba(255,255,255,.08);
    transform: translateY(-1px) scale(1.02);
    box-shadow:
      inset 0 0 2px 1px rgba(255,255,255,.24),
      inset 0 0 12px 5px rgba(255,255,255,.08),
      0 12px 34px rgba(0,0,0,.35),
      0 0 18px rgba(255,77,79,.15);
  }
  &:active {
    transform: translateY(0) scale(.96);
    box-shadow: inset 0 0 2px 1px rgba(255,255,255,.14), inset 0 0 10px 4px rgba(255,255,255,.04), 0 8px 22px rgba(0,0,0,.25);
  }
`

/* ── 左侧滑出歌单面板 ─────────────────── */
export const PlaylistPanel = styled.div<{ $peek: boolean }>`
  position: fixed; z-index: 17; top: 78px;
  left: ${({ $peek }) => ($peek ? '32px' : '-410px')};
  width: 340px; height: calc(100vh - 200px); overflow: auto;
  background: rgba(12,12,18,.42);
  border: 1px solid rgba(255,255,255,.08); border-radius: 20px;
  padding: 0;
  display: flex; flex-direction: column;
  backdrop-filter: blur(40px) saturate(1.4);
  -webkit-backdrop-filter: blur(40px) saturate(1.4);
  box-shadow:
    0 0 0 1px rgba(255,255,255,.06), 0 0 20px rgba(255,255,255,.04),
    inset 0 0 2px 1px rgba(255,255,255,.18), inset 0 0 10px 4px rgba(255,255,255,.06),
    0 4px 16px rgba(0,0,0,.25), 0 8px 32px rgba(0,0,0,.2), 0 24px 80px rgba(0,0,0,.45),
    inset 0 4px 16px rgba(0,0,0,.1);
  opacity: ${({ $peek }) => ($peek ? '1' : '0')};
  transition: left .55s cubic-bezier(.16,1,.3,1), opacity .45s cubic-bezier(.16,1,.3,1), transform .55s cubic-bezier(.16,1,.3,1);
  pointer-events: ${({ $peek }) => ($peek ? 'auto' : 'none')};
  transform: ${({ $peek }) => ($peek ? 'translateX(0)' : 'translateX(-16px)')};
  overscroll-behavior: contain;
  &::-webkit-scrollbar { width: 0; display: none; }
`
export const PanelTabs = styled.div`
  position: sticky; top: 0; z-index: 2;
  padding: 18px 18px 0;
  background: rgba(12,12,18,.42);
  backdrop-filter: blur(40px) saturate(1.4);
  -webkit-backdrop-filter: blur(40px) saturate(1.4);
  border-radius: 20px 20px 0 0;
`

export const PanelContent = styled.div`
  flex: 1; overflow-y: auto; padding: 10px 18px 32px;
  &::-webkit-scrollbar { width: 3px; }
  &::-webkit-scrollbar-thumb { background: rgba(255,77,79,.2); border-radius: 3px; }
`

export const LoginPrompt = styled.div`
  margin: 40px auto;
  width: fit-content;
  padding: 10px 32px;
  font-size: 13px;
  color: rgba(255,255,255,.65);
  cursor: pointer;
  border: 1px solid rgba(255,255,255,.22);
  border-radius: 999px;
  transition: color .18s, border-color .18s, background .18s;
  user-select: none;

  &:hover {
    color: #fff;
    background: rgba(255,255,255,.06);
    border-color: rgba(255,255,255,.45);
  }
`

export const PanelTab = styled.button`
  background: none; border: none; border-bottom: 2px solid transparent;
  color: rgba(255,255,255,.3); font-size: 13px; cursor: pointer;
  padding: 6px 0; margin-right: 22px; transition: all .2s;
  &.active { color: #fff; border-bottom-color: #FF4D4F; }
  &:hover { color: rgba(255,255,255,.6); }
`
export const QueueItem = styled.div<{ $active: boolean }>`
  display: flex; align-items: center; gap: 12px; padding: 10px 12px;
  border-radius: 10px; cursor: pointer; transition: all .15s;
  background: ${({ $active }) => ($active ? 'rgba(255,77,79,.1)' : 'transparent')};
  border: ${({ $active }) => ($active ? '1px solid rgba(255,77,79,.15)' : '1px solid transparent')};
  &:hover { background: rgba(255,255,255,.03); }
  img { width: 40px; height: 40px; border-radius: 6px; object-fit: cover; }
  .info { flex: 1; min-width: 0;
    .name { font-size: 13px; color: ${({ $active }) => ($active ? '#FF4D4F' : '#fff')}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .artist { font-size: 11px; color: rgba(255,255,255,.3); }
  }
`
