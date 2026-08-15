
import {
  memo,
  useState,
  useEffect,
  useCallback,
  useRef
} from "react"

import {
  Link
} from "react-router-dom"

import type {
  FC
} from "react"

import {
  useAppDispatch,
  useAppSelector
} from "@/store"

import {
  fetchRecommendProgramAction
} from "./store/thunk"

import {
  playProgramAction
} from "@/views/player/store/player"

import ProgramRanking
  from "./c-cpns/program-ranking"

import MusicLoader from "@/components/music-loader"
import {
  DjRadioWrapper
} from "./style"

const BANNER_COUNT = 5
const AUTO_PLAY_MS = 4000

const DjRadio: FC = () => {

  const dispatch = useAppDispatch()

  const programs =
    useAppSelector(
      state => state.djradio.programs
    )

  /* ---------- data ---------- */
  useEffect(() => {
    dispatch(fetchRecommendProgramAction(20))
  }, [dispatch])

  const bannerPrograms = programs.slice(0, BANNER_COUNT)
  const gridPrograms  = programs.slice(BANNER_COUNT, BANNER_COUNT + 10)

  /* ---------- banner carousel ---------- */
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    stopTimer()
    if (bannerPrograms.length <= 1) return
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % bannerPrograms.length)
    }, AUTO_PLAY_MS)
  }, [bannerPrograms.length])

  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    startTimer()
    return stopTimer
  }, [startTimer, stopTimer])

  /* ---------- handlers ---------- */
  function handlePlay(e: React.MouseEvent, programId: number) {
    e.stopPropagation()
    dispatch(playProgramAction(programId))
  }

  function goToProgram(id: number) {
    window.location.hash = `#/discover/program/${id}`
  }

  function goToSlide(index: number) {
    setCurrent(index)
    startTimer()
  }

  if (programs.length === 0) {
    return (
      <DjRadioWrapper>
        <div className="flex items-center justify-center py-40">
          <MusicLoader />
        </div>
      </DjRadioWrapper>
    )
  }

  return (

    <DjRadioWrapper>

      {/* ========== ① 推荐节目 — Banner 轮播 ========== */}
      {
        bannerPrograms.length > 0 && (
          <section className="banner-section">

            <div className="section-header">
              <div className="header-left">
                <h3>推荐节目</h3>
              </div>
              <Link className="more-link" to="/discover/djradio/recommend">
                更多 &gt;
              </Link>
            </div>

            <div
              className="banner-carousel"
              onMouseEnter={stopTimer}
              onMouseLeave={startTimer}
            >
              <div
                className="banner-track"
                style={{
                  transform: `translateX(-${current * 100}%)`
                }}
              >
                {
                  bannerPrograms.map((item: any) => (
                    <div
                      className="banner-slide"
                      key={item.id}
                      onClick={() => goToProgram(item.id)}
                    >
                      <div className="slide-bg">
                        <img src={item.blurCoverUrl || item.coverUrl} alt="" />
                      </div>
                      <div className="slide-overlay" />

                      <div className="slide-content">
                        <div className="slide-cover">
                          <img src={item.coverUrl} alt="" />
                        </div>

                        <div className="slide-info">
                          <div className="slide-title">
                            {item.name}
                          </div>
                          <div className="slide-desc">
                            {item.radio?.name}
                            {item.dj?.nickname && ` · ${item.dj.nickname}`}
                          </div>
                          <button
                            className="slide-play-btn"
                            onClick={(e) => handlePlay(e, item.id)}
                          >
                            立即播放
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>

              {/* dots */}
              {
                bannerPrograms.length > 1 && (
                  <div className="banner-dots">
                    {
                      bannerPrograms.map((_: any, i: number) => (
                        <button
                          key={i}
                          className={`banner-dot${i === current ? " active" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            goToSlide(i)
                          }}
                        />
                      ))
                    }
                  </div>
                )
              }
            </div>

          </section>
        )
      }

      {/* ========== ② 精选节目 — 小卡片网格 ========== */}
      {
        gridPrograms.length > 0 && (
          <section className="recommend-section">

            <div className="sub-header">
              <span className="sub-header-title">精选节目</span>
            </div>

            <div className="card-grid">
              {
                gridPrograms.map((item: any) => (
                  <div
                    className="program-card"
                    key={item.id}
                    onClick={() => goToProgram(item.id)}
                  >
                    <div className="card-cover">
                      <img src={item.coverUrl} alt="" />
                      <i
                        className="card-play"
                        onClick={(e) => handlePlay(e, item.id)}
                      />
                    </div>
                    <div className="card-info">
                      <div className="card-title">
                        {item.name}
                      </div>
                      <div className="card-sub">
                        {item.radio?.name}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>

          </section>
        )
      }

      {/* ========== ③ 热门排行榜 ========== */}
      <section className="ranking-section">

        <div className="section-header">
          <div className="header-left">
            <h3>热门排行榜</h3>
            <span className="subtitle">实时热度</span>
          </div>
          <Link className="more-link" to="/discover/djradio/program-ranking">
            更多 &gt;
          </Link>
        </div>

        <ProgramRanking
          limit={10}
          showHeader={false}
        />

      </section>

    </DjRadioWrapper>
  )
}

export default memo(DjRadio)
