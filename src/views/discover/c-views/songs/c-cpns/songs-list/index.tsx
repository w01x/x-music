
import React, { memo } from "react"
import { Play, Heart } from "lucide-react"
import {
  SongsListWrapper,
  CardWrapper,
  CoverWrapper,
  PlayOverlay,
  PlayCircle,
  CardInfo,
  CardName,
  CardMeta
} from "./style"
import { useAppDispatch } from "@/store"
import { playPlaylistAction } from "@/views/player/store/player"

interface IProps {
  playlists?: any[]
}

function formatCount(count: number): string {
  if (count >= 100000000) return `${(count / 100000000).toFixed(1)}亿`
  if (count >= 10000) return `${(count / 10000).toFixed(1)}万`
  return String(count)
}

const SongsList: React.FC<IProps> = (props) => {
  const { playlists = [] } = props
  const dispatch = useAppDispatch()

  function handlePlayClick(e: React.MouseEvent, id: number) {
    e.stopPropagation()
    e.preventDefault()
    dispatch(playPlaylistAction(id))
  }

  function handleCardClick(id: number) {
    window.location.hash = `#/discover/playlist/${id}`
  }

  return (
    <SongsListWrapper>
      {playlists.map((item) => (
        <CardWrapper
          key={item.id}
          onClick={() => handleCardClick(item.id)}
        >
          <CoverWrapper className="cover-wrapper">
            <img src={item.coverImgUrl} alt="" loading="lazy" />

            <PlayOverlay className="play-overlay">
              <PlayCircle className="play-circle" onClick={(e) => handlePlayClick(e, item.id)}>
                <Play />
              </PlayCircle>
            </PlayOverlay>
          </CoverWrapper>

          <CardInfo>
            <CardName>{item.name}</CardName>
            <CardMeta>
              <Heart />
              {formatCount(item.playCount || 0)}收藏
            </CardMeta>
          </CardInfo>
        </CardWrapper>
      ))}
    </SongsListWrapper>
  )
}

export default memo(SongsList)
