import MusicLoader from '@/components/music-loader'
import { memo, useEffect, useState } from "react"
import type { FC } from "react"
import { useParams } from "react-router-dom"
import { shallowEqualApp, useAppSelector } from "@/store"
import SongInfo from "./c-cpns/song-info"
import SongLyric from "./c-cpns/song-lyric"
import SongComment from "./c-cpns/song-comment"
import SongSidebar from "./c-cpns/song-sidebar"
import { getSongDetail, getSongLyric, getSimilarSongs } from "./service"
import { parseLyric } from "@/utils/parse-lyric"
import { SongDetailWrapper } from "./style"

const SongDetail: FC = () => {
  const { id } = useParams<{ id: string }>()
  const songId = Number(id)

  const [song, setSong] = useState<any>(null)
  const [lyrics, setLyrics] = useState<{ time: number; text: string }[]>([])
  const [similarSongs, setSimilarSongs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const { currentSong, playerLyricIndex } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      playerLyricIndex: state.player.lyricIndex
    }),
    shallowEqualApp
  )

  const isPlaying = currentSong?.id === songId
  const lyricIndex = isPlaying ? playerLyricIndex : -1

  useEffect(() => {
    if (!id || isNaN(songId)) return

    setLoading(true)
    setSong(null)
    setLyrics([])
    setSimilarSongs([])

    const fetchData = async () => {
      try {
        const [detailRes, lyricRes] = await Promise.all([
          getSongDetail(String(songId)),
          getSongLyric(songId)
        ])

        const s = detailRes.songs?.[0]
        if (s) {
          setSong(s)

          const lyricString = lyricRes.lrc?.lyric
          if (lyricString) {
            setLyrics(parseLyric(lyricString))
          }
        }
      } catch (err) {
        console.error("Failed to fetch song detail:", err)
      } finally {
        setLoading(false)
      }

      getSimilarSongs(songId)
        .then((res: any) => {
          setSimilarSongs(res.songs || [])
        })
        .catch((err) => {
          console.error("Failed to fetch similar songs:", err)
        })
    }

    fetchData()
  }, [id, songId])

  return (
    <SongDetailWrapper>
      <div className="main">
        {loading && !song ? (
          <div className="loading-placeholder"><MusicLoader /></div>
        ) : (
          <>
            <SongInfo song={song} loading={loading} />
            <SongLyric lyrics={lyrics} lyricIndex={lyricIndex} isPlaying={isPlaying} />
            <SongComment songId={songId} />
          </>
        )}
      </div>

      <div className="sidebar">
        <SongSidebar similarSongs={similarSongs} loading={loading} />
      </div>
    </SongDetailWrapper>
  )
}

export default memo(SongDetail)
