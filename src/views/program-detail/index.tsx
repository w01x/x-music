import MusicLoader from '@/components/music-loader'
import { memo, useEffect, useState } from "react"
import type { FC } from "react"
import { useParams } from "react-router-dom"
import ProgramInfo from "./c-cpns/program-info"
import ProgramComment from "./c-cpns/program-comment"
import ProgramSidebar from "./c-cpns/program-sidebar"
import { getProgramDetail, getRadioPrograms } from "./service"
import { ProgramDetailWrapper } from "./style"

const ProgramDetail: FC = () => {
  const { id } = useParams<{ id: string }>()
  const programId = Number(id)

  const [program, setProgram] = useState<any>(null)
  const [radioPrograms, setRadioPrograms] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id || isNaN(programId)) return

    setLoading(true)
    setProgram(null)
    setRadioPrograms([])

    const fetchData = async () => {
      try {
        const res: any = await getProgramDetail(programId)
        const p = res.program
        if (p) {
          setProgram(p)

          const radioId = p.radio?.id
          if (radioId) {
            getRadioPrograms(radioId, 20)
              .then((listRes: any) => {
                const list = (listRes.programs || [])
                  .filter((item: any) => item.id !== p.id)
                  .slice(0, 10)
                setRadioPrograms(list)
              })
              .catch((err) => {
                console.error("Failed to fetch radio programs:", err)
              })
          }
        }
      } catch (err) {
        console.error("Failed to fetch program detail:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, programId])

  return (
    <ProgramDetailWrapper>
      <div className="main">
        {loading && !program ? (
          <div className="loading-placeholder"><MusicLoader /></div>
        ) : (
          <>
            <ProgramInfo program={program} loading={loading} />
            <ProgramComment programId={programId} />
          </>
        )}
      </div>

      <div className="sidebar">
        <ProgramSidebar programs={radioPrograms} loading={loading} />
      </div>
    </ProgramDetailWrapper>
  )
}

export default memo(ProgramDetail)
