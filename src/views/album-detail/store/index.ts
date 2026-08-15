import { createSlice } from "@reduxjs/toolkit"
import type { Song, Album } from "@/types/music"
import { fetchAlbumDetailAction } from "./thunk"

interface IState {
  album: Album | null
  songs: Song[]
  loading: boolean
}

const initialState: IState = {
  album: null,
  songs: [],
  loading: false
}

const albumDetailSlice = createSlice({
  name: "albumDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumDetailAction.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAlbumDetailAction.fulfilled, (state, { payload }) => {
        state.album = payload.album
        state.songs = payload.songs
        state.loading = false
      })
      .addCase(fetchAlbumDetailAction.rejected, (state) => {
        state.loading = false
      })
  }
})

export default albumDetailSlice.reducer
