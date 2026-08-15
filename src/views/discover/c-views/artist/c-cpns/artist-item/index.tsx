
import { memo } from "react"
import type { FC } from "react"
import { useNavigate } from "react-router-dom"
import { Play } from "lucide-react"
import {
  ItemWrapper,
  CoverWrapper,
  PlayOverlay,
  PlayCircle,
  ArtistName,
  ArtistAlias,
  AliasText,
  VerifiedBadge
} from "./style"

interface IProps {
  item: any
}

const ArtistItem: FC<IProps> = (props) => {
  const { item } = props
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/discover/artist/${item.id}`)
  }

  function handlePlayClick(e: React.MouseEvent) {
    e.stopPropagation()
    navigate(`/discover/artist/${item.id}`)
  }

  const aliasName = item.alias?.[0] || ""

  return (
    <ItemWrapper onClick={handleClick}>
      <CoverWrapper className="cover-wrapper">
        <img src={item.picUrl} alt="" loading="lazy" />
        <PlayOverlay className="play-overlay" onClick={handlePlayClick}>
          <PlayCircle className="play-circle">
            <Play />
          </PlayCircle>
        </PlayOverlay>
      </CoverWrapper>

      <ArtistName>{item.name}</ArtistName>

      {aliasName && (
        <ArtistAlias>
          <AliasText>{aliasName}</AliasText>
          {item.accountId && <VerifiedBadge>已认证</VerifiedBadge>}
        </ArtistAlias>
      )}
    </ItemWrapper>
  )
}

export default memo(ArtistItem)
