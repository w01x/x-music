
import { memo, useState } from "react"
import type { FC } from "react"
import { Link } from "react-router-dom"
import { CirclePlus } from "lucide-react"

import {
  SongItemWrapper
} from "./style"

import {
  useAppDispatch,
  useAppSelector
} from "@/store"

import {
  fetchCurrentSongAction
} from "@/views/player/store/player"

import { formatTime } from "@/utils/format"
import { toast } from "@/utils/toast"
import SelectPlaylistModal from "@/components/select-playlist-modal"

import type {
  ITrack
} from "../../types"

interface IProps {
  item: ITrack
  index: number
  currentSongId: number
}

const RankingSongItem: FC<IProps> = ({
  item,
  index,
  currentSongId
}) => {

  const dispatch = useAppDispatch()
  const { cookie, userId } = useAppSelector((s) => ({
    cookie: s.loginUser.cookie,
    userId: s.loginUser.profile?.userId,
  }))
  const [showAddModal, setShowAddModal] = useState(false)

  const isActive = currentSongId === item.id

  function handleFavor(e: React.MouseEvent) {
    e.stopPropagation()
    if (!cookie) { toast.warning('请先登录'); return }
    setShowAddModal(true)
  }

  return (
    <>
    <SongItemWrapper
      className={
        isActive
          ? "active"
          : ""
      }

      onClick={() =>
        dispatch(
          fetchCurrentSongAction(
            item.id
          )
        )
      }
    >

      <div className="rank">
        {index + 1}
      </div>

      <div className="title">

        {
          index < 3 && (
            <img
              src={item.al?.picUrl}
              alt=""
            />
          )
        }

        <span>
          {item.name}
        </span>

        <div className="operator">
          <button className="btn-add" onClick={handleFavor} title="添加到歌单">
            <CirclePlus size={18} />
          </button>
        </div>

      </div>

      <div className="duration">
        {formatTime(item.dt)}
      </div>

      <div className="singer">
        {item.ar?.[0]?.id ? (
          <Link to={`/discover/artist/${item.ar[0].id}`} onClick={e => e.stopPropagation()}>
            {item.ar[0].name}
          </Link>
        ) : (
          item.ar?.[0]?.name
        )}
      </div>

    </SongItemWrapper>
      <SelectPlaylistModal
        songId={item.id}
        userId={userId || 0}
        cookie={cookie || ''}
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </>
  )
}

export default memo(RankingSongItem)
