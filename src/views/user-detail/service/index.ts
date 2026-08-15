import api from '@/service'

/** 关注 / 取消关注用户 */
export const followUser = async (userId: number, t: 1 | 0, cookie: string) => {
  return api.get({
    url: '/user/follow',
    params: { id: userId, t, cookie, timestamp: Date.now() },
  })
}

export interface UserProfile {
  userId: number
  nickname: string
  avatarUrl: string
  signature: string
  gender: number
  followeds: number
  follows: number
  playlistCount: number
  eventCount: number
  avatarDetail: { identityIconUrl: string } | null
}

export const getUserDetail = async (uid: number, cookie?: string) => {
  const res: any = await api.get({
    url: '/user/detail',
    params: { uid, cookie },
  })
  return res?.profile as UserProfile | undefined
}

export interface UserPlaylist {
  id: number
  name: string
  coverImgUrl: string
  trackCount: number
  playCount: number
  description: string
  creator: { userId: number }
}

export const getUserPlaylists = async (uid: number, cookie?: string) => {
  const res: any = await api.get({
    url: '/user/playlist',
    params: { uid, cookie, limit: 30 },
  })
  return (res?.playlist ?? []) as UserPlaylist[]
}

/* 用户动态 */
export interface UserEventItem {
  id: number
  type: number
  eventTime: number
  user: {
    userId: number
    nickname: string
    avatarUrl: string
  }
  info: {
    commentThread: { resourceTitle: string; resourceId: number }
  }
  json: string
  pics: { squareUrl: string; originUrl: string }[]
}

/* 最近播放 */
export interface RecentSong {
  data: {
    id: number
    name: string
    al: { id: number; name: string; picUrl: string }
    ar: { id: number; name: string }[]
  }
}

export const getRecentSongs = async (uid: number, cookie?: string) => {
  const res: any = await api.get({
    url: '/record/recent/song',
    params: { uid, type: 1, cookie },
  })
  return ((res?.weekData ?? res?.allData ?? []) as any[]).map((d: any) => d.data) as RecentSong['data'][]
}

export const getUserEvents = async (uid: number, cookie?: string, limit = 30, lasttime = -1) => {
  const res: any = await api.get({
    url: '/user/event',
    params: { uid, cookie, limit, lasttime },
  })
  return {
    events: (res?.events ?? []) as UserEventItem[],
    more: res?.more ?? false,
    lasttime: res?.lasttime ?? -1,
  }
}
