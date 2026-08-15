import hyRequest from "@/service"

export function getArtistList(

  type = -1,

  area = -1,

  initial: string | number = -1,

  limit = 30,

  offset = 0
) {

  return hyRequest.get({

    url: "/artist/list",

    params: {

      type,

      area,

      initial,

      limit,

      offset
    }
  })
}
