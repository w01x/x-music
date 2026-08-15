/** 歌手 */
export interface Artist {
  id?: number
  name: string
  [key: string]: unknown
}

/** 专辑 */
export interface Album {
  id?: number
  name?: string
  picUrl?: string
  [key: string]: unknown
}

/** 歌曲 */
export interface Song {
  id: number
  name: string
  dt: number
  ar: Artist[]
  al: Album
  [key: string]: unknown
}

/** 歌单 */
export interface Playlist {
  id: number
  name: string
  coverImgUrl: string
  creator: { userId: number; nickname: string; avatarUrl: string }
  trackCount: number
  playCount: number
  subscribed: boolean
  tags: string[]
  description: string
  createTime: number
  tracks: Song[]
  [key: string]: unknown
}

/** 用户信息 */
export interface UserProfile {
  userId: number
  nickname: string
  avatarUrl: string
  [key: string]: unknown
}
