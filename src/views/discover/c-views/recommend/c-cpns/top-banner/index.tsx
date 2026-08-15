
import { memo, useCallback, useEffect, useRef, useState } from "react"
import { Play, Heart, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useAppDispatch } from "@/store"
import { playAlbumAction } from "@/views/player/store/player"
import { useCreatePlaylist } from "@/hooks/useCreatePlaylist"
import ToastMessage from "@/components/toast-message"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"

import { getNewAlbum } from "../../service/recommend"

interface AlbumItem {
  id: number
  name: string
  picUrl: string
  artist: string
  publishTime: string
  description: string
}

const TopBanner = () => {
  const [albums, setAlbums] = useState<AlbumItem[]>([])
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [snapCount, setSnapCount] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const dispatch = useAppDispatch()
  const {
    collectModal,
    openModal,
    closeCollectModal,
    setPlaylistName,
    confirmCreatePlaylist,
  } = useCreatePlaylist()

  const startAutoplay = useCallback(() => {
    if (intervalRef.current !== null) return
    intervalRef.current = setInterval(() => {
      api?.scrollNext()
    }, 5000)
  }, [api])

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    api.on("reInit", () => {
      setSnapCount(api.scrollSnapList().length)
      setActiveIndex(api.selectedScrollSnap())
    })

    setSnapCount(api.scrollSnapList().length)
    setActiveIndex(api.selectedScrollSnap())
    startAutoplay()

    return () => {
      api.off("select", onSelect)
      stopAutoplay()
    }
  }, [api, startAutoplay, stopAutoplay])

  useEffect(() => {
    getNewAlbum(8).then((res: any) => {
      const list = (res.albums || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        picUrl: item.picUrl || item.blurPicUrl || "",
        artist: item.artist?.name || "",
        publishTime: item.publishTime
          ? new Date(item.publishTime).getFullYear().toString()
          : "",
        description: item.description || item.company || "",
      }))
      setAlbums(list)
    })
  }, [])

  const handlePlay = useCallback((albumId: number) => {
    dispatch(playAlbumAction(albumId))
  }, [dispatch])

  if (albums.length === 0) return null

  const current = albums[activeIndex % albums.length]

  return (
    <section className="mb-10 -mt-12 top-banner-section">
      <style>{`
        @media (max-width: 768px) {
          .top-banner-section > div { height: 200px !important; border-radius: 14px !important; }
          .top-banner-section .pl-16 { padding-left: 16px !important; }
          .top-banner-section .pr-10 { padding-right: 12px !important; }
          .top-banner-section .w-\\[180px\\] { width: 100px !important; height: 100px !important; }
          .top-banner-section h1 { font-size: 16px !important; }
          .top-banner-section .text-\\[13px\\] { font-size: 10px !important; }
          .top-banner-section .text-xs { font-size: 9px !important; max-width: 180px !important; }
          .top-banner-section .bottom-6 { bottom: 4px !important; }
          .top-banner-section .right-10 { right: 4px !important; }
          .top-banner-section .h-\\[40px\\] { height: 32px !important; padding: 0 14px !important; font-size: 11px !important; }
          .top-banner-section .w-11 { width: 28px !important; height: 28px !important; }
          .top-banner-section .left-5 { left: 8px !important; }
          .top-banner-section .right-5 { right: 8px !important; }
          .top-banner-section .gap-6 { gap: 12px !important; }
        }
      `}</style>

      <div
        className="relative rounded-[22px] overflow-hidden h-[265px]"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={current.picUrl}
            alt=""
            className="w-full h-full object-cover scale-[1.35] blur-[50px] brightness-[0.55] saturate-[2]"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse 55% 70% at 25% 50%, rgba(0,0,0,0.18) 0%, transparent 65%)",
              "radial-gradient(circle 300px at 15% 20%, rgba(56,120,255,0.12) 0%, transparent 70%)",
              "radial-gradient(circle 250px at 85% 15%, rgba(255,180,80,0.10) 0%, transparent 70%)",
              "radial-gradient(circle 200px at 90% 85%, rgba(255,120,60,0.08) 0%, transparent 70%)",
            ].join(", "),
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/12 via-black/4 to-transparent" />

        <Carousel
          opts={{
            align: "start",
            loop: true,
            duration: 60,
          }}
          setApi={setApi}
          className="relative w-full h-full"
        >
          <CarouselContent className="h-full">
            {albums.map((album) => (
              <CarouselItem key={album.id} className="basis-full h-full">
                <div className="relative flex items-center h-full pl-16 pr-10 pt-6 pb-4 gap-6">
                  <div className="shrink-0 group/cover">
                    <img
                      src={album.picUrl}
                      alt={album.name}
                      className="w-[180px] h-[180px] rounded-[18px] object-cover shadow-[0_8px_36px_rgba(0,0,0,0.45)] group-hover/cover:scale-[1.03] group-hover/cover:shadow-[0_14px_48px_rgba(0,0,0,0.55)] transition-all duration-500"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-center relative z-10">
                    <p className="text-[11px] text-white/35 font-semibold tracking-[3px] mb-2.5">
                      NEW RELEASE
                    </p>
                    <h1 className="text-[26px] font-bold leading-[1.2] tracking-tight line-clamp-2" style={{ color: "#fff" }}>
                      {album.name}
                    </h1>
                    <p className="text-[13px] font-medium mt-1" style={{ color: "rgba(255,255,255,0.82)" }}>
                      {album.artist}
                      {album.publishTime && (
                        <span className="mx-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>·</span>
                      )}
                      {album.publishTime}
                    </p>
                    {album.description && (
                      <p className="text-xs mt-1.5 leading-relaxed line-clamp-2 max-w-md" style={{ color: "rgba(255,255,255,0.62)" }}>
                        {album.description}
                      </p>
                    )}
                  </div>

                  <div className="absolute bottom-6 right-10 flex items-center gap-2.5 z-10">
                    <button
                      onClick={() => handlePlay(album.id)}
                      className="flex items-center gap-2 bg-[#FF4D4F] hover:bg-[#ff7875] text-white h-[40px] px-6 rounded-full font-bold text-[13px] transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_4px_16px_rgba(255,77,79,0.3)] hover:shadow-[0_6px_20px_rgba(255,77,79,0.4)]"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      立即播放
                    </button>
                    <button
                      onClick={() => openModal(album.id, album.name)}
                      disabled={collectModal.loading}
                      className="flex items-center gap-2 text-white/70 hover:text-white h-[40px] px-5 rounded-full font-semibold text-[13px] border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200 disabled:opacity-50"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      收藏
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <button
          onClick={() => api?.scrollPrev()}
          className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/8 border border-white/10 backdrop-blur-xl hover:bg-white/20 hover:border-white/30 hover:scale-110 flex items-center justify-center transition-all duration-200 z-10"
        >
          <ChevronLeftIcon className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={() => api?.scrollNext()}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/8 border border-white/10 backdrop-blur-xl hover:bg-white/20 hover:border-white/30 hover:scale-110 flex items-center justify-center transition-all duration-200 z-10"
        >
          <ChevronRightIcon className="w-4 h-4 text-white" />
        </button>

        {snapCount > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 h-[3px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    : "w-[5px] h-[5px] bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={collectModal.open} onOpenChange={(open) => { if (!open) closeCollectModal() }}>
        <AlertDialogContent size="default">
          <AlertDialogHeader>
            <AlertDialogTitle>创建歌单</AlertDialogTitle>
            <AlertDialogDescription>
              {collectModal.songs.length > 0
                ? `将添加 ${collectModal.songs.length} 首歌曲到此歌单`
                : "输入歌单名称来创建新歌单"}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <input
            type="text"
            value={collectModal.playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="请输入歌单名称"
            maxLength={50}
            className="w-full h-10 px-3 rounded-lg bg-[#2a2a2a] border border-white/10 text-white text-sm placeholder:text-white/25 outline-none focus:border-white/30 transition-colors"
          />

          {collectModal.status === "fetchError" && (
            <Alert variant="destructive">
              <AlertDescription>获取歌曲失败，请稍后重试</AlertDescription>
            </Alert>
          )}
          {collectModal.status === "createError" && (
            <Alert variant="destructive">
              <AlertDescription>创建失败，请稍后重试</AlertDescription>
            </Alert>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeCollectModal}>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => { e.preventDefault(); confirmCreatePlaylist() }}
              disabled={!collectModal.playlistName.trim() || collectModal.loading}
              className="!bg-[#FF4D4F] hover:!bg-[#ff7875]"
            >
              {collectModal.loading ? "创建中..." : "创建"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {collectModal.status === "login" && (
        <ToastMessage msg="请先登录后再收藏" onDone={() => closeCollectModal()} />
      )}
    </section>
  )
}

export default memo(TopBanner)
