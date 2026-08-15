/**
 * 命令式 toast — 纯 DOM 实现，样式与 ToastMessage 组件完全一致
 */

type ToastType = 'success' | 'error' | 'warning'

const ICON_SVG: Record<ToastType, string> = {
  success: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#52c41a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  error: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ff4d4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
  warning: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#faad14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
}

function show(msg: string, type: ToastType, duration = 2500) {
  const el = document.createElement('div')
  el.innerHTML = `${ICON_SVG[type]}<span>${msg}</span>`
  Object.assign(el.style, {
    position: 'fixed',
    top: '80px',
    left: '50%',
    zIndex: '9999',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    borderRadius: '999px',
    fontSize: '14px',
    color: '#e8e8e8',
    background: 'rgba(22,24,34,0.65)',
    border: '1px solid rgba(255,255,255,0.12)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
    // 入场：从上方滑入 + 淡入
    transform: 'translateX(-50%) translateY(-12px)',
    opacity: '0',
    transition: 'opacity 0.3s cubic-bezier(0.16,1,0.3,1), transform 0.3s cubic-bezier(0.16,1,0.3,1)',
  })
  document.body.appendChild(el)

  // 触发入场动画
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.transform = 'translateX(-50%) translateY(0)'
      el.style.opacity = '1'
    })
  })

  // 停留后淡出消失
  setTimeout(() => {
    el.style.opacity = '0'
    el.style.transition = 'opacity 0.5s ease'
    setTimeout(() => el.remove(), 500)
  }, duration)
}

export const toast = {
  success: (msg: string) => show(msg, 'success'),
  error: (msg: string) => show(msg, 'error'),
  warning: (msg: string) => show(msg, 'warning'),
}
