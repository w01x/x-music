import MusicLoader from '@/components/music-loader'

import { memo, useEffect, useState, useRef, useCallback } from "react"
import type { FC } from "react"
import { CommentWrapper } from "./style"
import { ThumbsUp, X } from "lucide-react"
import { getSongComments, getFloorComments, likeComment, sendComment, deleteComment } from "../../service"
import { toast } from '@/utils/toast'
import { getImageSize, formatRelativeTime } from "@/utils/format"
import { useAppSelector } from "@/store"

interface IUser {
  userId: number
  nickname: string
  avatarUrl: string
}

interface IBeReplied {
  user: IUser
  content: string
}

interface IComment {
  commentId: number
  content: string
  time: number
  user: IUser
  likedCount: number
  beReplied?: IBeReplied[]
  showFloorCount: number
  parentCommentId: number
}

interface IFloorState {
  comments: IComment[]
  loading: boolean
  hasMore: boolean
  time: number
}

interface IProps {
  songId: number
}

const PAGE_SIZE = 20
const FLOOR_PAGE_SIZE = 5
const SongComment: FC<IProps> = ({ songId }) => {
  const [hotComments, setHotComments] = useState<IComment[]>([])
  const [comments, setComments] = useState<IComment[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({})
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({})
  const [likingSet, setLikingSet] = useState<Set<number>>(new Set())

  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [replyingTo, setReplyingTo] = useState<{ commentId: number; nickname: string } | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [msg, setMsg] = useState("")

  const [floorMap, setFloorMap] = useState<Record<number, IFloorState>>({})

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
        const res: any = await getSongComments(songId, offset, PAGE_SIZE, cookie)
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
    [songId, cookie]
  )

  useEffect(() => {
    setComments([])
    setHotComments([])
    setTotal(0)
    setCurrentPage(1)
    setLikedMap({})
    setLikeCounts({})
    setFloorMap({})
    fetchComments(1)
  }, [songId, fetchComments])

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
      await sendComment(0, songId, content, cookie, replyingTo?.commentId)
      setInput("")
      setReplyingTo(null)
      setMsg(replyingTo ? "回复成功" : "评论成功")
      setTimeout(() => {
        setMsg("")
        fetchComments(1)
      }, 1000)
    } catch {
      setMsg(replyingTo ? "回复失败" : "评论失败")
    } finally {
      setSending(false)
    }
  }

  async function handleDelete(commentId: number) {
    if (!cookie) { toast.warning('请先登录'); return }
    setDeleting(commentId)
    setMsg("")
    try {
      await deleteComment(0, songId, commentId, cookie)
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
      const res: any = await likeComment(songId, commentId, t, 0, cookie)
    } catch (err: any) {
      console.error("[handleLike] 失败:", err?.response || err)
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

  async function handleLoadFloors(parentCommentId: number) {
    const current = floorMap[parentCommentId]
    if (current?.loading) return

    const cursor = current?.time ?? 0

    setFloorMap((prev) => ({
      ...prev,
      [parentCommentId]: {
        comments: current?.comments || [],
        loading: true,
        hasMore: current?.hasMore ?? true,
        time: cursor,
      },
    }))

    try {
      const res: any = await getFloorComments(parentCommentId, songId, 0, FLOOR_PAGE_SIZE, cursor, cookie)
      if (res.code === 200) {
        const data = res.data
        const newComments = data.comments || []
        setFloorMap((prev) => ({
          ...prev,
          [parentCommentId]: {
            comments: [...((prev[parentCommentId]?.comments) || []), ...newComments],
            loading: false,
            hasMore: data.hasMore ?? false,
            time: data.time ?? 0,
          },
        }))
      }
    } catch (err) {
      console.error("加载楼层评论失败:", err)
      setFloorMap((prev) => ({
        ...prev,
        [parentCommentId]: {
          ...prev[parentCommentId],
          loading: false,
        },
      }))
    }
  }

  useEffect(() => {
    comments.forEach((c) => {
      if (c.showFloorCount > 0 && !floorMap[c.commentId]) {
        handleLoadFloors(c.commentId)
      }
    })
  }, [comments])

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

  function renderFloorReply(comment: IComment, isFloor: boolean) {
    return (
      <div className={`comment-item ${isFloor ? "floor-item" : ""}`} key={comment.commentId}>
        <img
          className="avatar"
          src={getImageSize(comment.user.avatarUrl, 40)}
          alt=""
        />
        <div className="content">
          <div className="meta">
            <span className="nickname">{comment.user.nickname}</span>
            <span className="time">{formatRelativeTime(comment.time)}</span>
            {cookie && (
              <button
                className={`like-btn ${likedMap[comment.commentId] ? "liked" : ""}`}
                disabled={likingSet.has(comment.commentId)}
                onClick={() => handleLike(comment.commentId, likedMap[comment.commentId], likeCounts[comment.commentId] ?? comment.likedCount)}
              >
                <ThumbsUp className="w-3.5 h-3.5" /> {likeCounts[comment.commentId] ?? comment.likedCount}
              </button>
            )}
          </div>

          {cookie && (
            <div className="actions-row">
              <button
                className="reply-btn"
                onClick={() => setReplyingTo({ commentId: comment.commentId, nickname: comment.user.nickname })}
              >
                回复
              </button>
            </div>
          )}

          {comment.beReplied && comment.beReplied.length > 0 && (
            <div className="be-replied">
              <span className="reply-target">@{comment.beReplied[0].user.nickname}:</span>
              <span className="reply-text">{comment.beReplied[0].content}</span>
            </div>
          )}

          <div className="text">{comment.content}</div>
          <div className="comment-divider" />
        </div>
        {comment.user.userId === userId && (
          <button
            className="del-btn"
            disabled={deleting === comment.commentId}
            onClick={() => handleDelete(comment.commentId)}
          >
            {deleting === comment.commentId ? "..." : <X className="w-4 h-4" />}
          </button>
        )}
      </div>
    )
  }

  function renderCommentItem(item: IComment) {
    const floorState = floorMap[item.commentId]
    const floorComments = floorState?.comments || []
    const floorTotal = item.showFloorCount
    const loadedCount = floorComments.length
    const remaining = floorTotal - loadedCount

    return (
      <div key={item.commentId}>
        {renderFloorReply(item, false)}

        {floorComments.length > 0 && (
          <div className="floor-replies">
            {floorComments.map((f) => renderFloorReply(f, true))}

            {remaining > 0 && (
              <button
                className="load-more-floors"
                disabled={floorState?.loading}
                onClick={() => handleLoadFloors(item.commentId)}
              >
                {floorState?.loading ? <MusicLoader /> : `展开更多${remaining}条回复`}
              </button>
            )}
          </div>
        )}
      </div>
    )
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
            placeholder={replyingTo ? `回复 @${replyingTo.nickname}...` : "发表评论..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <div className="send-area">
            {replyingTo && (
              <span
                className="cancel-reply"
                onClick={() => { setReplyingTo(null); setInput("") }}
              >
                取消回复
              </span>
            )}
            <button
              className="send-btn"
              disabled={!input.trim() || sending}
              onClick={handleSend}
            >
              {sending ? "发送中..." : "发送"}
            </button>
          </div>
        </div>
      ) : (
        <div className="comment-input">
          <textarea placeholder="登录后发表评论..." disabled />
          <div className="send-area">
            <button className="send-btn" disabled>发送</button>
          </div>
        </div>
      )}

      {msg && (
        <div className={`comment-msg ${msg.includes("成功") ? "ok" : "err"}`}>
          {msg}
        </div>
      )}

      <div className="comment-scroll">
        {hotComments.length > 0 && (
          <div className="hot-comments">
            <h4>精彩评论</h4>
            {hotComments.map((item) => renderCommentItem(item))}
          </div>
        )}

        <div className="latest-comments">
          {hotComments.length > 0 && <h4>最新评论</h4>}
          {comments.map((item) => renderCommentItem(item))}
        </div>
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

export default memo(SongComment)
