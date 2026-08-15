import hyRequest from "@/service"
export function getPlaylistCatList() {
  return hyRequest.get({
    url: "/playlist/catlist"
  })
}
export function getTopPlaylist(params: any) {
  return hyRequest.get({
    url: "/top/playlist",
    params
  })
}

export function getPlaylistDetail(id: number) {
  return hyRequest.get({
    url: "/playlist/detail",
    params: { id }
  })
}
