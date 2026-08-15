
import { memo } from "react"

import type {
  FC
} from "react"

import type {
  IProgramItem
} from "../../store/types"

import {
  useAppDispatch
} from "@/store"

import {
  playProgramAction
} from "@/views/player/store/player"

import {
  ItemWrapper
} from "./style"

interface IProps {
  item: IProgramItem
}

const DjRadioItem: FC<IProps> = ({
  item
}) => {

  const dispatch = useAppDispatch()

  function handlePlayClick(e: React.MouseEvent, programId: number) {
    e.stopPropagation()
    dispatch(playProgramAction(programId))
  }

  function handleCardClick() {
    window.location.hash =
      `#/discover/program/${item.id}`
  }

  return (

    <ItemWrapper onClick={handleCardClick}>

      <div className="cover-wrap">
        <img
          src={item.coverUrl}
          alt=""
        />
        <i
          className="play-btn"
          onClick={(e) =>
            handlePlayClick(e, item.id)
          }
        />
      </div>

      <div className="info">
        <div className="name">
          {item.name}
        </div>
        <div className="radio-name">
          {item.radio?.name}
        </div>
      </div>

    </ItemWrapper>
  )
}

export default memo(DjRadioItem)
