import { useCallback, useState } from "react"
import { useAppSelector } from "@/store"
import { getAlbumDetail } from "@/views/album/service"
import { createPlaylist, addToPlaylist } from "@/views/mine/service/playlist"

interface SongItem {
  id: number
  name: string
}

interface CollectModalState {
  open: boolean
  albumId: number
  playlistName: string
  songs: SongItem[]
  loading: boolean
  status: "" | "login" | "fetchError" | "createError" | "success"
}

const initialState: CollectModalState = {
  open: false,
  albumId: 0,
  playlistName: "",
  songs: [],
  loading: false,
  status: "",
}

interface UseCreatePlaylistOptions {
  onSuccess?: () => void
}

export function useCreatePlaylist(options?: UseCreatePlaylistOptions) {
  const [collectModal, setCollectModal] = useState<CollectModalState>(initialState)

  const { cookie } = useAppSelector((state) => ({
    cookie: state.loginUser.cookie,
  }))

  const openModal = useCallback(async (
    albumId?: number,
    albumName?: string,
    preloadedSongs?: SongItem[]
  ) => {
    if (!cookie) {
      setCollectModal((prev) => ({ ...prev, open: false, status: "login" }))
      setTimeout(() => setCollectModal((prev) => ({ ...prev, status: "" })), 2500)
      return
    }

    // 有预加载歌曲时直接使用，不走 API
    if (preloadedSongs && preloadedSongs.length > 0 && albumName != null) {
      setCollectModal({
        open: true,
        albumId: albumId ?? 0,
        playlistName: albumName,
        songs: preloadedSongs,
        loading: false,
        status: "",
      })
      return
    }

    if (albumId != null && albumName != null) {
      setCollectModal({
        open: true,
        albumId,
        playlistName: albumName,
        songs: [],
        loading: true,
        status: "",
      })
      try {
        const res: any = await getAlbumDetail(albumId)
        const songsData = res.songs?.length ? res.songs : (res.album?.songs || [])
        const songs: SongItem[] = songsData.map((s: any) => ({
          id: s.id,
          name: s.name,
        }))
        setCollectModal((prev) => ({ ...prev, songs, loading: false }))
      } catch {
        setCollectModal((prev) => ({ ...prev, open: false, status: "fetchError" }))
        setTimeout(() => setCollectModal((prev) => ({ ...prev, status: "" })), 3000)
      }
    } else {
      setCollectModal({
        open: true,
        albumId: 0,
        playlistName: "",
        songs: [],
        loading: false,
        status: "",
      })
    }
  }, [cookie])

  const closeCollectModal = useCallback(() => {
    setCollectModal((prev) => ({ ...prev, open: false }))
  }, [])

  const setPlaylistName = useCallback((name: string) => {
    setCollectModal((prev) => ({ ...prev, playlistName: name }))
  }, [])

  const confirmCreatePlaylist = useCallback(async () => {
    if (!cookie) return
    const { playlistName, songs } = collectModal
    if (!playlistName.trim()) return
    setCollectModal((prev) => ({ ...prev, loading: true }))
    try {
      const createRes: any = await createPlaylist(playlistName.trim(), cookie)
      const pid = createRes.id || createRes.body?.id
      if (!pid) throw new Error("创建歌单失败")
      if (songs.length > 0) {
        await addToPlaylist(pid, songs.map((s) => s.id), cookie)
      }
      setCollectModal((prev) => ({ ...prev, loading: false, status: "success" }))
      setTimeout(() => setCollectModal(initialState), 1500)
      options?.onSuccess?.()
    } catch {
      setCollectModal((prev) => ({ ...prev, loading: false, status: "createError" }))
    }
  }, [collectModal, cookie, options])

  return {
    collectModal,
    openModal,
    closeCollectModal,
    setPlaylistName,
    confirmCreatePlaylist,
  }
}
