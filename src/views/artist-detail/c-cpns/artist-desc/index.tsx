import { memo } from 'react'

import type { FC } from 'react'

import { ArtistDescWrapper } from './style'

interface IProps {
  desc: {
    introduction: any[]
    briefDesc: string
  } | null
}

const ArtistDesc: FC<IProps> = ({ desc }) => {
  if (!desc) return <ArtistDescWrapper><p className="empty">暂无简介</p></ArtistDescWrapper>

  return (
    <ArtistDescWrapper>
      {desc.briefDesc && <p className="brief-desc">{desc.briefDesc}</p>}
      {desc.introduction?.length > 0 ? (
        <ul className="intro-list">
          {desc.introduction.map((item, index) => (
            <li key={index} className="intro-item">
              <h4 className="intro-title">{item.ti}</h4>
              <p className="intro-text">{item.txt}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty">暂无简介</p>
      )}
    </ArtistDescWrapper>
  )
}

export default memo(ArtistDesc)
