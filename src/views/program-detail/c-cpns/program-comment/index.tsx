
import { memo, useEffect, useState, useRef, useCallback } from "react"
import type { FC } from "react"
import { CommentWrapper } from "./style"
import { ThumbsUp } from "lucide-react"
import { getProgramComments, sendComment, deleteComment, likeComment } from "../../service"
import { toast } from '@/utils/toast'
import { getImageSize, formatRelativeTime } from "@/utils/format"
import { useAppSelector } from "@/store"

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
  programId: number
}

const PAGE_SIZE = 20
const ProgramComment: FC<IProps> = ({ programId }) => {
  const [hotComments, setHotComments] = useState<IComment[]>([])
  const [comments, setComments] = useState<IComment[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [msg, setMsg] = useState("")
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({})
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({})
  const [likingSet, setLikingSet] = useState<Set<number>>(new Set())

  const { cookie, userId } = useAppSelector((state) => ({
    cookie: state.loginUser.cookie,
    userId: state.loginUser.profile?.userId,
  }))

  const loadingRef = useRef(false)
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const fetchComments = useCallback(
    async (page: number) => {
      if (loadingRef.current) return
      loadingRef.current = true
      setLoading(true)
      const offset = (page - 1) * PAGE_SIZE
      try {
        const res: any = await getProgramComments(programId, offset, PAGE_SIZE, cookie)
        if (res.code === 200) {
          const allItems: any[] = [...(res.hotComments || []), ...(res.comments || [])]
          const map: Record<number, boolean> = {}
          const counts: Record<number, number> = {}
          allItems.forEach((c: any) => {
            if (c.liked) map[c.commentId] = true
            counts[c.commentId] = c.likedCount
          })
          setLikedMap(map)
          setLikeCounts(counts)
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
    [programId, cookie]
  )

  useEffect(() => {
    setComments([])
    setHotComments([])
    setTotal(0)
    setCurrentPage(1)
    setLikedMap({})
    setLikeCounts({})
    fetchComments(1)
  }, [programId, fetchComments])

  function handlePageChange(page: number) {
    if (page === currentPage || page < 1 || page > totalPages) return
    fetchComments(page)
  }

  async function handleSend() {
    const content = input.trim()
    if (!content || !cookie || sending) return
    setSending(true)
    setMsg("")
    try {
      await sendComment(programId, content, cookie)
      setInput("")
      setMsg("评论成功")
      setTimeout(() => {
        setMsg("")
        fetchComments(1)
      }, 1000)
    } catch {
      setMsg("评论失败")
    } finally {
      setSending(false)
    }
  }

  async function handleDelete(commentId: number) {
    if (!cookie) { toast.warning('请先登录'); return }
    setDeleting(commentId)
    setMsg("")
    try {
      await deleteComment(programId, commentId, cookie)
      setMsg("删除成功")
      setTimeout(() => {
        setMsg("")
        fetchComments(1)
      }, 1000)
    } catch {
      setMsg("删除失败")
    } finally {
      setDeleting(null)
    }
  }

  async function handleLike(commentId: number, liked: boolean, currentCount: number) {
    if (!cookie || likingSet.has(commentId)) return
    setLikingSet((prev) => new Set(prev).add(commentId))
    const t = liked ? 0 : 1
    const prevLiked = likedMap[commentId]
    const prevCount = likeCounts[commentId]
    setLikedMap((prev) => ({ ...prev, [commentId]: !liked }))
    setLikeCounts((prev) => ({ ...prev, [commentId]: liked ? Math.max(0, currentCount - 1) : currentCount + 1 }))
    try {
      await likeComment(programId, commentId, t, cookie)
    } catch {
      setLikedMap((prev) => ({ ...prev, [commentId]: prevLiked ?? liked }))
      setLikeCounts((prev) => ({ ...prev, [commentId]: prevCount ?? 0 }))
    } finally {
      setLikingSet((prev) => {
        const next = new Set(prev)
        next.delete(commentId)
        return next
      })
    }
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

      {cookie ? (
        <div className="comment-input">
          <textarea
            placeholder="发表评论..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <button
            className="send-btn"
            disabled={!input.trim() || sending}
            onClick={handleSend}
          >
            {sending ? "发送中..." : "发送"}
          </button>
        </div>
      ) : (
        <div className="comment-input">
          <textarea placeholder="登录后发表评论..." disabled />
          <button className="send-btn" disabled>发送</button>
        </div>
      )}

      {msg && (
        <div className={`comment-msg ${msg.includes("成功") ? "ok" : "err"}`}>
          {msg}
        </div>
      )}

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
                {cookie && (
                  <button
                    className={`like-btn ${likedMap[item.commentId] ? "liked" : ""}`}
                    disabled={likingSet.has(item.commentId)}
                    onClick={() => handleLike(item.commentId, likedMap[item.commentId], likeCounts[item.commentId] ?? item.likedCount)}
                  >
                    👍 {likeCounts[item.commentId] ?? item.likedCount}
                  </button>
                )}
              </div>
              {item.user.userId === userId && (
                <button
                  className="del-btn"
                  disabled={deleting === item.commentId}
                  onClick={() => handleDelete(item.commentId)}
                >
                  {deleting === item.commentId ? "..." : "×"}
                </button>
              )}
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
              {cookie && (
                <button
                  className={`like-btn ${likedMap[item.commentId] ? "liked" : ""}`}
                  disabled={likingSet.has(item.commentId)}
                  onClick={() => handleLike(item.commentId, likedMap[item.commentId], likeCounts[item.commentId] ?? item.likedCount)}
                >
                  <ThumbsUp className="w-3.5 h-3.5" /> {likeCounts[item.commentId] ?? item.likedCount}
                </button>
              )}
            </div>
            {item.user.userId === userId && (
              <button
                className="del-btn"
                disabled={deleting === item.commentId}
                onClick={() => handleDelete(item.commentId)}
              >
                {deleting === item.commentId ? "..." : "×"}
              </button>
            )}
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

export default memo(ProgramComment)
