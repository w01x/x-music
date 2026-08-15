import hyRequest from "@/service"

export function getProgramDetail(id: number) {
  return hyRequest.get({ url: "/dj/program/detail", params: { id } })
}

export function getRadioPrograms(rid: number, limit = 30, offset = 0) {
  return hyRequest.get({ url: "/dj/program", params: { rid, limit, offset, asc: false } })
}

export function getSongUrl(id: number) {
  return hyRequest.get({ url: "/song/url", params: { id } })
}

export function getProgramComments(id: number, offset = 0, limit = 20, cookie?: string | null) {
  return hyRequest.get({ url: "/comment/dj", params: { id, offset, limit, cookie, timestamp: Date.now() } })
}

export async function sendComment(id: number, content: string, cookie: string, commentId?: number) {
  const res: any = await hyRequest.get({
    url: "/comment",
    params: { t: commentId ? 2 : 1, type: 4, id, content, commentId, cookie, timestamp: Date.now() },
  })
  if (res.code !== 200) {
    throw new Error(res.message || res.msg || "评论发送失败")
  }
  return res
}

export async function deleteComment(id: number, commentId: number, cookie: string) {
  const res: any = await hyRequest.get({
    url: "/comment",
    params: { t: 0, type: 4, id, commentId, cookie, timestamp: Date.now() },
  })
  if (res.code !== 200) {
    throw new Error(res.message || res.msg || "评论删除失败")
  }
  return res
}

export function likeComment(id: number, cid: number, t: number, cookie: string) {
  return hyRequest.get({ url: "/comment/like", params: { id, cid, t, type: 4, cookie, timestamp: Date.now() } })
}
