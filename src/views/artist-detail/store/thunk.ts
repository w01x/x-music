import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  getArtistDetail,
  getArtistAlbum,
  getArtistDesc,
  getArtistInfo
} from "../service/artist-detail"

/* 热门歌曲 */
export const fetchArtistDetailAction = createAsyncThunk(
  "artistDetail/detail",
  async (id: number) => {
    const res: any = await getArtistDetail(id)
    return {
      artist: res.artist || {},
      hotSongs: res.hotSongs || []
    }
  }
)

/* 专辑 */
export const fetchArtistAlbumAction = createAsyncThunk(
  "artistDetail/album",
  async (id: number) => {
    const res: any = await getArtistAlbum(id, 30, 0)
    return res.hotAlbums || []
  }
)

/* 歌手简介 */
export const fetchArtistDescAction = createAsyncThunk(
  "artistDetail/desc",
  async (id: number) => {
    const res: any = await getArtistDesc(id)
    return res || {}
  }
)

/* 歌手额外信息 */
export const fetchArtistInfoAction = createAsyncThunk(
  "artistDetail/info",
  async (id: number) => {
    const res: any = await getArtistInfo(id)
    return res.data || {}
  }
)
