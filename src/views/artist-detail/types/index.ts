export interface IArtist {
  id: number
  name: string
  alias: string[]
  briefDesc: string
  picUrl: string
  albumSize: number
  musicSize: number
  mvSize: number
  followed: boolean
}

export interface IHotSong {
  id: number
  name: string
  dt: number
  ar: { id: number; name: string }[]
  al: { id: number; name: string; picUrl: string }
}

export interface IAlbum {
  id: number
  name: string
  picUrl: string
  publishTime: number
  size: number
  company: string
}
