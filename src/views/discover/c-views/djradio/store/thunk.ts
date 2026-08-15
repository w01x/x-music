import {
  createAsyncThunk
} from "@reduxjs/toolkit"

import {
  getRecommendProgram,
  getProgramToplist
} from "../service/djradio"

export const
fetchRecommendProgramAction =
createAsyncThunk<
  any,
  number
>(

  "djradio/program",

  async (
    limit = 10
  ) => {

    const res: any =

      await getRecommendProgram(
        limit,
        0
      )

    return res.programs || []
  }
)

export const
fetchProgramToplistAction =
createAsyncThunk<

  any,
  number

>(

  "djradio/programToplist",

  async (
    limit = 100
  ) => {

    const res: any =

      await getProgramToplist(
        limit,
        0
      )

    return res.toplist || []
  }
)
