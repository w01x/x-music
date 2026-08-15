import { memo, useState, useEffect } from "react"
import type { FC, ReactNode } from "react"
import { Pagination } from "antd"
import type {
  ITrack
} from "../../types"

import {
  shallowEqualApp,
  useAppSelector
} from "@/store"

import RankingSongItem
from "../ranking-song-item"

import {
  SongListWrapper
} from "./style"

interface IProps {
  children?: ReactNode
}

const RankingSongList: FC<IProps> = () => {

  const {
    tracks,
    currentSongId
  } = useAppSelector(
    (state) => ({
      tracks:
        state.ranking.currentPlayList
          ?.tracks || [],

      currentSongId:
        state.player.currentSong.id
    }),
    shallowEqualApp
  )

  const [currentPage, setCurrentPage] =
    useState(1)

  const pageSize = 100

  useEffect(() => {
    setCurrentPage(1)
  }, [tracks?.length])

  const start =
    (currentPage - 1) * pageSize

  const end = start + pageSize

  const showTracks =
tracks?.slice(start, end) || []

  return (

    <SongListWrapper>

      {/* 表头 */}
      <div className="header">

        <div className="rank">
          #
        </div>

        <div className="title">
          标题
        </div>

        <div className="duration">
          时长
        </div>

        <div className="singer">
          歌手
        </div>

      </div>

      {/* 歌曲 */}
      {!tracks || tracks.length === 0 ? (
        <div className="empty-hint">暂无歌曲</div>
      ) : (
        showTracks.map(
          (
            item: ITrack,
            index: number
          ) => {

            return (
              <RankingSongItem
                key={item.id}

                item={item}

                index={
                  index + start
                }

                currentSongId={
                  currentSongId
                }
              />
            )
          }
        )
      )}

      {/* 分页 */}
<Pagination
  className="pagination"

  current={currentPage}

  total={tracks.length}

  pageSize={pageSize}

  showSizeChanger={false}

  onChange={(page) => {
    setCurrentPage(page)
  }}
/>

    </SongListWrapper>
  )
}

export default memo(RankingSongList)
