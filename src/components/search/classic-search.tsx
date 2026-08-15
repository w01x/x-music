import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import MusicLoader from "@/components/music-loader"
import { getSearchSuggest } from "@/views/search/service/search"

export default function ClassicSearch() {
  const [value, setValue] = useState("")
  const [suggestList, setSuggestList] = useState<any[]>([])
  const [showSuggest, setShowSuggest] = useState(false)
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!value.trim()) {
      setSuggestList([])
      return
    }

    const timer = setTimeout(() => {
      setLoading(true)
      getSearchSuggest(value).then((res: any) => {
        setSuggestList(res.result?.allMatch || [])
      }).finally(() => setLoading(false))
    }, 300)

    return () => clearTimeout(timer)
  }, [value])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowSuggest(false)
        setExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () =>
      document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleSearch(keyword?: string) {
    const kw = (keyword || value).trim()
    if (!kw) return
    setShowSuggest(false)
    setValue(kw)
    setExpanded(false)
    navigate(`/search?keywords=${encodeURIComponent(kw)}`)
  }

  function toggleExpand() {
    setExpanded(v => !v)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  return (
    <div ref={containerRef} className={`search-container relative md:w-[360px] ${expanded ? 'search-expanded' : ''}`}>
      <style>{`
        @media (max-width: 480px) {
          .search-container { width: auto; }
          .search-input-wrap { display: none; }
          .search-expanded .search-input-wrap { display: block; }
          .search-expanded { position: absolute; right: 0; top: -8px; width: 240px; z-index: 200; }
        }
      `}</style>
      {/* Mobile: icon trigger */}
      <button
        className="search-icon-btn hidden max-[480px]:flex items-center justify-center w-9 h-9 rounded-full bg-none border-none text-[#B3B3B3] cursor-pointer"
        onClick={toggleExpand}
      >
        <Search className="h-4 w-4" />
      </button>

      <div className="search-input-wrap relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />

        <Input
          ref={inputRef}
          placeholder="搜索歌曲、歌手、专辑..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setShowSuggest(true)
          }}
          onFocus={() => {
            if (suggestList.length > 0 || loading || value.trim()) {
              setShowSuggest(true)
            }
          }}
          onBlur={() => {
            setTimeout(() => setShowSuggest(false), 150)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch()
          }}
          className="
            pl-3 pr-10
            h-9 text-xs text-white
            bg-[#1F2230]
            border-transparent
            focus-visible:ring-0
            focus-visible:border-[#FF4D4F]
            placeholder:text-zinc-400
            rounded-full
            w-full
          "
        />
      </div>

      <div
        className={`absolute top-full left-0 right-0 mt-1 bg-[#222733] border border-[#1F2230] rounded-lg shadow-lg overflow-hidden z-[999] transition-all duration-200 ease-out ${
          showSuggest && (suggestList.length > 0 || loading)
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible"
        }`}
      >
        {loading && (
          <div className="flex items-center justify-center h-10">
            <MusicLoader />
          </div>
        )}
        {!loading && suggestList.map((item: any) => (
          <div
            key={item.keyword}
            className="flex items-center h-10 pl-4 pr-4 text-sm text-[#B3B3B3] cursor-pointer hover:bg-white/5 hover:text-white transition-colors min-w-0"
            onMouseDown={() => handleSearch(item.keyword)}
          >
            <span className="block truncate">{item.keyword}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
