import React, { memo, useEffect, useState } from "react"
import { Pagination } from "antd"

import AlbumHeader from "./c-cpns/album-header"
import AlbumList from "./c-cpns/album-list"
import MusicLoader from "@/components/music-loader"
import { getNewAlbums } from "./service/album"
import { AlbumWrapper, Content, PaginationWrapper } from "./style"

const Songs = memo(function Songs() {
  const [currentCat, setCurrentCat] = useState("ALL")
  const [playlists, setPlaylists] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const pageSize = 35

  useEffect(() => {
    setLoading(true)
    const offset = (currentPage - 1) * pageSize

    getNewAlbums({
      limit: pageSize,
      offset,
      area: currentCat as any
    }).then((res: any) => {
      setPlaylists(res.albums || [])
      setTotal(res.total || 0)
    }).catch((err: any) => {
      console.error("获取新碟失败:", err)
    }).finally(() => setLoading(false))
  }, [currentPage, currentCat])

  const handleCatChange = (cat: string) => {
    setCurrentCat(cat)
    setCurrentPage(1)
  }

  return (
    <AlbumWrapper>
      <Content>
        <AlbumHeader
          currentCat={currentCat}
          onCatChange={handleCatChange}
        />

        {loading ? (
          <div className="flex items-center justify-center py-40">
            <MusicLoader />
          </div>
        ) : (
          <>
            <AlbumList playlists={playlists} />

            <PaginationWrapper>
              <Pagination
                current={currentPage}
                total={total}
                pageSize={pageSize}
                showSizeChanger={false}
                onChange={setCurrentPage}
              />
            </PaginationWrapper>
          </>
        )}
      </Content>
    </AlbumWrapper>
  )
})

export default Songs
