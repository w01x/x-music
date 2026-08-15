import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getArtistList, getBanners, getHotRecommend, getNewAlbum ,getPlayListDetail} from "../service/recommend";
export const fetchRecommendDataAction=createAsyncThunk(
  'fetchdata',
  (_, { dispatch }) => {
    getBanners().then(res => {
      dispatch(changeBannersAction(res.banners))
    })
    getHotRecommend().then(res => {
      dispatch(changeHotRecommendAction(res.result.slice(0, 8)))
    })
    getNewAlbum().then(res => {
      dispatch(changeNewAlbumsAction(res.albums))
    })
    getArtistList(10).then(res => {
      dispatch(changeSettleSingersAction(res.artists.slice(0, 10)))
  })
}
)
const rankingIds=[19723756,3779629,2884035]
export const fetchRankingListDataAction=createAsyncThunk(
  'rankingData',
  (_, { dispatch }) => {
  const promises: Promise<any>[] = []
  for (const id of rankingIds) {
   promises.push(getPlayListDetail(id))}
    Promise.all(promises).then(res => {
    const playLists = res.filter(item => item.playlist)
    .map(item => item.playlist)
    dispatch(changeRankingListAction(playLists))
    })
 }
)
interface IRecommendState{
  banners:any[],
  hotRecommends:any[],
  newAlbums:any[],
  Ranking:any[]
  settleSingers:any[]
  loading: boolean
}
const initialState:IRecommendState={
  banners:[],
  hotRecommends:[],
  newAlbums:[],
  Ranking:[],
  settleSingers:[],
  loading: true
}
const recommendSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendAction(state,{payload}){
      state.hotRecommends=payload
      state.loading = false
    },
    changeNewAlbumsAction(state,{payload}){
      state.newAlbums=payload
    },
    changeRankingListAction(state,{payload}){
      state.Ranking=payload
      state.loading = false
    },
    changeSettleSingersAction(state,{payload}){
      state.settleSingers=payload
    }
  },
})
export const {
  changeRankingListAction,
   changeBannersAction,
   changeHotRecommendAction,
   changeNewAlbumsAction,
   changeSettleSingersAction

} = recommendSlice.actions
export default recommendSlice.reducer
