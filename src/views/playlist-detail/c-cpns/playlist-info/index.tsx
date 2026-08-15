
import { memo, useState, useEffect } from "react"
import type { FC, ReactNode } from "react"
import { Play } from "lucide-react"
import { PlaylistInfoWrapper } from "./style"
import { getImageSize } from "@/utils/format"
import { useAppSelector, useAppDispatch } from "@/store"
import { playPlaylistAction } from "@/views/player/store/player"
import { subscribePlaylist } from "../../service/playlist-detail"
import { toast } from "@/utils/toast"

interface IProps {
  children?: ReactNode
  playlist: any
}

const PlaylistInfo: FC<IProps> = ({ playlist }) => {
  const dispatch = useAppDispatch()
  const { cookie } = useAppSelector((state) => ({
    cookie: state.loginUser.cookie,
  }))

  const [subscribed, setSubscribed] = useState(false)
  const [subscribing, setSubscribing] = useState(false)

  useEffect(() => {
    setSubscribed(playlist?.subscribed || false)
  }, [playlist?.id])

  async function handleCollect() {
    if (!cookie || !playlist?.id || subscribing) return
    setSubscribing(true)
    const t = subscribed ? 0 : 1
    try {
      const res: any = await subscribePlaylist(playlist.id, t, cookie)
      if (res.code === 200) {
        setSubscribed(!subscribed)
      }
    } catch {
      toast.error("当前账号触发了网易云限制，请稍后重试或使用官方客户端完成此操作。")
    } finally {
      setSubscribing(false)
    }
  }

  if (!playlist) return null

  const creator = playlist.creator || {}

  return (
    <PlaylistInfoWrapper>
      <div className="cover">
        <img src={getImageSize(playlist.coverImgUrl, 200)} alt={playlist.name} />
      </div>

      <div className="info">
        <div className="title">
          <h2>{playlist.name}</h2>
        </div>

        <div className="creator">
          <img src={getImageSize(creator.avatarUrl, 35)} alt={creator.nickname} />
          <a href={`#/user/home?id=${creator.userId}`}>{creator.nickname}</a>
          <span className="time">{new Date(playlist.createTime).toLocaleDateString("zh-CN")} 创建</span>
        </div>

        <div className="actions">
          <button
            className="btn btn-play"
            onClick={(e) => {
              e.stopPropagation()
              dispatch(playPlaylistAction(playlist.id))
            }}
          >
            <Play className="w-4 h-4 fill-current" style={{ marginRight: 4 }} />
            播放
          </button>
          <button
            className="btn btn-favor"
            onClick={handleCollect}
            disabled={subscribing}
          >
            {subscribing ? "..." : subscribed ? "♥ 已收藏" : "+ 收藏"}
          </button>
        </div>

        {playlist.tags?.length > 0 && (
          <div className="tags">
            {playlist.tags.map((tag: string) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}

        {playlist.description && (
          <div className="desc">
            <p>{playlist.description}</p>
          </div>
        )}
      </div>
    </PlaylistInfoWrapper>
  )
}

export default memo(PlaylistInfo)
