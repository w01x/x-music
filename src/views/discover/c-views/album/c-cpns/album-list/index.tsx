
import React, { memo } from "react"
import { Link } from "react-router-dom"
import { Plus, Play } from "lucide-react"
import {
  AlbumListWrapper,
  CardWrapper,
  CoverSection,
  PlayOverlay,
  PlayCircle,
  InfoSection,
  NameRow,
  AlbumName,
  ArtistName,
  CollectBtn
} from "./style"
import { useAppDispatch } from "@/store"
import { playAlbumAction } from "@/views/player/store/player"
import { useCreatePlaylist } from "@/hooks/useCreatePlaylist"
import ToastMessage from "@/components/toast-message"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel
} from "@/components/ui/alert-dialog"

interface IProps {
  playlists?: any[]
}

const AlbumList: React.FC<IProps> = (props) => {
  const { playlists = [] } = props
  const dispatch = useAppDispatch()
  const {
    collectModal,
    openModal,
    closeCollectModal,
    setPlaylistName,
    confirmCreatePlaylist
  } = useCreatePlaylist()

  function handlePlayClick(e: React.MouseEvent, item: any) {
    e.stopPropagation()
    e.preventDefault()
    dispatch(playAlbumAction(item.id))
  }

  function handleCollectClick(e: React.MouseEvent, item: any) {
    e.stopPropagation()
    e.preventDefault()
    openModal(item.id, item.name)
  }

  return (
    <>
      <AlbumListWrapper>
        {playlists.map((item) => {
          const coverUrl = item.picUrl?.startsWith("http")
            ? item.picUrl
            : `https:${item.picUrl}`

          return (
            <CardWrapper key={item.id}>
              <Link to={`/discover/album/${item.id}`}>
                <CoverSection className="card-cover">
                  <img src={coverUrl} alt="" loading="lazy" />
                  <PlayOverlay className="play-overlay">
                    <PlayCircle
                      className="play-circle"
                      onClick={(e) => handlePlayClick(e, item)}
                    >
                      <Play />
                    </PlayCircle>
                  </PlayOverlay>
                </CoverSection>
              </Link>

              <InfoSection>
                <NameRow>
                  <AlbumName>{item.name}</AlbumName>
                  <CollectBtn
                    onClick={(e) => handleCollectClick(e, item)}
                    title="收藏到歌单"
                  >
                    <Plus />
                  </CollectBtn>
                </NameRow>
                <ArtistName>
                  {item.artists?.map((a: any) => a.name).join(" / ") ||
                    item.artist?.name ||
                    ""}
                </ArtistName>
              </InfoSection>
            </CardWrapper>
          )
        })}
      </AlbumListWrapper>

      <AlertDialog
        open={collectModal.open}
        onOpenChange={(open) => {
          if (!open) closeCollectModal()
        }}
      >
        <AlertDialogContent size="default">
          <AlertDialogHeader>
            <AlertDialogTitle>创建歌单</AlertDialogTitle>
            <AlertDialogDescription>
              {collectModal.songs.length > 0
                ? `将添加 ${collectModal.songs.length} 首歌曲到此歌单`
                : "输入歌单名称来创建新歌单"}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <input
            type="text"
            value={collectModal.playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="请输入歌单名称"
            maxLength={50}
            className="w-full h-10 px-3 rounded-lg bg-[#2a2a2a] border border-white/10 text-white text-sm placeholder:text-white/25 outline-none focus:border-white/30 transition-colors"
          />

          {collectModal.status === "fetchError" && (
            <Alert variant="destructive">
              <AlertDescription>获取歌曲失败，请稍后重试</AlertDescription>
            </Alert>
          )}
          {collectModal.status === "createError" && (
            <Alert variant="destructive">
              <AlertDescription>创建失败，请稍后重试</AlertDescription>
            </Alert>
          )}
          {collectModal.status === "success" && (
            <Alert variant="default" className="!border-green-500/30 !bg-green-500/10">
              <AlertDescription className="!text-green-400">
                已成功添加到歌单「{collectModal.playlistName}」
              </AlertDescription>
            </Alert>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeCollectModal}>
              取消
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                confirmCreatePlaylist()
              }}
              disabled={
                !collectModal.playlistName.trim() || collectModal.loading
              }
              className="!bg-[#FF4D4F] hover:!bg-[#ff7875]"
            >
              {collectModal.loading ? "创建中..." : "创建"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {collectModal.status === "login" && (
        <ToastMessage msg="请先登录后再收藏" onDone={() => closeCollectModal()} />
      )}
    </>
  )
}

export default memo(AlbumList)
