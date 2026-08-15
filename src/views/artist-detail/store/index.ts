import { createSlice } from "@reduxjs/toolkit"
import type { Song, Album } from "@/types/music"
import {
  fetchArtistDetailAction,
  fetchArtistAlbumAction,
  fetchArtistDescAction,
  fetchArtistInfoAction
} from "./thunk"

interface IState {
  artist: Record<string, unknown> | null
  hotSongs: Song[]
  albums: Album[]
  desc: Record<string, unknown> | null
  artistInfo: Record<string, unknown> | null
  loading: boolean
  albumsLoading: boolean
}

const initialState: IState = {
  artist: null,
  hotSongs: [],
  albums: [],
  desc: null,
  artistInfo: null,
  loading: false,
  albumsLoading: false
}

const artistDetailSlice = createSlice({
  name: "artistDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* detail */
      .addCase(fetchArtistDetailAction.pending, (state) => {
        state.loading = true
        state.albumsLoading = true
      })
      .addCase(fetchArtistDetailAction.fulfilled, (state, { payload }) => {
        state.artist = payload.artist
        state.hotSongs = payload.hotSongs
        state.loading = false
      })
      .addCase(fetchArtistDetailAction.rejected, (state) => {
        state.loading = false
        state.albumsLoading = false
      })
      /* album */
      .addCase(fetchArtistAlbumAction.fulfilled, (state, { payload }) => {
        state.albums = payload
        state.albumsLoading = false
      })
      .addCase(fetchArtistAlbumAction.rejected, (state) => {
        state.albumsLoading = false
      })
      /* desc */
      .addCase(fetchArtistDescAction.fulfilled, (state, { payload }) => {
        state.desc = payload
      })
      /* info */
      .addCase(fetchArtistInfoAction.fulfilled, (state, { payload }) => {
        state.artistInfo = payload
      })
  }
})

export default artistDetailSlice.reducer
