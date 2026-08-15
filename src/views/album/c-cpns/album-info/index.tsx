
import { memo, useState, useEffect } from "react"
import type { FC } from "react"
import { useAppDispatch, useAppSelector } from "@/store"
import { playAlbumAction } from "@/views/player/store/player"
import { AlbumInfoWrapper } from "./style"
import { getImageSize } from "@/utils/format"
import { subscribeAlbum } from "../../service"
import { toast } from '@/utils/toast'

interface IProps {
  album: any
  loading?: boolean
}

const AlbumInfo: FC<IProps> = ({ album, loading }) => {
  const dispatch = useAppDispatch()
  const [showFullDesc, setShowFullDesc] = useState(false)

  const { cookie } = useAppSelector((state) => ({
    cookie: state.loginUser.cookie,
  }))

  const [subscribed, setSubscribed] = useState(false)
  const [subscribing, setSubscribing] = useState(false)

  useEffect(() => {
    setSubscribed(album?.isSub || false)
  }, [album?.id])

  async function handleCollect() {
    if (!cookie) { toast.warning('请先登录'); return }
    if (!album?.id || subscribing) return
    setSubscribing(true)
    const t = subscribed ? 0 : 1
    try {
      const res: any = await subscribeAlbum(album.id, t, cookie)
      if (res.code === 200) {
        setSubscribed(!subscribed)
        toast.success(t ? '已收藏' : '已取消收藏')
      } else {
        toast.error(res.message || '操作失败')
      }
    } catch {
      toast.error('操作失败，请稍后重试')
    } finally {
      setSubscribing(false)
    }
  }

  if (loading || !album) return null

  const artist = album.artist || {}
  const desc = album.description || ""

  return (
    <AlbumInfoWrapper>
      <div className="cover">
        <img src={getImageSize(album.picUrl, 200)} alt={album.name} />
        <div className="mask" />
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

        <div className="actions">
          <button
            className="btn btn-play"
            onClick={() => dispatch(playAlbumAction(album.id))}
          >
            <i className="" />
            播放全部
          </button>
          <button
            className="btn btn-favor"
            onClick={handleCollect}
            disabled={subscribing}
          >
            {subscribing ? "..." : subscribed ? "取消收藏" : "收藏"}
          </button>
        </div>

        {desc && (
          <div className={`desc ${showFullDesc ? "expanded" : ""}`}>
            <p>介绍：{desc}</p>
            {desc.length > 100 && (
              <button
                className="toggle-desc"
                onClick={() => setShowFullDesc(!showFullDesc)}
              >
                {showFullDesc ? "收起" : "展开全部"}
              </button>
            )}
          </div>
        )}
      </div>
    </AlbumInfoWrapper>
  )
}

export default memo(AlbumInfo)
