
import { memo, useEffect } from "react"
import type { FC, ReactNode } from "react"

import {
  LeftWrapper,
  GroupTitle,
  RankingItem
} from "./style"

import {
  shallowEqualApp,
  useAppDispatch,
  useAppSelector
} from "@/store"

import {
  fetchTopListDetailAction,
  fetchPlayListDetailAction
} from "../../store/asyncThunk"

import {
  changeCurrentIndexAction
} from "../../store/ranking"

import {
  splitTopList
} from "../../utils/splitTopList"
import { cleanName } from "@/utils/format"

interface IProps {
  children?: ReactNode
}

const RankingLeft: FC<IProps> = () => {
  const dispatch = useAppDispatch()

  const {
    topList,
    currentIndex
  } = useAppSelector(
    (state) => ({
      topList: state.ranking.topList,
      currentIndex:
        state.ranking.currentIndex
    }),
    shallowEqualApp
  )

useEffect(() => {
  async function fetchData() {

    const res: any =
      await dispatch(
        fetchTopListDetailAction()
      )

    const list = res.payload || []

    const index = list.findIndex(
      (item: any) =>
        item.name === "飙升榜"
    )

    if (index !== -1) {
      dispatch(
        changeCurrentIndexAction(index)
      )
    }
  }

  fetchData()
}, [dispatch])
  useEffect(() => {
    if (!topList.length) return

    const currentItem =
      topList[currentIndex]

    dispatch(
      fetchPlayListDetailAction(
        currentItem.id
      )
    )
  }, [dispatch, topList, currentIndex])

  const {
    officialList,
    globalList
  } = splitTopList(topList)

  function handleItemClick(
    index: number
  ) {
    dispatch(
      changeCurrentIndexAction(index)
    )
  }

  function renderRankingItem(
    item: any,
    index: number
  ) {
    return (
      <RankingItem
        key={item.id}
        $active={currentIndex === index}
        onClick={() =>
          handleItemClick(index)
        }
      >
        <img
          src={item.coverImgUrl}
          alt=""
        />

        <div className="info">
          <div className="name">
            {cleanName(item.name)}
          </div>

          <div className="update">
            {item.updateFrequency}
          </div>
        </div>
      </RankingItem>
    )
  }

  return (
    <LeftWrapper>

      <div className="group">
        <GroupTitle>
          云音乐特色榜
        </GroupTitle>

        {
          officialList.map(
            (item, index) =>
              renderRankingItem(
                item,
                index
              )
          )
        }
      </div>

      <div className="group">
        <GroupTitle>
          全球媒体榜
        </GroupTitle>

        {
          globalList.map(
            (
              item,
              index
            ) =>
              renderRankingItem(
                item,
                index + officialList.length
              )
          )
        }
      </div>

    </LeftWrapper>
  )
}

export default memo(RankingLeft)
