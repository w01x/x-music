import hyRequest from "@/service"

export function getPlaylistDetail(id: number, cookie?: string) {
  return hyRequest.get({
    url: "/playlist/detail",
    params: cookie ? { id, cookie, timestamp: Date.now() } : { id }
  })
}

export function getRelatedPlaylist(id: number) {
  return hyRequest.get({
    url: "/playlist/detail/rcmd/get",
    params: { id }
  })
}

export function subscribePlaylist(id: number, t: number, cookie: string) {
  return hyRequest.get({
    url: "/playlist/subscribe",
    params: { id, t, cookie, timestamp: Date.now() },
  })
}
