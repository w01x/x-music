
import { memo, useState } from "react";
import { ReactNode, FC } from "react";
import { RankingItemWrapper } from "./style";
import { toast } from '@/utils/toast'
import { getImageSize } from "@/utils/format";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCurrentSongAction } from '@/views/player/store/player'
import { subscribePlaylist } from "@/views/mine/service/playlist"
import SelectPlaylistModal from "@/components/select-playlist-modal"
interface IProps {
  children?: ReactNode,
  itemData: any
}
const TopRankingItem: FC<IProps> = (props) => {
const dispatch = useAppDispatch()
const { cookie, userId } = useAppSelector((state) => ({
  cookie: state.loginUser.cookie,
  userId: state.loginUser.profile?.userId,
}))
const [errorMsg, setErrorMsg] = useState("")
const [favoring, setFavoring] = useState(false)
const [addModal, setAddModal] = useState({ visible: false, songId: 0 })

function handlePlayClick(id: number) {
  dispatch(fetchCurrentSongAction(id))
}

function handleAddTo(songId: number) {
  if (!cookie) {
    setErrorMsg("请先登录")
    return
  }
  setErrorMsg("")
  setAddModal({ visible: true, songId })
}

async function handleFavorClick(id: number) {
  if (!cookie) {
    setErrorMsg("请先登录")
    return
  }
  setErrorMsg("")
  setFavoring(true)
  try {
    await subscribePlaylist(1, id, cookie)
    toast.success('收藏成功')
  } catch (e: any) {
    setErrorMsg(e?.message || e?.msg || "收藏失败")
  } finally {
    setFavoring(false)
  }
}

const { itemData } = props
const {tracks=[]}=itemData
  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getImageSize(itemData.coverImgUrl, 80)} alt="" />
          <a href="" className=""></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <div className="btns">
            <button className="btn play" onClick={() => {
              if (tracks.length > 0) {
                handlePlayClick(tracks[0].id)
              }
            }}></button>
            <button className="btn favor" onClick={() => handleFavorClick(itemData.id)} disabled={favoring}></button>
          </div>
        </div>
      </div>
      {errorMsg && <div className="error-msg">{errorMsg}</div>}
      <div className="list">
        {tracks.slice(0,10).map((item: any, index: number) => {
            return (
              <div className="item" key={index}>
                <div className="index">{index + 1}</div>
<div className="info">
                  <div className="name"><a href={`#/discover/song/${item.id}`}>{item.name}</a></div>
                  <div className="operator">
                  <button className="btn play"
                  onClick={()=>handlePlayClick(item.id)}></button>
                  <button className="btn addto" onClick={() => handleAddTo(item.id)}>+</button>

                </div>
</div>
              </div>
            )
          })
        }
      </div>
      <div className="footer">
        <a href="#discover/ranking">查看全部 &gt;</a>
      </div>
      <SelectPlaylistModal
        songId={addModal.songId}
        userId={userId ?? 0}
        cookie={cookie ?? ""}
        visible={addModal.visible}
        onClose={() => setAddModal({ visible: false, songId: 0 })}
      />
    </RankingItemWrapper>
  )
}

export default memo(TopRankingItem)
