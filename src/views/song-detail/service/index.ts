import hyRequest from "@/service"

export { getSongDetail, getSongLyric, getSongUrl } from '@/service/song'

export function getSongComments(id: number, offset = 0, limit = 20, cookie?: string | null) {
  return hyRequest.get({ url: "/comment/music", params: { id, offset, limit, cookie, timestamp: Date.now() } })
}


export async function likeComment(id: number, cid: number, t: number, type: number, cookie: string) {
  const res: any = await hyRequest.get({
    url: "/comment/like",
    params: { id, cid, t, type, cookie, timestamp: Date.now() },
  })
  if (res.code !== 200) {
    throw new Error(res.message || res.msg || `点赞失败(code=${res.code})`)
  }
  return res
}

export function getSimilarSongs(id: number) {
  return hyRequest.get({ url: "/simi/song", params: { id } })
}

export async function sendComment(type: number, id: number, content: string, cookie: string, commentId?: number) {
  const res: any = await hyRequest.get({
    url: "/comment",
    params: { t: commentId ? 2 : 1, type, id, content, commentId, cookie, timestamp: Date.now() },
  })
  if (res.code !== 200) {
    throw new Error(res.message || res.msg || `评论发送失败(code=${res.code})`)
  }
  return res
}

export async function deleteComment(type: number, id: number, commentId: number, cookie: string) {
  const res: any = await hyRequest.get({
    url: "/comment",
    params: { t: 0, type, id, commentId, cookie, timestamp: Date.now() },
  })
  if (res.code !== 200) {
    throw new Error(res.message || res.msg || "评论删除失败")
  }
  return res
}

export function getFloorComments(parentCommentId: number, id: number, type = 0, limit = 5, time?: number, cookie?: string | null) {
  return hyRequest.get({
    url: "/comment/floor",
    params: { parentCommentId, id, type, limit, time, cookie, timestamp: Date.now() }
  })
}
