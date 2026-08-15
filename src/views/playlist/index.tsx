import MusicLoader from '@/components/music-loader'
import { memo, useEffect, useState } from "react"
import type { FC } from "react"
import { useParams } from "react-router-dom"
import PlaylistInfo from "./c-cpns/playlist-info"
import PlaylistSidebar from "./c-cpns/playlist-sidebar"
import SongListTable from "@/components/song-list-table"
import { getPlaylistDetail, getSongDetail, getRelatedPlaylist } from "./service"
import { PlaylistWrapper } from "./style"
import { useAppSelector } from "@/store"

const CHUNK_SIZE = 500

const Playlist: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { cookie } = useAppSelector((state) => ({
    cookie: state.loginUser.cookie,
  }))
  const [playlist, setPlaylist] = useState<any>(null)
  const [songs, setSongs] = useState<any[]>([])
  const [related, setRelated] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    const playlistId = Number(id)
    if (isNaN(playlistId)) return

    setLoading(true)
    setPlaylist(null)
    setSongs([])
    setRelated([])

    const fetchData = async () => {
      try {
        const res: any = await getPlaylistDetail(playlistId, cookie || undefined)
        const pl = res.playlist || {}
        setPlaylist(pl)

        const trackIds: number[] = (pl.trackIds || []).map((t: any) => t.id)

        if (trackIds.length > 0) {
          const chunks: number[][] = []
          for (let i = 0; i < trackIds.length; i += CHUNK_SIZE) {
            chunks.push(trackIds.slice(i, i + CHUNK_SIZE))
          }

          const songResults = await Promise.all(
            chunks.map((chunk) => getSongDetail(chunk.join(",")))
          )
          const allSongs = songResults.flatMap((r: any) => r.songs || [])
          setSongs(allSongs)
        }
      } catch (err) {
        console.error("Failed to fetch playlist detail:", err)
      } finally {
        setLoading(false)
      }

      getRelatedPlaylist(playlistId, cookie || undefined)
        .then((res: any) => {
          const rawList = res?.data?.recPlaylist || res?.playlists || []
          const list = rawList.map((item: any) => item.playlist || item)
          setRelated(list)
        })
        .catch((err) => {
          console.error("Failed to fetch related playlists:", err)
        })
    }

    fetchData()
  }, [id, cookie])

  return (
    <PlaylistWrapper>
      <div className="main">
        {loading && !playlist ? (
          <div className="loading-placeholder"><MusicLoader /></div>
        ) : (
          <>
            <PlaylistInfo playlist={playlist} />

            <div className="song-list-header">
              <h3>歌曲列表</h3>
              <span className="count">{songs.length} 首歌</span>
            </div>

            <SongListTable songs={songs} />
          </>
        )}
      </div>

      <div className="sidebar">
        <PlaylistSidebar playlist={playlist} related={related} loading={loading} />
      </div>
    </PlaylistWrapper>
  )
}

export default memo(Playlist)
