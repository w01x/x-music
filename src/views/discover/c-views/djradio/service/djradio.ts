import hyRequest from "@/service"

export function getRecommendProgram(limit = 20, offset = 0) {
  return hyRequest.get({
    url: "/program/recommend",
    params: { limit, offset },
  })
}

export function getProgramToplist(limit = 100, offset = 0) {
  return hyRequest.get({
    url: "/dj/program/toplist",
    params: { limit, offset },
  })
}

export function getProgramDetail(id: number) {
  return hyRequest.get({
    url: "/dj/program/detail",
    params: { id },
  })
}
