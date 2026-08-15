import { configureStore } from "@reduxjs/toolkit"
import recommendReducer from "@/views/discover/c-views/recommend/store/recommend"
import playerReducer from "@/views/player/store/player"
import rankingReducer from"@/views/discover/c-views/ranking/store/ranking"
import loginUserReducer from "@/views/login/store/userSlice"
import djradioReducer from '@/views/discover/c-views/djradio/store'
import artistReducer from "@/views/discover/c-views/artist/store"
import artistDetailReducer from "@/views/artist-detail/store"
import albumDetailReducer from "@/views/album-detail/store"
import playlistDetailReducer from "@/views/playlist-detail/store"
import { savePlayerState } from "@/utils/player-db"
import {
  useDispatch,
  shallowEqual,
  useSelector,
  TypedUseSelectorHook,
} from "react-redux"

const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    player: playerReducer,
    ranking:rankingReducer,
    loginUser: loginUserReducer,
    djradio: djradioReducer,
    artist:artistReducer,
    artistDetail:artistDetailReducer,
    albumDetail:albumDetailReducer,
    playlistDetail:playlistDetailReducer,
  },
})

// 播放状态变化时自动持久化到 IndexedDB（防抖 1 秒）
let persistTimer: ReturnType<typeof setTimeout> | null = null
store.subscribe(() => {
  if (persistTimer) return
  persistTimer = setTimeout(() => {
    persistTimer = null
    const { player } = store.getState()
    if (player.currentSong?.id) {
      savePlayerState({
        currentSong: player.currentSong,
        playSongList: player.playSongList,
        playSongIndex: player.playSongIndex,
        playMode: player.playMode,
        recentPlays: player.recentPlays,
      })
    }
  }, 1000)
})

type GetStateFnType = typeof store.getState
export type IRootState = ReturnType<GetStateFnType>
type DispatchType = typeof store.dispatch
export type AppDispatch = DispatchType

export const useAppSelector: TypedUseSelectorHook<IRootState> =
  useSelector

export const useAppDispatch: () => DispatchType = useDispatch
export const shallowEqualApp = shallowEqual

export default store
