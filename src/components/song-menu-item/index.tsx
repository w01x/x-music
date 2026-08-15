
import { memo } from "react"
import { ReactNode, FC } from "react"
import { Play } from "lucide-react"
import { useAppDispatch } from "@/store"
import { playPlaylistAction } from "@/views/player/store/player"
import { MenuItemWrapper } from "./style"
import { formatCount, getImageSize } from "@/utils/format"

interface IProps {
  children?: ReactNode
  itemData: any
}

const SongMenuItem: FC<IProps> = (props) => {
  const { itemData } = props
  const dispatch = useAppDispatch()

  function handlePlay(e: React.MouseEvent) {
    e.stopPropagation()
    e.preventDefault()
    dispatch(playPlaylistAction(itemData.id))
  }

  return (
    <MenuItemWrapper>
      <a
        className="top"
        href={`#/discover/playlist/${itemData.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={getImageSize(itemData.picUrl, 140)} alt="" />
        <div className="cover">
          <div className="info">
            <span className="count">
              <span className="headset">&#x266C;</span>
              {formatCount(itemData.playCount)}
            </span>
            <button className="play" onClick={handlePlay}><Play className="w-3 h-3 fill-current" /></button>
          </div>
        </div>
      </a>
      <div className="bottom">{itemData.name}</div>
    </MenuItemWrapper>
  )
}
export default memo(SongMenuItem)
