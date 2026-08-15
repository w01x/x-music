import hyRequest from "@/service"

/**
 * 获取所有榜单摘要
 */
export function getTopListDetail() {
  return hyRequest.get({
    url: "/toplist/detail"
  })
}

/**
 * 获取榜单详情
 */
export function getPlayListDetail(id: number, cookie?: string) {
  return hyRequest.get({
    url: "/playlist/detail",
    params: cookie ? { id, cookie, timestamp: Date.now() } : { id }
  })
}
export function getPlayListAllTracks(
  id: number
) {
  return hyRequest.get({
    url: "/playlist/track/all",
    params: {
      id
    }
  })
}

export function subscribePlaylist(id: number, t: number, cookie: string) {
  return hyRequest.get({
    url: "/playlist/subscribe",
    params: { id, t, cookie, timestamp: Date.now() },
  })
}
