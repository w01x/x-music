import MusicLoader from '@/components/music-loader'

import { memo } from "react"
import type { FC } from "react"
import { SidebarWrapper } from "./style"
import { getImageSize } from "@/utils/format"

interface IProps {
  programs: any[]
  loading?: boolean
}

const ProgramSidebar: FC<IProps> = ({ programs, loading }) => {
  const currentProgram = programs.length > 0 ? programs[0] : null

  return (
    <SidebarWrapper>
      <div className="section-title">电台节目</div>

      {loading ? (
        <div className="empty"><MusicLoader /></div>
      ) : programs.length > 0 ? (
        <div className="program-list">
          {programs.map((p: any) => (
            <a
              key={p.id}
              className="program-item"
              href={`#/discover/program/${p.id}`}
            >
              <img
                src={getImageSize(p.coverUrl, 50)}
                alt={p.name}
              />
              <div className="info">
                <div className="name">{p.name}</div>
                <div className="dj">
                  {p.dj?.nickname || "未知主播"}
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="empty">暂无节目</div>
      )}
    </SidebarWrapper>
  )
}

export default memo(ProgramSidebar)
