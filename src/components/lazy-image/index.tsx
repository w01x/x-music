import { memo, useState } from 'react'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** 占位背景色，默认灰色 */
  placeholderBg?: string
}

const LazyImage = memo(({ placeholderBg = '#1F2230', className, style, onLoad, ...rest }: Props) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block', ...style }} className={className}>
      {/* 占位 */}
      {!loaded && (
        <div
          className="animate-pulse"
          style={{
            position: 'absolute',
            inset: 0,
            background: placeholderBg,
            borderRadius: 'inherit',
          }}
        />
      )}
      {/* 图片 */}
      <img
        {...rest}
        onLoad={e => {
          setLoaded(true)
          onLoad?.(e)
        }}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
          borderRadius: 'inherit',
          ...rest.style,
        }}
      />
    </div>
  )
})

LazyImage.displayName = 'LazyImage'

export default LazyImage
