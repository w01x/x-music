import { createSlice } from "@reduxjs/toolkit"

interface ISongsState {

}

const initialState: ISongsState = {

}

const songsSlice = createSlice({
  name: "songs",

  initialState,

  reducers: {

  }
})

export const {

} = songsSlice.actions

export default songsSlice.reducer
