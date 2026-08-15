export interface IArtist {
  id: number
  name: string
}

export interface IAlbum {
  picUrl: string
}

export interface ITrack {
  id: number
  name: string
  dt: number

  al: IAlbum

  ar: IArtist[]
}

export interface IPlayList {
  id: number
  name: string

  coverImgUrl: string

  updateFrequency: string

  tracks: ITrack[]
}
export interface ITopListItem {
  id: number

  name: string

  coverImgUrl: string

  updateFrequency: string

  ToplistType?: string
}
