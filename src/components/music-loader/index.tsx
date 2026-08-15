import { memo } from 'react'

/** 音乐均衡器风格加载动画 */
const MusicLoader = memo(() => (
  <div className="flex items-center justify-center gap-1 h-16">
    {[0.75, 0.45, 0.9, 0.55, 1.0, 0.35].map((scale, i) => (
      <div
        key={i}
        className="w-1.5 rounded-full bg-[#FF4D4F]/30"
        style={{
          height: 16,
          animation: `eq 0.8s ease-in-out infinite`,
          animationDelay: `${i * 0.12}s`,
          '--scale': scale,
        } as React.CSSProperties}
      />
    ))}
    <style>{`@keyframes eq{0%,100%{transform:scaleY(0.3);opacity:0.4}50%{transform:scaleY(var(--scale));opacity:1}}`}</style>
  </div>
))

MusicLoader.displayName = 'MusicLoader'

export default MusicLoader
