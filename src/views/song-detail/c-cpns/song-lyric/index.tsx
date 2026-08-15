import { memo, useEffect, useRef } from "react"
import type { FC } from "react"
import { SongLyricWrapper } from "./style"

interface IProps {
  lyrics: { time: number; text: string }[]
  lyricIndex: number
  isPlaying: boolean
  onLyricClick?: (timeMs: number) => void
}

const SongLyric: FC<IProps> = ({ lyrics, lyricIndex, isPlaying, onLyricClick }) => {
  const activeRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (activeRef.current && isPlaying) {
      activeRef.current.scrollIntoView({ block: "center", behavior: "smooth" })
    }
  }, [lyricIndex, isPlaying])

  return (
    <SongLyricWrapper>
      <div className="lyric-header">
        <h3>歌词</h3>
      </div>

      {lyrics.length === 0 ? (
        <div className="no-lyric">暂无歌词</div>
      ) : (
        <div className="lyric-lines">
          {lyrics.map((line, i) => (
            <p
              key={i}
              ref={i === lyricIndex ? activeRef : undefined}
              className={`lyric-line ${i === lyricIndex ? "active" : ""} ${onLyricClick ? "clickable" : ""}`}
              onClick={() => onLyricClick?.(line.time)}
            >
              {line.text}
            </p>
          ))}
        </div>
      )}
    </SongLyricWrapper>
  )
}

export default memo(SongLyric)
