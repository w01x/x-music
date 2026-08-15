
import { memo, useEffect, useState, useRef, useCallback } from "react"
import type { FC } from "react"
import { CommentWrapper } from "./style"
import { getAlbumComments } from "../../service"
import { getImageSize, formatRelativeTime } from "@/utils/format"

interface IUser {
  userId: number
  nickname: string
  avatarUrl: string
}

interface IComment {
  commentId: number
  content: string
  time: number
  user: IUser
  likedCount: number
}

interface IProps {
  albumId: number
}

const PAGE_SIZE = 20
const AlbumComment: FC<IProps> = ({ albumId }) => {
  const [hotComments, setHotComments] = useState<IComment[]>([])
  const [comments, setComments] = useState<IComment[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const loadingRef = useRef(false)
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const fetchComments = useCallback(
    async (page: number) => {
      if (loadingRef.current) return
      loadingRef.current = true
      setLoading(true)
      const offset = (page - 1) * PAGE_SIZE
      try {
        const res: any = await getAlbumComments(albumId, offset, PAGE_SIZE)
        if (res.code === 200) {
          if (page === 1) {
            setHotComments(res.hotComments || [])
          }
          setComments(res.comments || [])
          setTotal(res.total || 0)
          setCurrentPage(page)
        }
      } catch (err) {
        console.error("获取评论失败:", err)
      } finally {
        loadingRef.current = false
        setLoading(false)
      }
    },
    [albumId]
  )

  useEffect(() => {
    setComments([])
    setHotComments([])
    setTotal(0)
    setCurrentPage(1)
    fetchComments(1)
  }, [albumId, fetchComments])

  function handlePageChange(page: number) {
    if (page === currentPage || page < 1 || page > totalPages) return
    fetchComments(page)
  }

  if (!loading && comments.length === 0 && hotComments.length === 0) {
    return (
      <CommentWrapper>
        <div className="comment-header">
          <h3>最新评论</h3>
          <span className="count">{total}</span>
        </div>
        <div className="empty">暂无评论</div>
      </CommentWrapper>
    )
  }

  function getPageNumbers(): (number | string)[] {
    const delta = 2
    const range: number[] = []
    const start = Math.max(2, currentPage - delta)
    const end = Math.min(totalPages - 1, currentPage + delta)
    for (let i = start; i <= end; i++) range.push(i)

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const result: (number | string)[] = [1]
    if (start > 2) result.push("...")
    result.push(...range)
    if (end < totalPages - 1) result.push("...")
    result.push(totalPages)
    return result
  }

  return (
    <CommentWrapper>
      <div className="comment-header">
        <h3>最新评论</h3>
        <span className="count">{total}</span>
      </div>

      {hotComments.length > 0 && (
        <div className="hot-comments">
          <h4>精彩评论</h4>
          {hotComments.map((item) => (
            <div className="comment-item" key={item.commentId}>
              <img
                className="avatar"
                src={getImageSize(item.user.avatarUrl, 40)}
                alt=""
              />
              <div className="content">
                <div className="meta">
                  <span className="nickname">{item.user.nickname}</span>
                  <span className="time">
                    {formatRelativeTime(item.time)}
                  </span>
                </div>
                <div className="text">{item.content}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="latest-comments">
        {hotComments.length > 0 && <h4>最新评论</h4>}
        {comments.map((item) => (
          <div className="comment-item" key={item.commentId}>
            <img
              className="avatar"
              src={getImageSize(item.user.avatarUrl, 40)}
              alt=""
            />
            <div className="content">
              <div className="meta">
                <span className="nickname">{item.user.nickname}</span>
                <span className="time">
                  {formatRelativeTime(item.time)}
                </span>
              </div>
              <div className="text">{item.content}</div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={loading || currentPage === 1}
          >
            上一页
          </button>
          {getPageNumbers().map((page) =>
            page === "..." ? (
              <span key={`ellipsis-${page}-${Math.random()}`} className="ellipsis">...</span>
            ) : (
              <button
                key={page}
                className={`page-btn ${page === currentPage ? "active" : ""}`}
                onClick={() => handlePageChange(page as number)}
                disabled={loading}
              >
                {page}
              </button>
            )
          )}
          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={loading || currentPage === totalPages}
          >
            下一页
          </button>
        </div>
      )}
    </CommentWrapper>
  )
}

export default memo(AlbumComment)
