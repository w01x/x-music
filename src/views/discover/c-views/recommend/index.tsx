import { memo, useEffect } from "react"
import { useAppDispatch, useAppSelector, shallowEqualApp } from "@/store"
import { fetchRecommendDataAction, fetchRankingListDataAction } from "./store/recommend"
import MusicLoader from "@/components/music-loader"

import TopBanner from "./c-cpns/top-banner"
import NewAlbum from "./c-cpns/new-album"
import PopularArtists from "./c-cpns/popular-artists"
import HotPlayList from "./c-cpns/hot-playlist"
import TopRanking from "./c-cpns/top-ranking"

const Recommend = () => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.recommend.loading, shallowEqualApp)

  useEffect(() => {
    dispatch(fetchRecommendDataAction())
    dispatch(fetchRankingListDataAction())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#181818]">
      <div className="max-w-[1440px] mx-auto px-10 pb-24 pt-0">
        {loading ? (
          <div className="flex items-center justify-center min-h-[600px]">
            <MusicLoader />
          </div>
        ) : (
          <>
            <TopBanner />
            <NewAlbum />
            <HotPlayList />
            <div className="h-10" />
            <PopularArtists />
            <TopRanking />
          </>
        )}
      </div>
    </div>
  )
}

export default memo(Recommend)
