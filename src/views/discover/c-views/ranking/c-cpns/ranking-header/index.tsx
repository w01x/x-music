
import { memo, useState, useEffect } from "react"
import type { FC, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import {
  shallowEqualApp,
  useAppSelector,
  useAppDispatch
} from "@/store"

import {
  HeaderWrapper
} from "./style"
import { subscribePlaylist } from "../../service/ranking"
import { cleanName } from "@/utils/format"
import { playPlaylistAction } from "@/views/player/store/player"
import { toast } from "@/utils/toast"

interface IProps {
  children?: ReactNode
}

const RankingHeader: FC<IProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    currentPlayList,
    topList,
    currentIndex
  } = useAppSelector(
    (state) => ({
      currentPlayList:
        state.ranking.currentPlayList,
      topList: state.ranking.topList,
      currentIndex:
        state.ranking.currentIndex
    }),
    shallowEqualApp

  )

  const { cookie } = useAppSelector((state) => ({
    cookie: state.loginUser.cookie,
  }))

  const [subscribed, setSubscribed] = useState(false)
  const [subscribing, setSubscribing] = useState(false)

  useEffect(() => {
    setSubscribed(currentPlayList.subscribed || false)
  }, [currentPlayList.id])

  async function handleCollect() {
    if (!cookie) { toast.warning('请先登录'); return }
    if (!currentPlayList.id || subscribing) return
    setSubscribing(true)
    const t = subscribed ? 0 : 1
    try {
      const res: any = await subscribePlaylist(currentPlayList.id, t, cookie)
      if (res.code === 200) {
        setSubscribed(!subscribed)
        toast.success(t ? '已收藏' : '已取消收藏')
      } else if (res.code === 301 || res.code === 502) {
        toast.warning('请先登录')
      } else {
        toast.error(res.message || res.msg || `操作失败 (${res.code || '未知'})`)
      }
    } catch {
      toast.error("操作失败，请稍后重试")
    } finally {
      setSubscribing(false)
    }
  }

  const updateFrequency =
    topList[currentIndex]
      ?.updateFrequency
  return (
    <HeaderWrapper>

      <div
        className="image"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate(`/discover/playlist/${currentPlayList.id}`)
          window.scrollTo(0, 0)
        }}
      >
        <img
          src={currentPlayList.coverImgUrl}
          alt=""
        />
      </div>

      <div className="info">

        <div className="title">
          {cleanName(currentPlayList.name)}
        </div>

        <div className="update">
          最近更新：{updateFrequency || '每日更新'}
        </div>

        <div className="buttons">

          <button
            className="play"
            onClick={() => {
              dispatch(playPlaylistAction(currentPlayList.id))
            }}
          >
            播放
          </button>

          <button
            className="collect"
            onClick={handleCollect}
            disabled={subscribing}
          >
            {subscribing ? "..." : subscribed ? "取消收藏" : "收藏"}
          </button>

        </div>

      </div>

    </HeaderWrapper>
  )
}

export default memo(RankingHeader)
