import hyRequest from './index'

/** 获取歌曲详情（支持单个 ID 或逗号分隔的多个 ID） */
export function getSongDetail(ids: number | string) {
  return hyRequest.get({
    url: '/song/detail',
    params: { ids }
  })
}

/** 获取歌曲歌词（行级） */
export function getSongLyric(id: number) {
  return hyRequest.get({
    url: '/lyric',
    params: { id }
  })
}

/** 获取歌曲歌词（逐词 YRC 格式） */
export function getSongYrcLyric(id: number) {
  return hyRequest.get({
    url: '/lyric/new',
    params: { id }
  })
}

/** 获取歌曲播放地址 */
export function getSongUrl(id: number) {
  return hyRequest.get({
    url: '/song/url/v1',
    params: {
      id,
      level: 'standard'
    }
  })
}
