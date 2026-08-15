
import { memo, useState, useEffect } from "react"
import type { FC } from "react"
import { useAppDispatch, useAppSelector } from "@/store"
import { playPlaylistAction } from "@/views/player/store/player"
import { PlaylistInfoWrapper } from "./style"
import { getImageSize } from "@/utils/format"
import { subscribePlaylist } from "../../service"
import { toast } from "@/utils/toast"

interface IProps {
  playlist: any
  loading?: boolean
}

const PlaylistInfo: FC<IProps> = ({ playlist, loading }) => {
  const dispatch = useAppDispatch()
  const [showFullDesc, setShowFullDesc] = useState(false)

  const { cookie } = useAppSelector((state) => ({
    cookie: state.loginUser.cookie,
  }))

  const [subscribed, setSubscribed] = useState(false)
  const [subscribing, setSubscribing] = useState(false)

  useEffect(() => {
    setSubscribed(playlist?.subscribed || false)
  }, [playlist?.id])

  async function handleCollect() {
    if (!cookie) { toast.warning('请先登录'); return }
    if (!playlist?.id || subscribing) return
    setSubscribing(true)
    const t = subscribed ? 0 : 1
    try {
      const res: any = await subscribePlaylist(playlist.id, t, cookie)
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

  if (loading || !playlist) return null

  const creator = playlist.creator || {}
  const desc = playlist.description || ""

  return (
    <PlaylistInfoWrapper>
      <div className="cover">
        <img src={getImageSize(playlist.coverImgUrl, 200)} alt={playlist.name} />
        <div className="mask" />
      </div>

      <div className="info">
        <div className="title">
          <i className="tag" />
          <h2>{playlist.name}</h2>
        </div>

        <div className="creator">
          <img src={getImageSize(creator.avatarUrl, 35)} alt={creator.nickname} />
          <a href={`#/user/home?id=${creator.userId}`}>{creator.nickname}</a>
          <span className="time">
            {new Date(playlist.createTime).toLocaleDateString("zh-CN")} 创建
          </span>
        </div>

        <div className="actions">
          <button
            className="btn btn-play"
            onClick={() => dispatch(playPlaylistAction(playlist.id))}
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

        {playlist.tags && playlist.tags.length > 0 && (
          <div className="tags">
            标签：
            {playlist.tags.map((tag: string) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}

        {desc ? (
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
        ) : (
          <div className="desc">
            <p>介绍：暂无介绍</p>
          </div>
        )}
      </div>
    </PlaylistInfoWrapper>
  )
}

export default memo(PlaylistInfo)
