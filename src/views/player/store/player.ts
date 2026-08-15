import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric, getSongUrl } from '../service/player'
import { getSongYrcLyric } from '@/service/song'
import { getAlbumDetail } from '@/views/discover/c-views/album/service/album'
import { getProgramDetail } from '@/views/discover/c-views/djradio/service/djradio'
import { getPlaylistDetail } from '@/views/discover/c-views/songs/service/songs'
import type { IRootState, AppDispatch } from '@/store'
import type { Song } from '@/types/music'
import { ILyric, parseLyric, parseYrcLyric, mergeYrcIntoLyrics, addEstimatedWords } from '@/utils/parse-lyric'
import { loadPlayerState } from '@/utils/player-db'

/** 同时获取 LRC + YRC 歌词，合并后 dispatch */
async function fetchAndDispatchLyrics(id: number, dispatch: AppDispatch) {
  try {
    const [lrcRes, yrcRes] = await Promise.all([
      getSongLyric(id),
      getSongYrcLyric(id).catch(() => null),
    ])
    const lrcString = lrcRes?.lrc?.lyric
    if (lrcString) {
      let lyrics = parseLyric(lrcString)
      const yrcString = yrcRes?.klyric?.lyric
      if (yrcString) {
        lyrics = mergeYrcIntoLyrics(lyrics, parseYrcLyric(yrcString))
      }
      // 无逐字数据时，自动推算（每行时长均分到每个字）
      addEstimatedWords(lyrics)
      dispatch(changeLyricsAction(lyrics))
    }
  } catch { /* ignore */ }
}

interface IThunkState {
  state: IRootState
}

export const fetchCurrentSongAction = createAsyncThunk<
  void,
  number,
  { state: IRootState }
>('currentSong', async (id: number, { dispatch, getState }) => {
  // 立即停止当前播放
  dispatch(changeCurrentSongUrlAction(''))
  const playSongList = getState().player.playSongList
  const findIndex = playSongList.findIndex(item => item.id === id)

  let song: Song
  if (findIndex === -1) {
    const res = await getSongDetail(id)
    if (!res.songs.length) return
    song = res.songs[0]
    const newPlaySongList = [...playSongList, song]
    dispatch(changePlaySongListAction(newPlaySongList))
    dispatch(changePlaySongIndexAction(newPlaySongList.length - 1))
  } else {
    song = playSongList[findIndex]
    dispatch(changePlaySongIndexAction(findIndex))
  }

  dispatch(changeCurrentSongAction(song))

  const [, urlRes] = await Promise.all([
    fetchAndDispatchLyrics(id, dispatch),
    getSongUrl(id)
  ])

  const songUrl = urlRes.data?.[0]?.url
  dispatch(changeCurrentSongUrlAction(songUrl || ''))
})

/** 播放一首歌所需的公共步骤：获取详情+URL → dispatch state → 获取歌词 */
async function loadSong(songId: number, songList: Song[], dispatch: AppDispatch, songOverride?: Song) {
  const [detailRes, urlRes] = await Promise.all([
    getSongDetail(songId),
    getSongUrl(songId)
  ])
  const song = songOverride || detailRes.songs?.[0]
  if (!song) return
  dispatch(changeCurrentSongAction(song))
  dispatch(changePlaySongListAction(songList))
  dispatch(changePlaySongIndexAction(0))
  const songUrl = urlRes.data?.[0]?.url
  dispatch(changeCurrentSongUrlAction(songUrl || ''))
  fetchAndDispatchLyrics(songId, dispatch)
}

export const playAlbumAction = createAsyncThunk<
  void,
  number,
  { state: IRootState }
>('player/playAlbum', async (albumId: number, { dispatch }) => {
  dispatch(changeCurrentSongUrlAction(''))
  const res = await getAlbumDetail(albumId)
  const songs = res.songs || res.album?.songs || []
  if (!songs.length) return
  await loadSong(songs[0].id, songs, dispatch)
})

export const playProgramAction = createAsyncThunk<
  void,
  number,
  { state: IRootState }
>('player/playProgram', async (programId: number, { dispatch }) => {
  dispatch(changeCurrentSongUrlAction(''))
  const res = await getProgramDetail(programId)
  const program = res.program
  const mainSong = program?.mainSong
  if (!mainSong?.id) return
  // 节目歌曲需要合并歌手/封面信息
  const detailRes = await getSongDetail(mainSong.id)
  const rawSong = detailRes.songs?.[0]
  if (!rawSong) return
  const song = {
    ...rawSong,
    name: rawSong.name || mainSong.name || program.name,
    al: rawSong.al || { picUrl: program.coverUrl },
    ar: rawSong.ar || [{ name: program.dj?.nickname || program.radio?.name || '' }],
  }
  await loadSong(mainSong.id, [song], dispatch, song)
})

export const playPlaylistAction = createAsyncThunk<
  void,
  number,
  { state: IRootState }
>('player/playPlaylist', async (playlistId: number, { dispatch }) => {
  dispatch(changeCurrentSongUrlAction(''))
  const res = await getPlaylistDetail(playlistId)
  const tracks = res.playlist?.tracks || []
  if (!tracks.length) return
  await loadSong(tracks[0].id, tracks, dispatch)
})

