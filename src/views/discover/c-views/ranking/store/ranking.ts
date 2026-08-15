import { createSlice } from "@reduxjs/toolkit"
import {
  fetchTopListDetailAction,
  fetchPlayListDetailAction
} from "./asyncThunk"
import type {
  IPlayList
} from "../types"
interface IRankingState {
  topList: any[]
  currentIndex: number
  currentPlayList: any
  isListLoading: boolean
}

const initialState: IRankingState = {
  topList: [],
  currentIndex: 0,
  currentPlayList:
  {} as IPlayList,
  isListLoading: false
}

const rankingSlice = createSlice({
  name: "ranking",

  initialState,

  reducers: {
    changeCurrentIndexAction(state, { payload }) {
      state.currentIndex = payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchTopListDetailAction.fulfilled,
      (state, { payload }) => {
        state.topList = payload
      }
    )

    builder.addCase(
      fetchPlayListDetailAction.pending,
      (state) => {
        state.isListLoading = true
      }
    )

    builder.addCase(
      fetchPlayListDetailAction.fulfilled,
      (state, { payload }) => {
        state.currentPlayList = payload
        state.isListLoading = false
      }
    )

    builder.addCase(
      fetchPlayListDetailAction.rejected,
      (state) => {
        state.isListLoading = false
      }
    )
  }
})

export const {
  changeCurrentIndexAction
} = rankingSlice.actions

export default rankingSlice.reducer
