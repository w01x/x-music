import { memo } from 'react'
import type { FC } from 'react'
import type { IAlbum } from '../../types'
import { useAppDispatch, useAppSelector, shallowEqualApp } from '@/store'
import { playAlbumAction } from '@/views/player/store/player'
import { CardGridSkeleton, skeletonStyles } from '@/components/skeleton'
import { ArtistAlbumWrapper } from './style'

interface IProps {
  albums: IAlbum[]
}

const ArtistAlbum: FC<IProps> = ({ albums }) => {
  const dispatch = useAppDispatch()
  const albumsLoading = useAppSelector((state) => state.artistDetail.albumsLoading, shallowEqualApp)

  const handlePlay = (id: number) => {
    dispatch(playAlbumAction(id))
  }

  return (
    <ArtistAlbumWrapper>
      {albumsLoading ? (
        <>
          <style>{skeletonStyles}</style>
          <CardGridSkeleton cols={5} rows={1} />
        </>
      ) : albums.length > 0 ? (
        <ul className="album-list">
          {albums.map((album) => (
            <li
              key={album.id}
              className="album-item"
            >
              <a
                className="cover"
                href={`#/discover/album/${album.id}`}
              >
                <img src={album.picUrl} alt={album.name} />
              </a>
              <p
                className="album-name"
                onClick={() => handlePlay(album.id)}
              >
                {album.name}
              </p>
              <p className="publish-time">
                {new Date(album.publishTime).getFullYear()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty">暂无专辑</p>
      )}
    </ArtistAlbumWrapper>
  )
}

export default memo(ArtistAlbum)
