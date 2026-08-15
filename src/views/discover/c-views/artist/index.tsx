import { memo, useEffect, useState } from 'react'

import type { FC } from 'react'

import { useAppDispatch, useAppSelector } from '@/store'

import { fetchArtistListAction } from './store/thunk'

import ArtistSidebar from './c-cpns/artist-sidebar'

import HotArtist from './c-cpns/hot-artist'

import { ArtistWrapper } from './style'

const Artist: FC = () => {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState("热门歌手")

  const { artistList, loading, currentArea, currentType } = useAppSelector((state: any) => ({
    artistList: state.artist.artistList || [],
    loading: state.artist.loading,
    currentArea: state.artist.currentArea ?? -1,
    currentType: state.artist.currentType ?? -1,
  }))

  useEffect(() => {
    dispatch(
      fetchArtistListAction({
        limit: 100,

        area: -1,

        type: -1,

        initial: -1,
      })
    )
  }, [dispatch])

  const handleCategoryChange = (name: string) => {
    setTitle(name === "推荐歌手" ? "热门歌手" : name)
  }

  return (
    <ArtistWrapper>
      {/* 左侧 */}
      <div className="left">
        <ArtistSidebar onCategoryChange={handleCategoryChange} />
      </div>

      {/* 右侧 */}
      <div className="right">
        <HotArtist artists={artistList} loading={loading} currentArea={currentArea} currentType={currentType} title={title} />
      </div>
    </ArtistWrapper>
  )
}

export default memo(Artist)
