
import {
  memo,
  useEffect
} from "react"

import type {
  FC
} from "react"

import {
  useAppDispatch,
  useAppSelector
} from "@/store"

import {
  fetchProgramToplistAction
} from "../../store/thunk"

import {
  playProgramAction
} from "@/views/player/store/player"

import {
  RankingWrapper
} from "./style"

interface IProps {
  limit?: number
  showHeader?: boolean
}

const ProgramRanking: FC<IProps> = ({
  limit = 100,
  showHeader = true
}) => {

  const dispatch =
    useAppDispatch()

  function handlePlayClick(e: React.MouseEvent, programId: number) {
    e.stopPropagation()
    dispatch(playProgramAction(programId))
  }

  const programToplist = useAppSelector(
    (state: any) => state.djradio.programToplist || []
  )

  useEffect(() => {
    dispatch(fetchProgramToplistAction(limit))
  }, [dispatch, limit])

  if (programToplist.length === 0) return null

  return (

    <RankingWrapper>

      {showHeader && (
        <div className="header">

          <h2>
            节目排行榜
          </h2>

          <span>
            热门节目
          </span>

        </div>
      )}

      <div className="list">

        {
          programToplist.map(
            (
              item: any,
              index: number
            ) => {

              const program =
                item.program

              const rank = index + 1

              return (

                <div
                  className="program-item"
                  key={program.id}
                >

                  <div
                    className={
                      `rank${rank <= 3 ? " top3" : ""}`
                    }
                  >
                    {rank}
                  </div>

                  <img
                    src={program.coverUrl}
                    alt=""
                  />
                  <i
                    className="play-btn"
                    onClick={(e) => handlePlayClick(e, program.id)}
                  />

                  <div className="info">

                    <div className="name">
                      <a href={`#/discover/program/${program.id}`}>{program.name}</a>
                    </div>

                    <div className="radio">
                      {
                        program.radio?.name
                      }
                    </div>

                  </div>

                  <div className="meta">

                    <span className="score">
                      热度：{item.score}
                    </span>

                    <span className="listener">
                      播放：
                      {
                        program.listenerCount
                      }
                    </span>

                  </div>

                </div>
              )
            }
          )
        }

      </div>
    </RankingWrapper>
  )
}

export default memo(ProgramRanking)
