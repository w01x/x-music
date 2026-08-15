import {
  createSlice
} from "@reduxjs/toolkit"

import {
  fetchRecommendProgramAction,
  fetchProgramToplistAction
} from "./thunk"

interface IState {

  programs: any[]

  programToplist: any[]

  loading: boolean
}

const initialState: IState = {

  programs: [],

  programToplist: [],

  loading: false
}

const djradioSlice =
  createSlice({

    name: "djradio",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

      builder

        // 推荐节目
        .addCase(
          fetchRecommendProgramAction.pending,

          (state) => {

            state.loading = true
          }
        )

        .addCase(
          fetchRecommendProgramAction.fulfilled,

          (state, { payload }) => {

            state.programs = payload

            state.loading = false
          }
        )

        .addCase(
          fetchRecommendProgramAction.rejected,

          (state) => {

            state.loading = false
          }
        )

        // 节目排行榜
        .addCase(
          fetchProgramToplistAction.pending,

          (state) => {

            state.loading = true
          }
        )

        .addCase(
          fetchProgramToplistAction.fulfilled,

          (state, { payload }) => {

            state.programToplist =
              payload

            state.loading = false
          }
        )

        .addCase(
          fetchProgramToplistAction.rejected,

          (state) => {

            state.loading = false
          }
        )
    }
  })

export default
  djradioSlice.reducer
