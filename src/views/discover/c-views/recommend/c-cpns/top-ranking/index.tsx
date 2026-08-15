import { memo } from "react"
import { useNavigate } from "react-router-dom"
import { TrendingUp, Music2, Sparkles } from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/store"
import { fetchCurrentSongAction } from "@/views/player/store/player"

const RANK_ICONS: Record<number, React.ComponentType<{ className?: string }>> = {
  19723756: TrendingUp,
  3779629: Music2,
  2884035: Sparkles,
}

const ICON_COLORS: Record<number, { icon: string; bg: string }> = {
  19723756: { icon: "text-red-300", bg: "bg-red-400/3" },
  3779629: { icon: "text-purple-300", bg: "bg-purple-400/3" },
  2884035: { icon: "text-yellow-200", bg: "bg-yellow-300/3" },
}

const RANK_GLOW: Record<number, string> = {
  19723756: "bg-[#ff6b35]",
  3779629: "bg-[#8b5cf6]",
  2884035: "bg-[#f5a623]",
}

const TopRanking = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { rankings = [] } = useAppSelector((state) => ({
    rankings: state.recommend.Ranking,
  }))

  if (rankings.length === 0) return null

  const handlePlay = (id: number) => {
    dispatch(fetchCurrentSongAction(id))
  }

  return (
    <section className="mt-4 mb-16">
      <style>{`
        @media (max-width: 768px) {
          .ranking-scroll {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 12px;
            padding: 0 12px;
          }
          .ranking-scroll::-webkit-scrollbar { display: none; }
          .ranking-scroll > * {
            min-width: 85vw;
            scroll-snap-align: center;
            flex-shrink: 0;
          }
        }
      `}</style>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white" style={{ marginLeft: 24 }}>热门榜单</h2>
        <span
          onClick={() => navigate("/discover/ranking")}
          className="cursor-pointer text-sm text-gray-400 transition hover:text-white"
        >
          查看更多 →
        </span>
      </div>
      <div className="mx-6 mt-4 mb-5 h-[1px] bg-zinc-500/40" />

      <div className="ranking-scroll grid grid-cols-3 gap-5">
        {rankings.slice(0, 3).map((item: any) => {
          const tracks = (item.tracks || []).slice(0, 10)
          const IconComponent = RANK_ICONS[item.id] || Music2
          const iconColors = ICON_COLORS[item.id] || { icon: "text-white/70", bg: "bg-white/[0.06]" }
          const glow = RANK_GLOW[item.id] || "bg-white/10"

          return (
            <div
              key={item.id}
              className="group cursor-pointer relative overflow-hidden rounded-[20px] border border-white/[0.05] bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/[0.05] hover:border-white/[0.08] hover:shadow-2xl hover:shadow-black/30"
            >
              <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-3/4 h-24 rounded-full blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-30 ${glow}`} />

              <div className="relative flex items-center gap-2.5 mb-5">
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${iconColors.bg}`}>
                  <IconComponent className={`w-4 h-4 ${iconColors.icon}`} />
                </span>
                <h3 className="text-base font-bold text-white transition-colors duration-300 group-hover:text-white/90">
                  {item.name}
                </h3>
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/discover/playlist/${item.id}`)
                  }}
                  className="ml-auto text-[11px] text-white/25 font-medium transition-colors duration-300 hover:text-white/60"
                >
                  查看完整榜单 →
                </span>
              </div>

              {tracks.length > 0 ? (
                <div className="space-y-1.5">
                  {tracks.map((track: any, idx: number) => {
                    const isTop3 = idx < 3
                    return (
                      <div
                        key={track.id || idx}
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePlay(track.id)
                        }}
                        className={`flex items-center gap-3 rounded-lg px-2 py-1.5 -mx-2 transition-all duration-200 hover:bg-white/[0.06] ${
                          isTop3 ? "bg-white/[0.03]" : ""
                        }`}
                      >
                        <span
                          className={`w-5 text-center font-bold text-xs shrink-0 ${
                            idx === 0
                              ? "text-[#FF4D4F] text-sm"
                              : idx === 1
                                ? "text-[#ff7875] text-sm"
                                : idx === 2
                                  ? "text-[#ffab45] text-sm"
                                  : "text-white/30"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span
                          className={`truncate flex-1 transition-colors duration-200 hover:text-white ${
                            isTop3 ? "text-white/90 text-[13px] font-medium" : "text-white/55 text-[12px]"
                          }`}
                        >
                          {track.name}
                        </span>
                        <span className="text-[11px] text-white/20 truncate max-w-[90px] shrink-0">
                          {track.ar?.map((a: any) => a.name).join("/")}
                        </span>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-xs text-white/25 py-2">暂无歌曲</p>
              )}

            </div>
          )
        })}
      </div>
    </section>
  )
}

export default memo(TopRanking)
