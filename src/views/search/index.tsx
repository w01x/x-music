import { FC, memo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Flame } from "lucide-react";
import { useAppDispatch } from "@/store";
import { formatTime } from "@/utils/format";
import { Pagination } from 'antd'
import { useEffect, useRef, useState } from "react";
import {
  getSearchSongs,
  getDefaultSearch,
  getHotSearch,
  getSearchSuggest
} from "./service/search";
import { fetchCurrentSongAction } from "@/views/player/store/player";

import { SearchWrapper } from "./style";

interface IProps {
  children?: React.ReactNode,
}

const Search: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const keywords = searchParams.get('keywords') || ''
  const [inputValue, setInputValue] = useState(keywords)
  const [suggestList, setSuggestList] = useState<any[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  // 点击外部关闭联想
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSuggestList([])
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  // URL 关键词变化时同步到输入框
  useEffect(() => {
    setInputValue(keywords)
  }, [keywords])

  const [songs, setSongs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [hotList, setHotList] = useState<any[]>([])
  const [defaultKeyword, setDefaultKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 30
  const [total, setTotal] = useState(0)

  // 搜索联想
  useEffect(() => {
    if (!inputValue.trim()) {
      setSuggestList([])
      return
    }
    getSearchSuggest(inputValue).then((res: any) => {
      setSuggestList(res.result?.allMatch || [])
    })
  }, [inputValue])

  // 默认关键词 + 热搜
  useEffect(() => {
    getDefaultSearch().then((res: any) => {
      const keyword = res.data.showKeyword?.replace(/[\u{1F000}-\u{1FFFF}]/gu, '').trim()
      setDefaultKeyword(keyword)
    })

    getHotSearch().then((res: any) => {
      setHotList(res.data || [])
    })
  }, [])

  // 搜索（关键词变化时，重置到第一页）
  useEffect(() => {
    if (!keywords) return
    setCurrentPage(1)
    setLoading(true)
    getSearchSongs(keywords, pageSize, 0)
      .then((res: any) => {
        setSongs(res.result.songs || [])
        setTotal(res.result.songCount || 0)
        setLoading(false)
      })
  }, [keywords])

  // 翻页
  useEffect(() => {
    if (!keywords || currentPage === 1) return
    setLoading(true)
    const offset = (currentPage - 1) * pageSize
    getSearchSongs(keywords, pageSize, offset)
      .then((res: any) => {
        setSongs(res.result.songs || [])
        setTotal(res.result.songCount || 0)
        setLoading(false)
      })
  }, [currentPage])

  // 处理搜索
  function handleSearch() {
    if (!inputValue.trim()) return
    setCurrentPage(1)
    navigate(`/search?keywords=${encodeURIComponent(inputValue)}`)
  }

  // 回车搜索
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <SearchWrapper>
      {/* 搜索框区域 */}
      <div className="search-container" ref={searchRef}>
        <div className="search-box">

          <div className="search-main">

            <Flame size={18} className="search-icon" />

            <input
              type="text"
              className="search-input"
              placeholder={defaultKeyword || "搜索歌曲、歌手、专辑..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />

            <button className="search-btn" onClick={handleSearch}>
              搜索
            </button>

          </div>

          {
            suggestList.length > 0 && (
              <div className="suggest-list">
                {
                  suggestList.map((item: any) => (
                    <div
                      key={item.keyword}
                      className="suggest-item"
                      onClick={() => {
                        navigate(`/search?keywords=${item.keyword}`)
                        setSuggestList([])
                      }}
                    >
                      {item.keyword}
                    </div>
                  ))
                }
              </div>
            )
          }

        </div>
      </div>

      {/* 搜索结果 */}
      {keywords && (
        <>
          <div className="keywords">
            找到 {total} 条关于 "{keywords}" 的歌曲
          </div>

          {!loading && songs.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">🔍</div>
              <div className="empty-text">
                未找到与 "{keywords}" 相关的歌曲
              </div>
            </div>
          ) : (
            <>
              <div className="header">
                <div className="song-name">歌曲</div>
                <div className="artist-name">歌手</div>
                <div className="album-name">专辑</div>
                <div className="duration">时长</div>
              </div>

              <div className="song-list">
                {songs.map((item) => (
                  <div
                    key={item.id}
                    className="song-item"
                    onClick={() => {
                      dispatch(fetchCurrentSongAction(item.id))
                    }}
                  >
                    <div className="song-name">
                      <span
                        className="song-link"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/discover/song/${item.id}`)
                        }}
                      >
                        {item.name}
                      </span>
                    </div>
                    <div className="artist-name">
                      {item.artists?.map((artist: any, i: number) => (
                        <span key={artist.id}>
                          {i > 0 && ' / '}
                          <span
                            className="artist-link"
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate(`/discover/artist/${artist.id}`)
                            }}
                          >
                            {artist.name}
                          </span>
                        </span>
                      ))}
                    </div>
                    <div className="album-name">《{item.album?.name}》</div>
                    <div className="duration">{formatTime(item.duration)}</div>
                  </div>
                ))}
              </div>

              <div className="pagination">
                <Pagination
                  current={currentPage}
                  total={total}
                  pageSize={pageSize}
                  showSizeChanger={false}
                  onChange={(page) => {
                    setCurrentPage(page)
                  }}
                />
              </div>
            </>
          )}
        </>
      )}

      {/* 无搜索时显示 */}
      {!keywords && (
        <div className="discover">
          <div className="empty-text">
            输入关键词，搜索你喜欢的音乐
          </div>

          <div className="hot-search">
            <div className="title">
              <Flame size={22} />
              热搜榜
            </div>

            <div className="hot-list">
              {
                hotList.map((item, index) => (
                  <div
                    key={item.searchWord}
                    className="hot-item"
                    onClick={() => {
                      navigate(`/search?keywords=${item.searchWord}`)
                    }}
                  >
                    <span className="index">{index + 1}</span>

                    <span className="word">
                      {item.searchWord}
                    </span>

                    <span className="score">
                      {item.score}
                    </span>
                  </div>
                ))
              }
            </div>
          </div>

        </div>
      )}
    </SearchWrapper>
  )
}

export default memo(Search)
