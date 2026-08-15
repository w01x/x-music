import React, { memo } from "react"
import {
  HeaderWrapper,
  HeaderTop,
  HeaderLeft,
  HeaderRight,
  Divider,
  CategoryTag
} from "./style"

const categories = [
  { label: "全部", value: "ALL" },
  { label: "华语", value: "ZH" },
  { label: "欧美", value: "EA" },
  { label: "韩国", value: "KR" },
  { label: "日本", value: "JP" }
]

interface IProps {
  currentCat: string
  onCatChange: (cat: string) => void
}

const AlbumHeader = memo(function AlbumHeader(props: IProps) {
  const { currentCat, onCatChange } = props

  return (
    <HeaderWrapper>
      <HeaderTop>
        <HeaderLeft>
          <h2>全部新碟</h2>
          <p className="subtitle">
            发现最新发行的专辑与EP，探索全球音乐趋势。
          </p>
        </HeaderLeft>

        <HeaderRight>
          {categories.map((item) => (
            <CategoryTag
              key={item.value}
              $active={currentCat === item.value}
              onClick={() => onCatChange(item.value)}
            >
              {item.label}
            </CategoryTag>
          ))}
        </HeaderRight>
      </HeaderTop>

      <Divider />
    </HeaderWrapper>
  )
})

export default AlbumHeader