import hyRequest from "@/service"

/* 歌手详情 + 热门歌曲 */
export function getArtistDetail(
  id: number
) {

  return hyRequest.get({

    url: "/artists",

    params: {
      id
    }
  })
}

/* 歌手专辑 */
export function getArtistAlbum(

  id: number,

  limit = 30,

  offset = 0

) {

  return hyRequest.get({

    url: "/artist/album",

    params: {

      id,

      limit,

      offset
    }
  })
}

/* 歌手描述 */
export function getArtistDesc(
  id: number
) {

  return hyRequest.get({

    url: "/artist/desc",

    params: {
      id
    }
  })
}

/* 关注 / 取消关注歌手 */
export function subscribeArtist(id: number, t: 1 | 0, cookie: string) {
  return hyRequest.get({
    url: "/artist/sub",
    params: { id, t, cookie, timestamp: Date.now() }
  })
}

/* 歌手详情信息 */
export function getArtistInfo(
  id: number
) {

  return hyRequest.get({

    url: "/artist/detail",

    params: {
      id
    }
  })
}
