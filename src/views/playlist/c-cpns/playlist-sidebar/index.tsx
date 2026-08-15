import MusicLoader from '@/components/music-loader'

import { memo } from "react"
import type { FC } from "react"
import { useNavigate } from "react-router-dom"
import { PlaylistSidebarWrapper } from "./style"
import { getImageSize, formatCount } from "@/utils/format"

interface IProps {
  playlist: any
  related: any[]
  loading?: boolean
}

const PlaylistSidebar: FC<IProps> = ({ playlist, related, loading }) => {
  const navigate = useNavigate()

  return (
    <PlaylistSidebarWrapper>
      {playlist && (
        <div className="stats-card">
          <div className="stat-item">
            <span className="stat-value">{formatCount(playlist.playCount || 0)}</span>
            <span className="stat-label">播放</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{formatCount(playlist.subscribedCount || 0)}</span>
            <span className="stat-label">收藏</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{formatCount(playlist.shareCount || 0)}</span>
            <span className="stat-label">分享</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{playlist.trackCount || 0}</span>
            <span className="stat-label">歌曲</span>
          </div>
        </div>
      )}

      <div className="section-title">相关歌单推荐</div>

      {loading ? (
        <div className="empty"><MusicLoader /></div>
      ) : related.length > 0 ? (
        <div className="related-list">
          {related.map((item: any) => (
            <div
              key={item.id}
              className="related-item"
              onClick={() => {
                navigate(`/discover/playlist/${item.id}`)
                window.scrollTo(0, 0)
              }}
            >
              <img
                src={getImageSize(item.coverImgUrl, 48)}
                alt={item.name}
              />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="meta">
                  {formatCount(item.playCount)} 次播放
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">暂无推荐</div>
      )}
    </PlaylistSidebarWrapper>
  )
}

export default memo(PlaylistSidebar)
