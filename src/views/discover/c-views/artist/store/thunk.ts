import {
  createAsyncThunk
} from "@reduxjs/toolkit"

import {
  getArtistList
} from "../service/artist"

interface IArtistParams {

  type?: number

  area?: number

  initial?: string | number

  limit?: number

  offset?: number
}

export const
fetchArtistListAction =
createAsyncThunk(

  "artist/list",

  async (
    params: IArtistParams
  ) => {

    const {

      type = -1,

      area = -1,

      initial = -1,

      limit = 30,

      offset = 0

    } = params

    const res: any =

      await getArtistList(

        type,

        area,

        initial,

        limit,

        offset
      )

    return res.artists || []
  }
)
