import MusicLoader from '@/components/music-loader'
import { memo, useEffect, useState } from "react"
import type { FC } from "react"
import { useParams } from "react-router-dom"
import AlbumInfo from "./c-cpns/album-info"
import AlbumSidebar from "./c-cpns/album-sidebar"
import AlbumComment from "./c-cpns/album-comment"
import SongListTable from "@/components/song-list-table"
import { getAlbumDetail, getArtistAlbum } from "./service"
import { AlbumWrapper } from "./style"

const Album: FC = () => {
  const { id } = useParams<{ id: string }>()
  const albumId = Number(id)
  const [album, setAlbum] = useState<any>(null)
  const [songs, setSongs] = useState<any[]>([])
  const [artistAlbums, setArtistAlbums] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id || isNaN(albumId)) return

    setLoading(true)
    setAlbum(null)
    setSongs([])
    setArtistAlbums([])

    const fetchData = async () => {
      try {
        const res: any = await getAlbumDetail(albumId)
        const al = res.album || {}
        setAlbum(al)

        const tracks = res.songs || al.songs || []
        setSongs(tracks)

        const artistId = al.artist?.id
        if (artistId) {
          getArtistAlbum(artistId)
            .then((artistRes: any) => {
              const albums = (artistRes.hotAlbums || artistRes.albums || [])
                .filter((a: any) => a.id !== al.id)
                .slice(0, 8)
              setArtistAlbums(albums)
            })
            .catch((err) => {
              console.error("Failed to fetch artist albums:", err)
            })
        }
      } catch (err) {
        console.error("Failed to fetch album detail:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, albumId])

  return (
    <AlbumWrapper>
      <div className="main">
        {loading && !album ? (
          <div className="loading-placeholder"><MusicLoader /></div>
        ) : (
          <>
            <AlbumInfo album={album} />

            <div className="song-list-header">
              <h3>包含歌曲列表</h3>
              <span className="count">{songs.length} 首歌</span>
            </div>

            <SongListTable songs={songs} showAlbum={false} />

            <AlbumComment albumId={albumId} />
          </>
        )}
      </div>

      <div className="sidebar">
        <AlbumSidebar artistAlbums={artistAlbums} loading={loading} />
      </div>
    </AlbumWrapper>
  )
}

export default memo(Album)