/** 页面刷新后从 IndexedDB 恢复播放状态 */
export const restorePlayerState = createAsyncThunk<void, void, { state: IRootState }>(
  'player/restore',
  async (_: void, { dispatch }) => {
    const data = await loadPlayerState()
    if (!data.currentSong?.id) return

    // 恢复状态
    if (data.playMode !== undefined) {
      dispatch(changePlayMode(data.playMode))
    }
    if (data.playSongList?.length) {
      dispatch(changePlaySongListAction(data.playSongList))
    }
    if (data.playSongIndex !== undefined && data.playSongIndex >= 0) {
      dispatch(changePlaySongIndexAction(data.playSongIndex))
    }
    if (data.currentSong?.id) {
      dispatch(changeCurrentSongAction(data.currentSong))
      // 重新获取歌曲 URL（旧 URL 已过期）
      try {
        const [, urlRes] = await Promise.all([
          fetchAndDispatchLyrics(data.currentSong.id, dispatch),
          getSongUrl(data.currentSong.id),
        ])
        const songUrl = urlRes?.data?.[0]?.url
        dispatch(changeCurrentSongUrlAction(songUrl || ''))
      } catch { /* 网络失败不影响状态恢复 */ }
    }
    if (data.recentPlays?.length) {
      dispatch(restoreRecentPlays(data.recentPlays))
    }
  }
)

export const fetchChangeMusicAction = createAsyncThunk<void, boolean, IThunkState>(
  'changeMusic',
  async (isNext, { dispatch, getState }) => {
    dispatch(changeCurrentSongUrlAction(''))
    const player = getState().player
    const playMode = player.playMode
    const songIndex = player.playSongIndex
    const songList = player.playSongList

    if (!songList.length) return

    let newIndex = songIndex
    if (playMode === 2) {
      newIndex = songIndex
    } else if (playMode === 1) {
      newIndex = Math.floor(Math.random() * songList.length)
    } else {
      newIndex = isNext ? songIndex + 1 : songIndex - 1
      if (newIndex >= songList.length) newIndex = 0
      if (newIndex < 0) newIndex = songList.length - 1
    }

    const song = songList[newIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(newIndex))

    const [, urlRes] = await Promise.all([
      fetchAndDispatchLyrics(song.id, dispatch),
      getSongUrl(song.id)
    ])

    const songUrl = urlRes.data?.[0]?.url
    if (songUrl) {
      dispatch(changeCurrentSongUrlAction(songUrl))
    } else {
      console.warn('获取播放地址失败，这首歌可能没有版权')
    }
  }
)

interface IPlayerState {
  currentSong: Song | Record<string, never>
  currentSongUrl: string
  lyrics: ILyric[]
  lyricIndex: number
  playSongList: Song[]
  playSongIndex: number
  playMode: number
  recentPlays: Song[]
  isImmersive: boolean
  currentTimeMs: number
}

const RECENT_MAX = 200

const initialState: IPlayerState = {
  currentSong: {},
  currentSongUrl: "",
  lyrics: [],
  lyricIndex: -1,
  playSongList: [],
  playSongIndex: -1,
  playMode: 0,
  recentPlays: [],
  isImmersive: false,
  currentTimeMs: 0,
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, action) {
      state.currentSong = action.payload
      if (action.payload?.id) {
        const song = action.payload
        const existIdx = state.recentPlays.findIndex((s) => s.id === song.id)
        if (existIdx >= 0) {
          state.recentPlays.splice(existIdx, 1)
        }
        state.recentPlays.unshift({
          id: song.id,
          name: song.name,
          dt: song.dt,
          ar: song.ar,
          al: song.al,
        })
        if (state.recentPlays.length > RECENT_MAX) {
          state.recentPlays = state.recentPlays.slice(0, RECENT_MAX)
        }
      }
    },
    changeCurrentSongUrlAction(state, action) {
      state.currentSongUrl = action.payload
    },
    changeLyricsAction(state, action) {
      state.lyrics = action.payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    },
    changePlaySongIndexAction(state, action) {
      state.playSongIndex = action.payload
    },
    changePlaySongListAction(state, action) {
      state.playSongList = action.payload
    },
    changePlayMode(state, action) {
      state.playMode = action.payload
    },
    restoreRecentPlays(state, action) {
      state.recentPlays = action.payload
    },
    toggleImmersive(state) {
      state.isImmersive = !state.isImmersive
    },
    closeImmersive(state) {
      state.isImmersive = false
    },
    setCurrentTimeMs(state, { payload }) {
      state.currentTimeMs = payload
    },
  }
})

export const {
  changeCurrentSongAction,
  changeCurrentSongUrlAction,
  changeLyricsAction,
  changePlaySongIndexAction,
  changeLyricIndexAction,
  changePlaySongListAction,
  changePlayMode,
  restoreRecentPlays,
  toggleImmersive,
  closeImmersive,
  setCurrentTimeMs,
} = playerSlice.actions

export default playerSlice.reducer
