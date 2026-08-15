import { memo } from "react"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center py-32 text-white">
      <h1 className="text-8xl font-bold text-white/10 mb-4">404</h1>
      <p className="text-white/40 text-lg mb-8">页面不存在</p>
      <button
        className="px-8 py-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
        onClick={() => { navigate("/discover"); window.scrollTo(0, 0) }}
      >
        返回首页
      </button>
    </div>
  )
}

export default memo(NotFound)
