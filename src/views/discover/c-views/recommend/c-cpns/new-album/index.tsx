
import { memo, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Play } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { useAppDispatch } from "@/store"
import { playAlbumAction } from "@/views/player/store/player"
import { getNewestAlbum } from "../../service/recommend"

interface AlbumItem {
  id: number
  name: string
  picUrl: string
  artist?: {
    name: string
  }
  artists?: {
    name: string
  }[]
}

const NewAlbum = () => {
  const [albums, setAlbums] = useState<AlbumItem[]>([])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getNewestAlbum(24)
        setAlbums(res.albums || [])
      } catch (err) {
        console.error("获取最新专辑失败:", err)
      }
    }
    fetchData()
  }, [])

  function handlePlayClick(e: React.MouseEvent, item: AlbumItem) {
    e.stopPropagation()
    e.preventDefault()
    dispatch(playAlbumAction(item.id))
  }

  return (
    <div className="mt-4 mb-[5px] rounded-3xl border border-white/[0.04] bg-white/[0.02] backdrop-blur-[1px] px-6 py-5">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">最新专辑</h2>
        <span
          className="cursor-pointer text-sm text-gray-400 transition hover:text-white"
          onClick={() => navigate("/discover/album")}
        >
          查看更多 →
        </span>
      </div>
      <div className="mt-4 mb-5 h-[1px] bg-zinc-500/40" />

      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 6,
        }}
        className="w-full"
      >
        <CarouselContent className="py-3">
          {albums.map((item) => (
            <CarouselItem key={item.id} className="basis-1/3 md:basis-1/4 lg:basis-1/6 px-3 md:px-5">
              <Link
                to={`/discover/album/${item.id}`}
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

                <div className="mt-1 line-clamp-1 text-sm text-gray-400">
                  {item.artist?.name || item.artists?.[0]?.name}
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default memo(NewAlbum)
