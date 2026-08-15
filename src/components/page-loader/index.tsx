import { memo, useState, useEffect } from 'react'
import MusicLoader from '@/components/music-loader'

/** 页面加载动画，最少显示 1s */
const PageLoader = memo(() => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1000)
    return () => clearTimeout(t)
  }, [])

  if (!show) return null

  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-4">
        <MusicLoader />
        <span className="text-sm text-white/30 tracking-wider">X-MUSIC</span>
      </div>
    </div>
  )
})

PageLoader.displayName = 'PageLoader'

export default PageLoader
