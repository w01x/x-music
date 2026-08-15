
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
  fetchRecommendProgramAction
} from "../../store/thunk"

import {
  playProgramAction
} from "@/views/player/store/player"

import {
  RecommendWrapper
} from "./style"

const Recommend: FC = () => {

  const dispatch =
    useAppDispatch()

  function handlePlayClick(e: React.MouseEvent, programId: number) {
    e.stopPropagation()
    dispatch(playProgramAction(programId))
  }

  const {
    programs,
    loading
  } = useAppSelector(
    (state: any) => ({

      programs:
        state.djradio.programs || [],

      loading:
        state.djradio.loading
    })
  )

  useEffect(() => {

    dispatch(
      fetchRecommendProgramAction(50)
    )

  }, [dispatch])

  if (loading) {

    return (

      <RecommendWrapper>

        <div className="loading">
          Loading...
        </div>

      </RecommendWrapper>
    )
  }

  return (

    <RecommendWrapper>

      <div className="header">
        <h2>推荐节目</h2>
      </div>

      <div className="list">

        {
programs.map((item:any)=>{

  return (

    <div
      className="program-item"
      key={item.id}
    >

      <img
        src={item.coverUrl}
        alt=""
      />

      <i
        className="play-btn"
        onClick={(e) => handlePlayClick(e, item.id)}
      />

      <div className="name">
        <a href={`#/discover/program/${item.id}`}>{item.name}</a>
      </div>

      <div className="radio">
        {item.radio?.name}
      </div>

      <div className="count">
        播放：
        {item.listenerCount || 0}
      </div>

      <div className="like">
        赞：
        {item.likedCount || 0}
      </div>

    </div>
  )
})}
      </div>

    </RecommendWrapper>
  )
}

export default memo(Recommend)
