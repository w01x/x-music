import MusicLoader from '@/components/music-loader'

import { memo } from "react"
import type { FC } from "react"
import { AlbumSidebarWrapper } from "./style"
import { getImageSize } from "@/utils/format"

interface IProps {
  artistAlbums: any[]
  loading?: boolean
}

const AlbumSidebar: FC<IProps> = ({ artistAlbums, loading }) => {
  return (
    <AlbumSidebarWrapper>
      <div className="section-title">歌手其他专辑</div>

      {loading ? (
        <div className="empty"><MusicLoader /></div>
      ) : artistAlbums.length > 0 ? (
        <div className="album-list">
          {artistAlbums.map((item: any) => (
            <a
              key={item.id}
              className="album-item"
              href={`#/discover/album/${item.id}`}
            >
              <img
                src={getImageSize(item.picUrl, 50)}
                alt={item.name}
              />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="meta">
                  {item.publishTime
                    ? new Date(item.publishTime).getFullYear()
                    : item.size
                    ? `${item.size} 首`
                    : ""}
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="empty">暂无其他专辑</div>
      )}
    </AlbumSidebarWrapper>
  )
}

export default memo(AlbumSidebar)
