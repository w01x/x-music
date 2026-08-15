import { memo } from "react"
import type { FC } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import ArtistItem from "../artist-item"
import { ArtistGridSkeleton, skeletonStyles } from "@/components/skeleton"
import { HotArtistWrapper } from "./style"

interface IProps {
  artists: any[]
  loading: boolean
  currentArea: number
  currentType: number
  title?: string
}

const HotArtist: FC<IProps> = (props) => {
  const { artists, loading, title = "热门歌手" } = props
  const navigate = useNavigate()

  if (loading) {
    return (
      <HotArtistWrapper>
        <style>{skeletonStyles}</style>
        <div className="header">
          <h2>{title}</h2>
        </div>
        <ArtistGridSkeleton cols={5} rows={1} />
      </HotArtistWrapper>
    )
  }

  const topArtists = artists.slice(0, 20)
  const restArtists = artists.slice(20)

  const handleNameClick = (id: number) => {
    navigate(`/discover/artist/${id}`)
  }

  return (
    <HotArtistWrapper>
      <div className="header">
        <h2>{title}</h2>
        <span
          className="all-link"
          onClick={() => navigate("/discover/artist")}
        >
          全部歌手
          <ArrowRight />
        </span>
      </div>

      <div className="list">
        {topArtists.map((item: any) => (
          <ArtistItem key={item.id} item={item} />
        ))}
      </div>

      {restArtists.length > 0 && (
        <div className="tag-cloud">
          {restArtists.map((item: any) => (
            <span
              className="tag-item"
              key={item.id}
              onClick={() => handleNameClick(item.id)}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
    </HotArtistWrapper>
  )
}

export default memo(HotArtist)
