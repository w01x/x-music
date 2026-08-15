import { ITopListItem } from "../types"
export function splitTopList(
  list: ITopListItem[]
) {
  const officialNames = [
    "飙升榜",
    "新歌榜",
    "原创榜",
    "热歌榜"
  ]

  const officialList: ITopListItem[] = []
  const globalList: ITopListItem[] = []

  list.forEach((item) => {
    if (officialNames.includes(item.name)) {
      officialList.push(item)

    } else {
      globalList.push(item)
    }
  })

  return {
    officialList,
    globalList
  }
}
