import React, { memo, useEffect, useState } from "react"
import { Pagination } from "antd"
import { useSearchParams } from "react-router-dom"

import SongsHeader from "./c-cpns/songs-header"
import SongsBanner from "./c-cpns/songs-banner"
import SongsList from "./c-cpns/songs-list"
import Skeleton, { CardGridSkeleton, skeletonStyles } from "@/components/skeleton"
import { getTopPlaylist } from "./service/songs"
import { SongsWrapper, Content, PaginationWrapper } from "./style"

const Songs = memo(function Songs() {
  const [searchParams] = useSearchParams()
  const [currentCat, setCurrentCat] = useState(searchParams.get("cat") || "全部")
  const [playlists, setPlaylists] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const pageSize = 36

  useEffect(() => {
    setLoading(true)
    const offset = (currentPage - 1) * pageSize

    getTopPlaylist({
      cat: currentCat,
      limit: pageSize,
      offset
    }).then((res: any) => {
      setPlaylists(res.playlists)
      setTotal(res.total)
    }).finally(() => setLoading(false))
  }, [currentCat, currentPage])

  const handleCatChange = (cat: string) => {
    setCurrentCat(cat)
    setCurrentPage(1)
  }

  return (
    <SongsWrapper>
      <style>{skeletonStyles}</style>
      <Content>
        <SongsHeader
          currentCat={currentCat}
          onCatChange={handleCatChange}
        />

        {loading ? (
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-7 rounded-3xl border border-white/[0.04] bg-white/[0.02] backdrop-blur-[1px] px-8 py-8" style={{ minHeight: 270 }}>
              <Skeleton width={160} height={160} radius={20} />
              <div className="flex flex-col gap-3 flex-1">
                <Skeleton width="25%" height={13} radius={8} />
                <Skeleton width="60%" height={28} radius={12} />
                <Skeleton width="45%" height={14} radius={8} />
                <div className="mt-3"><Skeleton width={100} height={40} radius={24} /></div>
              </div>
            </div>
            <CardGridSkeleton cols={6} rows={2} />
          </div>
        ) : (
          <>
            <SongsBanner playlists={playlists} />
            <SongsList playlists={playlists} />
          </>
        )}

        <PaginationWrapper>
          <Pagination
            current={currentPage}
            total={total}
            pageSize={pageSize}
            showSizeChanger={false}
            onChange={setCurrentPage}
          />
        </PaginationWrapper>
      </Content>
    </SongsWrapper>
  )
})

export default Songs
