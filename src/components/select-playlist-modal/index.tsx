import MusicLoader from '@/components/music-loader'

import { memo, useEffect, useState } from "react"
import type { FC } from "react"
import { Overlay, Box, Title, List, Item, Tip, CloseBtn } from "./style"
import { getUserPlaylist, addToPlaylist, type PlaylistItem } from "@/views/mine/service/playlist"
import { toast } from "@/utils/toast"

interface IProps {
  songId: number
  userId: number
  cookie: string
  visible: boolean
  onClose: () => void
}

const SelectPlaylistModal: FC<IProps> = ({ songId, userId, cookie, visible, onClose }) => {
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([])
  const [loading, setLoading] = useState(false)
  const [adding, setAdding] = useState<number | null>(null)
  const [msg, setMsg] = useState("")

  useEffect(() => {
    if (!visible) return
    if (!cookie) { toast.warning('请先登录'); onClose(); return }
    setLoading(true)
    setMsg("")
    getUserPlaylist(userId, cookie, 50)
      .then((data) => {
        const own = data.filter((item) => item.creator?.userId === userId)
        setPlaylists(own)
      })
      .catch(() => setMsg("获取歌单失败"))
      .finally(() => setLoading(false))
  }, [visible, cookie, userId])

  const handleSelect = async (item: PlaylistItem) => {
    setAdding(item.id)
    setMsg("")
    try {
      await addToPlaylist(item.id, [songId], cookie)
      setMsg("添加成功")
      setAdding(null)
      setTimeout(() => onClose(), 1000)
    } catch (e: any) {
      setMsg(e?.message || "添加失败")
      setAdding(null)
      setTimeout(() => onClose(), 1000)
    }
  }

  if (!visible) return null

  return (
    <Overlay onClick={onClose}>
      <Box onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <Title>选择歌单</Title>
        <CloseBtn onClick={onClose}>&times;</CloseBtn>

        {loading && <Tip><MusicLoader /></Tip>}

        {!loading && playlists.length === 0 && !msg && (
          <Tip>暂无歌单</Tip>
        )}

        {!loading && !msg && playlists.length > 0 && (
          <List>
            {playlists.map((item) => (
              <Item
                key={item.id}
                onClick={() => adding == null && handleSelect(item)}
                style={{ opacity: adding != null && adding !== item.id ? 0.4 : 1 }}
              >
                <img src={item.coverImgUrl} alt={item.name} />
                <div className="info">
                  <div className="name">{item.name}</div>
                  <div className="count">{item.trackCount}首</div>
                </div>
              </Item>
            ))}
          </List>
        )}

        {msg && <Tip style={{ color: msg.startsWith("已") ? "#6bc96b" : "#ec4141" }}>{msg}</Tip>}
      </Box>
    </Overlay>
  )
}

export default memo(SelectPlaylistModal)
