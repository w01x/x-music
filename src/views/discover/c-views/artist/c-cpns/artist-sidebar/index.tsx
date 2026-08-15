import { memo, useState } from "react"
import type { FC } from "react"
import { useAppDispatch } from "@/store"
import { fetchArtistListAction } from "../../store/thunk"
import { SidebarWrapper } from "./style"

const artistCategory = [
  {
    title: "推荐",
    children: [
      {
        name: "推荐歌手",
        area: -1,
        type: -1
      }
    ]
  },
  {
    title: "华语",
    children: [
      { name: "华语男歌手", area: 7, type: 1 },
      { name: "华语女歌手", area: 7, type: 2 },
      { name: "华语组合/乐队", area: 7, type: 3 }
    ]
  },
  {
    title: "欧美",
    children: [
      { name: "欧美男歌手", area: 96, type: 1 },
      { name: "欧美女歌手", area: 96, type: 2 },
      { name: "欧美组合/乐队", area: 96, type: 3 }
    ]
  },
  {
    title: "日本",
    children: [
      { name: "日本男歌手", area: 8, type: 1 },
      { name: "日本女歌手", area: 8, type: 2 },
      { name: "日本组合/乐队", area: 8, type: 3 }
    ]
  },
  {
    title: "韩国",
    children: [
      { name: "韩国男歌手", area: 16, type: 1 },
      { name: "韩国女歌手", area: 16, type: 2 },
      { name: "韩国组合/乐队", area: 16, type: 3 }
    ]
  },
  {
    title: "其他",
    children: [
      { name: "其他男歌手", area: 0, type: 1 },
      { name: "其他女歌手", area: 0, type: 2 },
      { name: "其他组合/乐队", area: 0, type: 3 }
    ]
  }
]

interface IProps {
  onCategoryChange?: (name: string) => void
}

const ArtistSidebar: FC<IProps> = (props) => {
  const { onCategoryChange } = props
  const dispatch = useAppDispatch()
  const [currentName, setCurrentName] = useState("推荐歌手")

  const handleItemClick = (item: any) => {
    setCurrentName(item.name)
    onCategoryChange?.(item.name)
    dispatch(
      fetchArtistListAction({
        area: item.area,
        type: item.type,
        limit: 100
      })
    )
  }

  return (
    <SidebarWrapper>
      {artistCategory.map((group) => (
        <div className="group" key={group.title}>
          <h3>{group.title}</h3>
          <div className="items">
            {group.children.map((item) => (
              <div
                key={item.name}
                className={currentName === item.name ? "item active" : "item"}
                onClick={() => handleItemClick(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </SidebarWrapper>
  )
}

export default memo(ArtistSidebar)
