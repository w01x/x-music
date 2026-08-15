import { memo, useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

interface Props {
  msg: string
  type?: 'success' | 'error' | 'warning'
  duration?: number
  onDone?: () => void
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
}

const colorMap = {
  success: '#52c41a',
  error: '#ff4d4f',
  warning: '#faad14',
}

const ToastMessage = memo(({ msg, type = 'warning', duration = 2500, onDone }: Props) => {
  const [phase, setPhase] = useState<'in' | 'show' | 'out'>('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('show'), 350)
    const t2 = setTimeout(() => setPhase('out'), duration + 350)
    const t3 = setTimeout(() => onDone?.(), duration + 550)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [duration, onDone])

  if (phase === 'out' && !onDone) return null

  const Icon = iconMap[type]
  const isOut = phase === 'out'

  return (
    <div
      style={{
        position: 'fixed',
        top: 80,
        left: '50%',
        transform: isOut
          ? 'translateX(-50%) translateY(0)'
          : phase === 'in'
            ? 'translateX(-50%) translateY(-12px)'
            : 'translateX(-50%) translateY(0)',
        opacity: isOut ? 0 : phase === 'in' ? 0 : 1,
        transition: isOut
          ? 'opacity 0.5s ease, transform 0.5s ease'
          : 'opacity 0.3s cubic-bezier(0.16,1,0.3,1), transform 0.3s cubic-bezier(0.16,1,0.3,1)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 24px',
        borderRadius: 999,
        fontSize: 14,
        color: '#e8e8e8',
        background: 'rgba(22,24,34,0.65)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
      }}
    >
      <Icon size={17} color={colorMap[type]} style={{ flexShrink: 0 }} />
      <span>{msg}</span>
    </div>
  )
})

ToastMessage.displayName = 'ToastMessage'

export default ToastMessage
