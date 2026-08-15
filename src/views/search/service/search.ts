import hyRequest from '@/service'

export function getSearchSongs(keywords: string,
  limit = 30,
  offset = 0
) {
  return hyRequest.get({
    url: '/search',
    params: {
      keywords,
      limit,
      offset
    }
  })
}
export function checkMusic(id: number) {
  return hyRequest.get({
    url: '/check/music',
    params: {
      id
    }
  })
}
export function getDefaultSearch() {
  return hyRequest.get({
    url: '/search/default'
  })
}
export function getHotSearch() {
  return hyRequest.get({
    url: '/search/hot/detail'
  })
}
export function getSearchSuggest(keywords: string) {
  return hyRequest.get({
    url: '/search/suggest',
    params: {
      keywords,
      type: 'mobile'
    }
  })
}
