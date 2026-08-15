import { memo, useEffect, useState } from 'react'
import type { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector, shallowEqualApp } from '@/store'
import {
  fetchArtistDetailAction,
  fetchArtistAlbumAction,
  fetchArtistDescAction,
  fetchArtistInfoAction
} from './store/thunk'
import ArtistHeader from './c-cpns/artist-header'
import HotSong from './c-cpns/hot-song'
import ArtistAlbum from './c-cpns/artist-album'
import ArtistDesc from './c-cpns/artist-desc'
import Skeleton, { SongListSkeleton, skeletonStyles } from '@/components/skeleton'
import { ArtistDetailWrapper } from './style'

const tabs = [
  { key: 'songs', label: '热门歌曲' },
  { key: 'albums', label: '专辑' },
  { key: 'desc', label: '简介' }
]

const ArtistDetail: FC = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState('songs')

  const { artist, hotSongs, albums, desc, loading } = useAppSelector(
    (state) => ({
      artist: state.artistDetail.artist,
      hotSongs: state.artistDetail.hotSongs,
      albums: state.artistDetail.albums,
      desc: state.artistDetail.desc,
      loading: state.artistDetail.loading
    }),
    shallowEqualApp
  )

  useEffect(() => {
    if (!id) return
    const artistId = Number(id)
    dispatch(fetchArtistDetailAction(artistId))
    dispatch(fetchArtistAlbumAction(artistId))
    dispatch(fetchArtistDescAction(artistId))
    dispatch(fetchArtistInfoAction(artistId))
  }, [id, dispatch])

  return (
    <ArtistDetailWrapper>
      <style>{skeletonStyles}</style>
      <div className="wrap-v2">
        {loading ? (
          <>
            {/* 头部骨架 */}
            <div className="flex gap-7 py-8">
              <Skeleton width={180} height={180} radius={90} />
              <div className="flex flex-col justify-center gap-3 flex-1">
                <Skeleton width="45%" height={28} radius={12} />
                <Skeleton width="25%" height={14} radius={8} />
                <div className="flex gap-4 mt-2">
                  <Skeleton width={52} height={14} radius={8} />
                  <Skeleton width={52} height={14} radius={8} />
                  <Skeleton width={52} height={14} radius={8} />
                </div>
                <div className="flex gap-3 mt-2">
                  <Skeleton width={80} height={34} radius={20} />
                  <Skeleton width={80} height={34} radius={20} />
                </div>
              </div>
            </div>

            {/* 标签栏骨架 */}
            <div className="flex gap-1 mb-6">
              <Skeleton width={72} height={32} radius={10} />
              <Skeleton width={56} height={32} radius={10} />
              <Skeleton width={56} height={32} radius={10} />
            </div>

            {/* 歌曲列表骨架 */}
            <SongListSkeleton rows={10} />
          </>
        ) : (
          <>
            <ArtistHeader detail={artist} />

            <div className="tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`tab-item ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab === 'songs' && <HotSong songs={hotSongs} />}
              {activeTab === 'albums' && <ArtistAlbum albums={albums} />}
              {activeTab === 'desc' && <ArtistDesc desc={desc} />}
            </div>
          </>
        )}
      </div>
    </ArtistDetailWrapper>
  )
}

export default memo(ArtistDetail)
