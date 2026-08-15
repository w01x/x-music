
import { memo } from "react"
import type { FC } from "react"
import { useAppDispatch } from "@/store"
import { playProgramAction } from "@/views/player/store/player"
import { ProgramInfoWrapper } from "./style"
import { getImageSize, formatTime } from "@/utils/format"

interface IProps {
  program: any
  loading?: boolean
}

const ProgramInfo: FC<IProps> = ({ program, loading }) => {
  const dispatch = useAppDispatch()

  if (loading || !program) return null

  const dj = program.dj || {}
  const radio = program.radio || {}
  const desc = program.description || ""
  const duration = program.duration || 0

  return (
    <ProgramInfoWrapper>
      <div className="cover">
        <img src={getImageSize(program.coverUrl, 200)} alt={program.name} />
        <div className="mask" />
      </div>

      <div className="info">
        <div className="title">
          <i className="tag" />
          <h2>{program.name}</h2>
        </div>

        <div className="dj">
          主播：{dj.nickname || "未知主播"}
        </div>

        <div className="radio">
          电台：{radio.name || "未知电台"}
        </div>

        <div className="actions">
          <button
            className="btn btn-play"
            onClick={() => dispatch(playProgramAction(program.id))}
          >
            <i className="" />
            播放 {formatTime(duration)}
          </button>
        </div>

        {desc && (
          <div className="desc">
            <p>介绍：{desc}</p>
          </div>
        )}
      </div>
    </ProgramInfoWrapper>
  )
}

export default memo(ProgramInfo)
