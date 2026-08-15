import { memo } from "react"
import type { FC, ReactNode } from "react"
import RankingHeader from "./c-cpns/ranking-header"
import RankingLeft from "./c-cpns/ranking-left"
import RankingSongList from "./c-cpns/ranking-song-list"
import Skeleton, { SongListSkeleton, skeletonStyles } from "@/components/skeleton"
import { shallowEqualApp, useAppSelector } from "@/store"
import {
  RankingWrapper,
  Content
} from "./style"

interface IProps {
  children?: ReactNode
}

const Ranking: FC<IProps> = () => {
  const isListLoading = useAppSelector(
    (state) => state.ranking.isListLoading,
    shallowEqualApp
  )

  return (
    <RankingWrapper className="wrap-v2">
      <style>{skeletonStyles}</style>

      {/* 左侧榜单 */}
      <RankingLeft />

      {/* 右侧内容 */}
      <Content>
        {isListLoading ? (
          <div className="flex flex-col gap-10" style={{ padding: '40px 40px 0' }}>
            <div className="flex gap-7">
              <Skeleton width={150} height={150} radius={16} />
              <div className="flex flex-col justify-center gap-3 flex-1">
                <Skeleton width="55%" height={26} radius={12} />
                <Skeleton width="30%" height={14} radius={8} />
                <div className="flex gap-3 mt-2">
                  <Skeleton width={72} height={36} radius={22} />
                  <Skeleton width={72} height={36} radius={22} />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 h-[38px] px-2 mb-2">
                <Skeleton width={30} height={12} radius={6} />
                <Skeleton width={60} height={12} radius={6} className="flex-1" />
                <Skeleton width={50} height={12} radius={6} />
                <Skeleton width={70} height={12} radius={6} />
              </div>
              <SongListSkeleton rows={12} />
            </div>
          </div>
        ) : (
          <>
            <RankingHeader />
            <RankingSongList />
          </>
        )}
      </Content>

    </RankingWrapper>
  )
}

export default memo(Ranking)
