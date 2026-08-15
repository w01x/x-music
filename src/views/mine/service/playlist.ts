import api from '@/service'
import type { ISongItem } from '@/components/song-list-table'

export interface PlaylistItem {
  id: number
  name: string
  coverImgUrl: string
  trackCount: number
  playCount: number
  description: string
  subscribed: boolean
  creator: {
    userId: number
    nickname: string
    avatarUrl: string
  }
}

export const getUserPlaylist = async (uid: number, cookie: string) => {
  const all: any[] = []
  const limit = 50
  let offset = 0
  let hasMore = true
  while (hasMore) {
    const res: any = await api.get({
      url: '/user/playlist',
      params: { uid, limit, offset, cookie, timestamp: Date.now() },
    })
    const items = res?.playlist ?? []
    all.push(...items)
    offset += limit
    hasMore = items.length >= limit
  }
  return all as PlaylistItem[]
}

export interface PlaylistDetail {
  name: string
  coverImgUrl: string
  description: string
  tags: string[]
  trackCount: number
  playCount: number
  createTime: number
  subscribed: boolean
  creator: {
    userId: number
    nickname: string
    avatarUrl: string
  }
}

export const getPlaylistTracks = async (id: number, cookie: string): Promise<{ detail: PlaylistDetail; songs: ISongItem[] }> => {
  const detailRes: any = await api.get({
    url: '/playlist/detail',
    params: { id, cookie, timestamp: Date.now() },
  })
  const pl = detailRes?.playlist ?? {}
  const detail: PlaylistDetail = {
    name: pl.name ?? '',
    coverImgUrl: pl.coverImgUrl ?? '',
    description: pl.description ?? '',
    tags: pl.tags ?? [],
    trackCount: pl.trackCount ?? 0,
    playCount: pl.playCount ?? 0,
    createTime: pl.createTime ?? 0,
    subscribed: pl.subscribed ?? false,
    creator: {
      userId: pl.creator?.userId,
      nickname: pl.creator?.nickname ?? '',
      avatarUrl: pl.creator?.avatarUrl ?? '',
    },
  }

  const totalCount = pl.trackCount ?? 0
  let allTracks: any[] = []

  try {
    const allRes: any = await api.get({
      url: '/playlist/track/all',
      params: { id, limit: Math.max(totalCount, 1000), offset: 0 },
    })
    allTracks = allRes?.songs ?? []
  } catch {
    // 如果 /playlist/track/all 不可用，回退到分批获取 /playlist/detail
    const limit = 1000
    const total = Math.min(totalCount, 5000)
    const requests: Promise<any>[] = []
    for (let offset = 0; offset < total; offset += limit) {
      requests.push(
        api.get({
          url: '/playlist/detail',
          params: { id, cookie, timestamp: Date.now(), limit, offset },
        })
      )
    }
    const results = await Promise.all(requests)
    const seen = new Set<number>()
    for (const res of results) {
      const tracks = res?.playlist?.tracks ?? []
      for (const t of tracks) {
        if (!seen.has(t.id)) {
          seen.add(t.id)
          allTracks.push(t)
        }
      }
    }
  }

  const songs: ISongItem[] = allTracks.map((t: any) => ({
    id: t.id,
    name: t.name,
    dt: t.dt,
    ar: t.ar,
    al: t.al,
  }))
  return { detail, songs }
}

/* 收藏 / 取消收藏歌单 */
export const subscribePlaylist = async (t: 1 | 2, id: number, cookie: string) => {
  await api.get({
    url: '/playlist/subscribe',
    params: { t, id, cookie, timestamp: Date.now() },
  })
}
/* 新建歌单 */
export const createPlaylist = async (name: string, cookie: string) => {
  const res: any = await api.get({
    url: '/playlist/create',
    params: { name, cookie, timestamp: Date.now() },
  })
  if (res.code !== 200) {
    throw new Error(res.message || res.msg || '新建歌单失败')
  }
  return res
}

/* 添加歌曲到歌单 */
export const addToPlaylist = async (pid: number, trackIds: number[], cookie: string) => {
  const res: any = await api.get({
    url: '/playlist/tracks',
    params: { op: 'add', pid, tracks: trackIds.join(','), cookie, timestamp: Date.now() },
  })
  const code = res.code ?? res.body?.code
  if (code !== 200) {
    throw new Error('添加歌曲失败')
  }
  return res
}

/* 从歌单删除歌曲 */
export const removeFromPlaylist = async (pid: number, trackIds: number[], cookie: string) => {
  const res: any = await api.get({
    url: '/playlist/tracks',
    params: { op: 'del', pid, tracks: trackIds.join(','), cookie, timestamp: Date.now() },
  })
  const code = res.code ?? res.body?.code
  if (code !== 200) {
    throw new Error('删除歌曲失败')
  }
  return res
}

/* 删除歌单 */
export const deletePlaylist = async (id: number, cookie: string) => {
  const res: any = await api.get({
    url: '/playlist/delete',
    params: { id, cookie, timestamp: Date.now() },
  })
  if (res.code !== 200) {
    throw new Error(res.message || res.msg || '删除歌单失败')
  }
  return res
}
