import hyRequest from "@/service"

export function getAlbumDetail(id: number) {
  return hyRequest.get({
    url: "/album",
    params: { id }
  })
}
