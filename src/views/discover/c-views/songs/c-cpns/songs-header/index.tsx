import React, { memo, useEffect, useState, useRef } from "react"
import { ChevronDown } from "lucide-react"
import {
  HeaderWrapper,
  CategoryRow,
  CategoryTag,
  MoreBtn,
  CategoryDropdown,
  CategoryPanel
} from "./style"
import { getPlaylistCatList } from "../../service/songs"

const TOP_CATEGORIES = [
  "华语",
  "欧美",
  "日语",
  "K-Pop",
  "R&B",
  "民谣",
  "摇滚",
  "电子"
]

interface IProps {
  currentCat: string
  onCatChange: (cat: string) => void
}

const SongsHeader: React.FC<IProps> = (props) => {
  const { currentCat, onCatChange } = props

  const [showPanel, setShowPanel] = useState(false)
  const [categories, setCategories] = useState<any>({})
  const [sub, setSub] = useState<any[]>([])
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getPlaylistCatList().then((res: any) => {
      setCategories(res.categories)
      setSub(res.sub)
    })
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowPanel(false)
      }
    }
    if (showPanel) {
      document.addEventListener("mousedown", handleClick)
    }
    return () => document.removeEventListener("mousedown", handleClick)
  }, [showPanel])

  const handleCatClick = (name: string) => {
    onCatChange(name)
    setShowPanel(false)
  }

  const isTopCat = TOP_CATEGORIES.includes(currentCat)

  return (
    <HeaderWrapper>
      <CategoryRow>
        <CategoryTag
          $active={currentCat === "全部"}
          onClick={() => handleCatClick("全部")}
        >
          全部
        </CategoryTag>

        {TOP_CATEGORIES.map((cat) => (
          <CategoryTag
            key={cat}
            $active={currentCat === cat}
            onClick={() => handleCatClick(cat)}
          >
            {cat}
          </CategoryTag>
        ))}

        <CategoryDropdown ref={panelRef}>
          <MoreBtn
            $open={showPanel || (!isTopCat && currentCat !== "全部")}
            onClick={() => setShowPanel(!showPanel)}
          >
            {!isTopCat && currentCat !== "全部" ? currentCat : "更多"}
            <ChevronDown />
          </MoreBtn>

          {showPanel && (
            <CategoryPanel>
              <span className="all-cat" onClick={() => handleCatClick("全部")}>
                全部风格
              </span>

              {Object.entries(categories).map(([key, value]) => (
                <div key={key} className="group">
                  <div className="group-title">{value as string}</div>
                  <div className="group-list">
                    {sub
                      .filter((item) => item.category === Number(key))
                      .map((item) => (
                        <span
                          key={item.name}
                          className="cat-item"
                          onClick={() => handleCatClick(item.name)}
                        >
                          {item.name}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </CategoryPanel>
          )}
        </CategoryDropdown>
      </CategoryRow>
    </HeaderWrapper>
  )
}

export default memo(SongsHeader)
