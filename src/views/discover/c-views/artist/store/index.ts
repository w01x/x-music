import { createSlice } from '@reduxjs/toolkit'

import { fetchArtistListAction } from './thunk'

interface IState {
  artistList: any[]

  loading: boolean

  currentArea: number

  currentType: number
}

const initialState: IState = {
  artistList: [],

  loading: false,

  currentArea: -1,

  currentType: -1,
}

const artistSlice = createSlice({
  name: 'artist',

  initialState,

  reducers: {},

  extraReducers: builder => {
    builder

      .addCase(
        fetchArtistListAction.pending,

        state => {
          state.loading = true
        }
      )

      .addCase(
        fetchArtistListAction.fulfilled,

        (state, { payload, meta }) => {
          state.artistList = payload

          state.loading = false

          state.currentArea = meta.arg.area ?? -1

          state.currentType = meta.arg.type ?? -1
        }
      )

      .addCase(
        fetchArtistListAction.rejected,

        state => {
          state.loading = false
        }
      )
  },
})

export default artistSlice.reducer
