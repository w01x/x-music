import { createAsyncThunk }
from "@reduxjs/toolkit"

import {

  getTopListDetail,

  getPlayListDetail,

  getPlayListAllTracks

} from "../service/ranking"



// 榜单列表
export const fetchTopListDetailAction =
  createAsyncThunk(

    "ranking/topList",

    async () => {

      const res: any =
        await getTopListDetail()

      return res.list || []
    }
  )



// 榜单详情
export const fetchPlayListDetailAction =
  createAsyncThunk(

    "ranking/playListDetail",

    async (id: number, { getState }) => {

      const state = getState() as any
      const cookie = state.loginUser?.cookie

      // ① 榜单信息
      const detailRes: any =
        await getPlayListDetail(id, cookie || undefined)

      // ② 完整歌曲
      const songRes: any =
        await getPlayListAllTracks(id)

      return {

        ...detailRes.playlist,

        tracks:
          songRes.songs || []
      }
    }
  )
