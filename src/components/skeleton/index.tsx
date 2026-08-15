import { memo } from 'react'

/* ── 核心 Skeleton 基元 ─────────────────────────────────── */

interface SkeletonProps {
  /** 宽度，默认 100% */
  width?: number | string
  /** 高度 px，默认 16 */
  height?: number
  /** 圆角 px，默认 10 */
  radius?: number
  className?: string
  style?: React.CSSProperties
}

/** 通用骨架条 — 深色主题 Shimmer + 呼吸 */
const Skeleton = memo(
  ({ width = '100%', height = 16, radius = 10, className = '', style }: SkeletonProps) => (
    <span
      className={`block shrink-0 ${className}`}
      style={{
        width: typeof width === 'number' ? width : String(width),
        height,
        borderRadius: radius,
        background:
          'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.07) 35%, rgba(255,255,255,0.03) 70%)',
        backgroundSize: '200% 100%',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.02), 0 0 0 1px rgba(255,255,255,0.015)',
        backdropFilter: 'blur(1px)',
        animation: 'sk-shimmer 1.8s ease-in-out infinite, sk-breathe 3s ease-in-out infinite',
        willChange: 'background-position, opacity',
        ...style,
      }}
    />
  )
)

Skeleton.displayName = 'Skeleton'

/* ── 复合骨架模式 ────────────────────────────────────────── */

/** 图文卡片骨架（歌单 / 专辑） */
const CardSkeleton = memo(() => (
  <div className="flex flex-col gap-3 w-full">
    {/* 封面图 */}
    <div style={{ width: '100%', paddingBottom: '100%', position: 'relative' }}>
      <span
        className="block absolute inset-0 rounded-[14px]"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.07) 35%, rgba(255,255,255,0.03) 70%)',
          backgroundSize: '200% 100%',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02), 0 0 0 1px rgba(255,255,255,0.015)',
          animation: 'sk-shimmer 1.8s ease-in-out infinite, sk-breathe 3s ease-in-out infinite',
        }}
      />
    </div>
    {/* 标题 */}
    <Skeleton width="80%" height={16} radius={10} />
    {/* 作者 */}
    <Skeleton width="48%" height={12} radius={8} />
  </div>
))

CardSkeleton.displayName = 'CardSkeleton'

/** 多卡片网格骨架 */
interface GridProps {
  /** 列数，默认 6 */
  cols?: number
  /** 行数，默认 1 */
  rows?: number
}

const CardGridSkeleton = memo(({ cols = 6, rows = 1 }: GridProps) => {
  const items = Array.from({ length: cols * rows })
  return (
    <div
      className="grid gap-5"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {items.map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
})

CardGridSkeleton.displayName = 'CardGridSkeleton'

/** 歌曲行骨架 */
const SongRowSkeleton = memo(() => (
  <div className="flex items-center gap-3 h-[50px] px-2">
    {/* 序号 */}
    <Skeleton width={24} height={14} radius={6} />
    {/* 封面 */}
    <Skeleton width={36} height={36} radius={10} />
    {/* 歌名 */}
    <div className="flex-1 flex flex-col gap-1.5">
      <Skeleton width="65%" height={14} radius={8} />
      <Skeleton width="35%" height={11} radius={6} />
    </div>
    {/* 专辑 */}
    <Skeleton width={100} height={13} radius={8} />
    {/* 时长 */}
    <Skeleton width={40} height={13} radius={8} />
  </div>
))

SongRowSkeleton.displayName = 'SongRowSkeleton'

/** 歌曲列表骨架 */
interface RowsProps {
  rows?: number
}

const SongListSkeleton = memo(({ rows = 10 }: RowsProps) => (
  <div className="flex flex-col gap-px">
    {Array.from({ length: rows }, (_, i) => (
      <SongRowSkeleton key={i} />
    ))}
  </div>
))

SongListSkeleton.displayName = 'SongListSkeleton'

/** 歌手卡片骨架 — 圆形头像 + 姓名 */
const ArtistCardSkeleton = memo(() => (
  <div className="flex flex-col items-center gap-3">
    <Skeleton width={104} height={104} radius={52} />
    <Skeleton width="65%" height={14} radius={8} />
    <Skeleton width="40%" height={11} radius={6} />
  </div>
))

ArtistCardSkeleton.displayName = 'ArtistCardSkeleton'

/** 歌手卡片网格骨架 */
interface ArtistGridProps {
  cols?: number
  rows?: number
}

const ArtistGridSkeleton = memo(({ cols = 5, rows = 1 }: ArtistGridProps) => {
  const items = Array.from({ length: cols * rows })
  return (
    <div
      className="grid justify-center"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '32px 24px' }}
    >
      {items.map((_, i) => (
        <ArtistCardSkeleton key={i} />
      ))}
    </div>
  )
})

ArtistGridSkeleton.displayName = 'ArtistGridSkeleton'

/** 横向小条骨架（Loading 占位） */
const BarSkeleton = memo(() => (
  <div className="flex items-center justify-center gap-1.5 h-7">
    <Skeleton width={48} height={8} radius={6} />
    <Skeleton width={32} height={8} radius={6} />
    <Skeleton width={40} height={8} radius={6} />
    <Skeleton width={24} height={8} radius={6} />
    <Skeleton width={36} height={8} radius={6} />
  </div>
))

BarSkeleton.displayName = 'BarSkeleton'

/* ── 全局动画定义 ────────────────────────────────────────── */

export const skeletonStyles = `
  @keyframes sk-shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  @keyframes sk-breathe {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.92; }
  }
`

/* ── 导出 ────────────────────────────────────────────────── */

export {
  ArtistCardSkeleton,
  ArtistGridSkeleton,
  CardSkeleton,
  CardGridSkeleton,
  SongRowSkeleton,
  SongListSkeleton,
  BarSkeleton,
}
export default Skeleton
