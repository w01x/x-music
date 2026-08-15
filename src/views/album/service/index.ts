import hyRequest from "@/service"

export function getAlbumDetail(id: number) {
  return hyRequest.get({
    url: "/album",
    params: { id }
  })
}

export function getArtistAlbum(artistId: number, limit = 10) {
  return hyRequest.get({
    url: "/artist/album",
    params: { id: artistId, limit }
  })
}

export function getAlbumComments(
  id: number,
  offset = 0,
  limit = 20
) {
  return hyRequest.get({
    url: "/comment/album",
    params: { id, offset, limit }
  })
}

export function subscribeAlbum(id: number, t: number, cookie: string) {
  return hyRequest.get({
    url: "/album/sub",
    params: { id, t, cookie, timestamp: Date.now() },
  })
}
