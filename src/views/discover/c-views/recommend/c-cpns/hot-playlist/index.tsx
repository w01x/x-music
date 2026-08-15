
import { memo } from "react"
import { useNavigate } from "react-router-dom"
import { Play } from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/store"
import { playPlaylistAction } from "@/views/player/store/player"

const formatPlayCount = (n?: number) => {
  if (!n) return ""
  if (n >= 100_000_000) return `${(n / 100_000_000).toFixed(1)} 亿收藏`
  if (n >= 10_000) return `${(n / 10_000).toFixed(1)} 万收藏`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k 收藏`
  return `${n} 收藏`
}

const HotPlayList = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { hotRecommends = [] } = useAppSelector((state) => ({
    hotRecommends: state.recommend.hotRecommends,
  }))

  function handlePlayClick(e: React.MouseEvent, item: any) {
    e.stopPropagation()
    e.preventDefault()
    dispatch(playPlaylistAction(item.id))
  }

  if (hotRecommends.length === 0) return null

  return (
    <div className="mt-4 mb-[5px] rounded-3xl border border-white/[0.04] bg-white/[0.02] backdrop-blur-[1px] px-6 py-5">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">热门歌单</h2>
        <span
          onClick={() => navigate("/discover/songs")}
          className="cursor-pointer text-sm text-gray-400 transition hover:text-white"
        >
          查看更多 →
        </span>
      </div>
      <div className="mt-4 mb-5 h-[1px] bg-zinc-500/40" />

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5">
        {hotRecommends.slice(0, 6).map((item: any) => (
          <div
            key={item.id}
            onClick={() => navigate(`/discover/playlist/${item.id}`)}
            className="group cursor-pointer block"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] group-hover:shadow-black/40 group-hover:ring-1 group-hover:ring-white/25">
              <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white/[0.06] via-white/[0.02] to-white/[0.06]" />
              <img
                src={item.picUrl}
                alt={item.name}
                className="aspect-square w-full object-cover scale-100 transition-transform duration-300 group-hover:brightness-110 group-hover:saturate-150 group-hover:scale-105"
              />

              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FF4D4F] to-[#ff7875] backdrop-blur-md shadow-xl shadow-red-500/25 transition-transform duration-300 scale-75 group-hover:scale-100 hover:!scale-110 active:!scale-95"
                  onClick={(e) => handlePlayClick(e, item)}
                >
                  <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
                </div>
              </div>
            </div>

            <div className="mt-3 line-clamp-1 text-base font-semibold text-white">
              {item.name}
            </div>

            <div className="mt-1 text-sm text-gray-400">
              {formatPlayCount(item.playCount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(HotPlayList)
