
import { memo } from "react"
import type { FC, ReactNode } from "react"
import { AlbumInfoWrapper } from "./style"
import { getImageSize, formatTime } from "@/utils/format"

interface IProps {
  children?: ReactNode
  album: any
}

const AlbumInfo: FC<IProps> = ({ album }) => {
  if (!album) return null

  const artist = album.artist || {}

  return (
    <AlbumInfoWrapper>
      <div className="cover">
        <img src={getImageSize(album.picUrl, 200)} alt={album.name} />
      </div>

      <div className="info">
        <div className="title">
          <i className="tag" />
          <h2>{album.name}</h2>
        </div>

        <div className="artist">
          歌手：
          <a href={`#/discover/artist/${artist.id}`}>{artist.name}</a>
        </div>

        <div className="meta">
          <p>发行时间：{new Date(album.publishTime).toLocaleDateString("zh-CN")}</p>
          <p>发行公司：{album.company || "未知"}</p>
        </div>

        <div className="desc">
          <h3>专辑介绍</h3>
          <p>{album.description || "暂无介绍"}</p>
        </div>
      </div>
    </AlbumInfoWrapper>
  )
}

export default memo(AlbumInfo)
