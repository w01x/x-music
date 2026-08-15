import api from '@/service'

/* 关注用户 */
export interface FollowUser {
  userId: number
  nickname: string
  avatarUrl: string
  signature: string
  gender: number
  userType: number
  followeds: number
  follows: number
}

export const getFollows = async (uid: number, cookie: string, limit = 30, offset = 0) => {
  const res: any = await api.get({
    url: '/user/follows',
    params: { uid, limit, offset, cookie },
  })
  return (res?.follow ?? []) as FollowUser[]
}

/* 关注人动态 */
export interface EventItem {
  id: number
  type: number
  eventTime: number
  threadId?: string
  user: {
    userId: number
    nickname: string
    avatarUrl: string
  }
  info: {
    commentThread: {
      id?: string
      resourceTitle: string
      resourceId: number
      likedCount?: number
      shareCount?: number
      commentCount?: number
    }
  }
  json: string
  pics: { squareUrl: string; originUrl: string }[]
}

export const getEvents = async (cookie: string, pagesize = 20, lasttime = -1) => {
  const res: any = await api.get({
    url: '/event',
    params: { cookie, pagesize, lasttime },
  })
  const raw = res?.event ?? res?.events ?? []
  return {
    events: raw as EventItem[],
    more: res?.more ?? false,
    lasttime: res?.lasttime ?? -1,
  }
}

/* 话题详情热门动态 */
export interface TopicEventItem {
  threadId: string
  discussId: string
  actName: string
  forwardCount: number
  insiteForwardCount: number
  topEvent: boolean
  musicianSay: boolean
  typeDesc: string
  encryptUserId: string
  socialUser: {
    userId: number
    nickname: string
    avatarUrl: string
  } | null
  json: string
  pics: { squareUrl: string; originUrl: string }[]
  info: {
    commentThread: {
      id: string
      resourceInfo: {
        id: number
        userId: number
        name: string
        eventType: number
        imgUrl: string | null
      }
      resourceTitle: string
      likedCount: number
      shareCount: number
      commentCount: number
    }
  }
  tailMark: {
    markTitle: string
    markType: string
    markResourceId: string
    circle: {
      imageUrl: string
      member: string
    }
  } | null
}

/* 用户详情 */
export interface UserDetail {
  userId: number
  nickname: string
  avatarUrl: string
}

export const getUserDetails = async (uids: number[], cookie: string) => {
  if (uids.length === 0) return {} as Record<number, UserDetail>
  const map: Record<number, UserDetail> = {}
  const results = await Promise.allSettled(
    uids.map((uid) =>
      api.get({ url: '/user/detail', params: { uid, cookie } })
    )
  )
  results.forEach((r) => {
    if (r.status === 'fulfilled') {
      const p: any = r.value?.profile
      if (p) {
        map[p.userId] = {
          userId: p.userId,
          nickname: p.nickname,
          avatarUrl: p.avatarUrl,
        }
      }
    }
  })
  return map
}

export const getTopicHotEvents = async (
  cookie: string,
  actid = 111551188,
  limit = 20,
  offset = 0,
) => {
  const res: any = await api.get({
    url: '/topic/detail/event/hot',
    params: { cookie, actid, limit, offset },
  })
  return {
    events: (res?.events ?? []) as TopicEventItem[],
    hot: res?.hot ?? false,
    more: res?.more ?? false,
    total: res?.total ?? 0,
  }
}

/* 批量获取歌曲详情（封面、歌手等） */
export interface SongDetail {
  id: number
  name: string
  al: { id: number; name: string; picUrl: string }
  ar: { id: number; name: string }[]
}

export const getSongDetails = async (ids: number[], cookie?: string) => {
  if (ids.length === 0) return {} as Record<number, SongDetail>
  const res: any = await api.get({
    url: '/song/detail',
    params: { ids: ids.join(','), cookie },
  })
  const map: Record<number, SongDetail> = {}
  const songs: any[] = res?.songs ?? []
  for (const s of songs) {
    map[s.id] = { id: s.id, name: s.name, al: s.al, ar: s.ar }
  }
  return map
}

/* 批量获取专辑封面 */
export const getAlbumCovers = async (ids: number[], cookie?: string) => {
  if (ids.length === 0) return {} as Record<number, string>
  const map: Record<number, string> = {}
  await Promise.allSettled(
    ids.map(async (id) => {
      try {
        const r: any = await api.get({ url: '/album/detail', params: { id, cookie } })
        const pic = r?.album?.picUrl || r?.album?.blurPicUrl || r?.album?.coverImgUrl
        if (pic) map[id] = pic
      } catch { /* skip */ }
    })
  )
  return map
}

/* 搜索歌曲 */
export interface SongItem {
  id: number
  name: string
  al: { id: number; name: string; picUrl: string }
  ar: { id: number; name: string }[]
}

export const searchSongs = async (keywords: string, cookie?: string) => {
  const res: any = await api.get({
    url: '/search',
    params: { keywords, type: 1, limit: 10, cookie },
  })
  return (res?.result?.songs ?? []) as SongItem[]
}

/* 点赞 / 取消点赞动态 */
export const likeResource = async (threadId: string, _cid: number | string, t: 1 | 0, cookie: string) => {
  const res: any = await api.get({
    url: '/resource/like',
    params: { type: 6, threadId, t, cookie, timestamp: Date.now() },
  })
  return res
}

/* 获取动态评论 */
export const getEventComments = async (threadId: string, cookie: string, offset = 0, limit = 20) => {
  const res: any = await api.get({
    url: '/comment/event',
    params: { threadId, cookie, offset, limit, timestamp: Date.now() },
  })
  return res
}

/* 发送动态评论 */
export const sendEventComment = async (threadId: string, content: string, cookie: string) => {
  const res: any = await api.get({
    url: '/comment',
    params: { t: 1, type: 6, threadId, content, cookie, timestamp: Date.now() },
  })
  return res
}

/* 删除动态评论 */
export const deleteEventComment = async (threadId: string, commentId: number, cookie: string) => {
  const res: any = await api.get({
    url: '/comment',
    params: { t: 0, type: 6, threadId, commentId, cookie, timestamp: Date.now() },
  })
  return res
}

/* 转发动态 */
export const forwardEvent = async (evId: string, uid: number, cookie: string, forward?: string) => {
  const res: any = await api.get({
    url: '/event/forward',
    params: { evId, uid, cookie, forward, timestamp: Date.now() },
  })
  return res
}

/* 删除动态 */
export const deleteEvent = async (cookie: string, evId: number | string) => {
  const res: any = await api.get({
    url: '/event/del',
    params: { cookie, evId },
  })
  return res
}

/* 分享资源到动态 */
export const shareResource = async (
  cookie: string,
  params: {
    type?: 'song' | 'playlist' | 'mv' | 'djradio' | 'djprogram' | 'album' | 'noresource'
    id?: number
    msg?: string
  },
) => {
  const res: any = await api.get({
    url: '/share/resource',
    params: { cookie, ...params },
  })
  return res
}

/* 话题详情动态（非热门，支持分页） */
export const getTopicEvents = async (
  cookie: string,
  actid = 111551188,
  limit = 20,
  offset = 0,
) => {
  const res: any = await api.get({
    url: '/topic/detail/event',
    params: { cookie, actid, limit, offset },
  })
  return {
    events: (res?.events ?? []) as TopicEventItem[],
    more: res?.more ?? false,
    total: res?.total ?? 0,
  }
}
