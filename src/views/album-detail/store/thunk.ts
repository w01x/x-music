import { createAsyncThunk } from "@reduxjs/toolkit"
import { getAlbumDetail } from "../service/album-detail"

export const fetchAlbumDetailAction = createAsyncThunk(
  "albumDetail/detail",
  async (id: number) => {
    const res: any = await getAlbumDetail(id)
    return {
      album: res.album || {},
      songs: res.songs || []
    }
  }
)
