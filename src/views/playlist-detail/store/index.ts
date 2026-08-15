import { createSlice } from "@reduxjs/toolkit"
import type { Song, Playlist } from "@/types/music"
import { fetchPlaylistDetailAction, fetchRelatedPlaylistAction } from "./thunk"

interface IState {
  playlist: Playlist | null
  songs: Song[]
  related: Playlist[]
  loading: boolean
}

const initialState: IState = {
  playlist: null,
  songs: [],
  related: [],
  loading: false
}

const playlistDetailSlice = createSlice({
  name: "playlistDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylistDetailAction.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPlaylistDetailAction.fulfilled, (state, { payload }) => {
        state.playlist = payload.playlist
        state.songs = payload.songs
        state.loading = false
      })
      .addCase(fetchPlaylistDetailAction.rejected, (state) => {
        state.loading = false
      })
      .addCase(fetchRelatedPlaylistAction.fulfilled, (state, { payload }) => {
        state.related = payload
      })
  }
})

export default playlistDetailSlice.reducer
