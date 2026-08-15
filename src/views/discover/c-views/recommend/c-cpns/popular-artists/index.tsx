
import { memo, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Play } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { getArtistList } from "../../service/recommend"

interface ArtistItem {
  id: number
  name: string
  picUrl: string
}

const PopularArtists = () => {
  const [items, setItems] = useState<ArtistItem[]>([])
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [snapCount, setSnapCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    getArtistList(12).then((res: any) => {
      const list = (res.artists || []).slice(0, 12).map((item: any) => ({
        id: item.id,
        name: item.name,
        picUrl: item.picUrl || item.img1v1Url || "",
      }))
      setItems(list)
    })
  }, [])

  useEffect(() => {
    if (!api) return
    const onSelect = () => setActiveIndex(api.selectedScrollSnap())
    api.on("select", onSelect)
    api.on("reInit", () => {
      setSnapCount(api.scrollSnapList().length)
      setActiveIndex(api.selectedScrollSnap())
    })
    setSnapCount(api.scrollSnapList().length)
    setActiveIndex(api.selectedScrollSnap())
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  if (!items.length) return null

  return (
    <section className="mt-4 mb-16">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white" style={{ marginLeft: 24 }}>热门歌手</h2>
        <span
          onClick={() => navigate("/discover/artist")}
          className="cursor-pointer text-sm text-gray-400 transition hover:text-white"
        >
          查看更多 →
        </span>
      </div>
      <div className="mx-6 mt-4 mb-5 h-[1px] bg-zinc-500/40" />

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          slidesToScroll: 1,
          containScroll: "trimSnaps",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 py-4">
          {items.map((artist) => (
            <CarouselItem key={artist.id} className="basis-1/3 md:basis-1/4 lg:basis-1/6 pl-2 py-2">
              <div
                className="group flex flex-col items-center cursor-pointer"
                onClick={() => navigate(`/discover/artist/${artist.id}`)}
              >
                <div className="relative w-[104px] h-[104px]">
                  <img
                    src={`${artist.picUrl}?param=208y208`}
                    alt={artist.name}
                    className="w-full h-full rounded-full object-cover shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
                  />
                  <div
                    className="absolute inset-0 hidden group-hover:flex items-center justify-center rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/discover/artist/${artist.id}`)
                    }}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md shadow-lg">
                      <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-[15px] font-semibold text-white/90 transition-colors duration-500 group-hover:text-white">
                  {artist.name}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {snapCount > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-[6px] h-[6px] bg-white"
                  : "w-[6px] h-[6px] bg-white/25 hover:bg-white/45"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default memo(PopularArtists)
