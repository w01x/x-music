
import React, { memo, useMemo } from "react"
import { Play } from "lucide-react"
import {
  BannerWrapper,
  BannerGlow,
  BannerBg,
  BannerOverlay,
  BannerVignette,
  BannerContent,
  BannerCover,
  BannerInfo,
  BannerLabel,
  BannerTitle,
  BannerDesc,
  BannerPlayBtn
} from "./style"
import { useAppDispatch } from "@/store"
import { playPlaylistAction } from "@/views/player/store/player"

interface IProps {
  playlists: any[]
}

const SongsBanner: React.FC<IProps> = (props) => {
  const { playlists } = props
  const dispatch = useAppDispatch()

  const featured = useMemo(() => {
    if (!playlists.length) return null
    const sorted = [...playlists].sort(
      (a, b) => (b.playCount || 0) - (a.playCount || 0)
    )
    return sorted[0]
  }, [playlists])

  if (!featured || !featured.coverImgUrl) return null

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(playPlaylistAction(featured.id))
  }

  const handleNavigate = () => {
    window.location.hash = `#/discover/playlist/${featured.id}`
  }

  return (
    <BannerWrapper onClick={handleNavigate}>
      <BannerGlow $image={featured.coverImgUrl} />
      <BannerBg $image={featured.coverImgUrl} />
      <BannerOverlay />
      <BannerVignette />
      <BannerContent>
        <BannerCover
          onClick={(e) => {
            e.stopPropagation()
            handleNavigate()
          }}
        >
          <img src={featured.coverImgUrl} alt="" />
        </BannerCover>
        <BannerInfo>
          <BannerLabel>精选歌单</BannerLabel>
          <BannerTitle>{featured.name}</BannerTitle>
          {featured.description && (
            <BannerDesc>{featured.description}</BannerDesc>
          )}
          <BannerPlayBtn onClick={handlePlay}>
            <Play />
            立即播放
          </BannerPlayBtn>
        </BannerInfo>
      </BannerContent>
    </BannerWrapper>
  )
}

export default memo(SongsBanner)
