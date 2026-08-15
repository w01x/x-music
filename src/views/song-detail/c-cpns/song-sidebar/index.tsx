import MusicLoader from '@/components/music-loader'

import { memo } from "react"
import type { FC } from "react"
import { SidebarWrapper } from "./style"
import { getImageSize } from "@/utils/format"

interface IProps {
  similarSongs: any[]
  loading?: boolean
}

const SongSidebar: FC<IProps> = ({ similarSongs, loading }) => {
  return (
    <SidebarWrapper>
      <div className="section-title">相似歌曲</div>

      {loading ? (
        <div className="empty"><MusicLoader /></div>
      ) : similarSongs.length > 0 ? (
        <div className="similar-list">
          {similarSongs.map((song: any) => (
            <a
              key={song.id}
              className="similar-item"
              href={`#/discover/song/${song.id}`}
            >
              <img
                src={getImageSize(song.album?.picUrl || song.al?.picUrl, 50)}
                alt={song.name}
              />
              <div className="info">
                <div className="name">{song.name}</div>
                <div className="artist">
                  {(song.artists || song.ar)?.map((a: any, i: number) => (
                    <span key={a.id}>
                      {i > 0 && ' / '}
                      <a href={`#/discover/artist/${a.id}`}>{a.name}</a>
                    </span>
                  )) || "未知歌手"}
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="empty">暂无推荐</div>
      )}
    </SidebarWrapper>
  )
}

export default memo(SongSidebar)
