import { createAsyncThunk } from "@reduxjs/toolkit"
import { getPlaylistDetail, getRelatedPlaylist } from "../service/playlist-detail"

export const fetchPlaylistDetailAction = createAsyncThunk(
  "playlistDetail/detail",
  async (id: number, { getState }) => {
    const state = getState() as any
    const cookie = state.loginUser?.cookie
    const res: any = await getPlaylistDetail(id, cookie || undefined)
    return {
      playlist: res.playlist || {},
      songs: res.playlist?.tracks || []
    }
  }
)

export const fetchRelatedPlaylistAction = createAsyncThunk(
  "playlistDetail/related",
  async (id: number) => {
    const res: any = await getRelatedPlaylist(id)
    return res.playlists || []
  }
)
