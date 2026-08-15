import api from '@/service'
import type { ISongItem } from '@/components/song-list-table'
import { cleanName } from '@/utils/format'

export interface RecentPlaylistItem {
  id: number
  name: string
  coverImgUrl: string
  trackCount: number
  playCount: number
  creator: {
    userId: number
    nickname: string
    avatarUrl: string
  }
}

export const getRecentSongs = async (cookie: string, limit = 100): Promise<ISongItem[]> => {
  const res: any = await api.get({
    url: '/record/recent/song',
    params: { cookie, limit, timestamp: Date.now() },
  })
  const data = res?.data ?? res
  let rawList = data?.list ?? data?.data
  if (!Array.isArray(rawList)) {
    rawList = data?.weekData ?? data?.allData ?? []
    if (!Array.isArray(rawList)) rawList = []
  }
  return rawList.map((t: any) => {
    const song = t?.data ?? t
    if (!song || typeof song !== 'object') return null as any
    return {
      id: song.id,
      name: song.name,
      dt: song.dt ?? 0,
      ar: song.ar ?? song.artists,
      al: song.al ?? song.album,
    }
  }).filter(Boolean)
}

export const getRecentPlaylists = async (cookie: string, limit = 100): Promise<RecentPlaylistItem[]> => {
  const res: any = await api.get({
    url: '/record/recent/playlist',
    params: { cookie, limit, timestamp: Date.now() },
  })
  const data = res?.data ?? res
  const rawList = data?.list ?? data?.data
  const list = Array.isArray(rawList) ? rawList : []

  const items = list.map((p: any) => {
    const pl = p?.data ?? p
    if (!pl || typeof pl !== 'object') return null
    return {
      id: pl.id,
      name: cleanName(pl.name ?? ''),
      coverImgUrl: pl.coverImgUrl ?? '',
      creator: {
        userId: pl.creator?.userId,
        nickname: pl.creator?.nickname ?? '',
        avatarUrl: pl.creator?.avatarUrl ?? '',
      },
    }
  }).filter(Boolean) as RecentPlaylistItem[]

  // 并行请求歌单详情获取准确的 trackCount
  const batchSize = 10
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    const results = await Promise.allSettled(
      batch.map((item) =>
        api.get({
          url: '/playlist/detail',
          params: { id: item.id, cookie, timestamp: Date.now() },
        })
      )
    )
    results.forEach((r, j) => {
      if (r.status === 'fulfilled') {
        const pl = r.value?.playlist ?? r.value?.data ?? {}
        items[i + j].trackCount = pl.trackCount ?? 0
        items[i + j].playCount = pl.playCount ?? 0
      }
    })
  }

  return items
}
