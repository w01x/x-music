
import { memo, useState } from 'react'
import type { FC } from 'react'
import { toast } from '@/utils/toast'
import type { IArtist } from '../../types'
import { useAppSelector } from '@/store'
import { subscribeArtist } from '../../service/artist-detail'
import { ArtistHeaderWrapper } from './style'

interface IProps {
  detail: IArtist | null
}

const ArtistHeader: FC<IProps> = ({ detail }) => {
  const { cookie } = useAppSelector((s) => ({ cookie: s.loginUser.cookie }))
  const [followed, setFollowed] = useState(detail?.followed ?? false)
  const [loading, setLoading] = useState(false)

  if (!detail) return null

  async function handleFollow() {
    if (!cookie) { toast.warning('请先登录'); return }
    if (loading) return
    setLoading(true)
    const t = followed ? 0 : 1
    try {
      await subscribeArtist(detail.id, t, cookie)
      setFollowed(!followed)
      toast.success(t ? '已收藏' : '已取消收藏')
    } catch {
      toast.error('操作失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ArtistHeaderWrapper>
      <div className="avatar">
        <img src={detail.picUrl} alt={detail.name} />
      </div>
      <div className="info">
        <h2 className="name">{detail.name}</h2>
        {detail.alias?.length > 0 && (
          <p className="alias">{detail.alias.join(' / ')}</p>
        )}
        <div className="stats">
          <span>单曲：{detail.musicSize}</span>
          <span>专辑：{detail.albumSize}</span>
          <span>MV：{detail.mvSize}</span>
        </div>
        <div className="actions">
          <button className="btn-follow" onClick={handleFollow} disabled={loading}>
            {loading ? '...' : followed ? '已收藏' : '收藏'}
          </button>
        </div>
      </div>
    </ArtistHeaderWrapper>
  )
}

export default memo(ArtistHeader)
