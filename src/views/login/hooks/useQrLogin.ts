import { useEffect, useRef, useState } from "react"
import { loginService } from "../service"
import { useDispatch } from "react-redux"
import { setLogin } from "../store/userSlice"
import { cleanCookie } from "@/utils/format"

export type LoginStatus = "idle" | "loading" | "waiting" | "scanned" | "success" | "expired" | "error"

export interface UseQrLoginReturn {
  qrImg: string
  status: LoginStatus
  error: string | null
  start: () => void
  reset: () => void
}

export const useQrLogin = (): UseQrLoginReturn => {
  const dispatch = useDispatch()

  const [qrImg, setQrImg] = useState("")
  const [status, setStatus] = useState<LoginStatus>("idle")
  const [error, setError] = useState<string | null>(null)

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const refreshRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const currentKeyRef = useRef("")
  const runningRef = useRef(false)

  const clearPoll = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }

  const clearRefresh = () => {
    if (refreshRef.current) {
      clearTimeout(refreshRef.current)
      refreshRef.current = null
    }
  }

  const stopAll = () => {
    clearPoll()
    clearRefresh()
    runningRef.current = false
  }

  const createQrFlow = async () => {
    try {
      const key = await loginService.getKey()
      if (!key) {
        throw new Error("获取二维码Key失败")
      }
      currentKeyRef.current = key

      const qr = await loginService.createQr(key)
      if (!qr) {
        throw new Error("生成二维码失败")
      }
      setQrImg(qr)
      setStatus("waiting")
      setError(null)

      startPolling(key)
      scheduleRefresh()
    } catch (err) {
      console.error("[QR] 创建二维码流程失败:", err)
      setStatus("error")
      setError(err instanceof Error ? err.message : "创建二维码失败")
      runningRef.current = false
    }
  }

  const startPolling = (key: string) => {
    clearPoll()

    pollRef.current = setInterval(async () => {
      try {
        const res = await loginService.check(key)
        const code = Number(res.code)

        if (code === 800) {
          // 二维码失效
          setStatus("expired")
          stopAll()
        } else if (code === 801) {
          // 等待扫码
          setStatus("waiting")
        } else if (code === 802) {
          // 已扫码，等待确认
          setStatus("scanned")
          clearRefresh()
        } else if (code === 803) {
          // 登录成功
          stopAll()
          setStatus("success")

          const profile = res.profile || res

          // 先保存基础信息，不阻塞 UI
          const cleanCookieStr = cleanCookie(res.cookie)
          const basicData = {
            cookie: cleanCookieStr,
            profile,
            userId: profile?.userId,
            nickname: profile?.nickname,
            avatarUrl: profile?.avatarUrl,
          }
          localStorage.setItem("user", JSON.stringify(basicData))
          dispatch(setLogin({ profile, cookie: cleanCookieStr }))

          // 后台补全用户详情（头像等）
          loginService.status(cleanCookieStr)
            .then((detail) => {
              const full = detail?.data?.profile || detail?.profile
              if (full?.userId) {
                const data = {
                  cookie: cleanCookieStr,
                  profile: full,
                  userId: full.userId,
                  nickname: full.nickname,
                  avatarUrl: full.avatarUrl,
                }
                localStorage.setItem("user", JSON.stringify(data))
                dispatch(setLogin({ profile: full, cookie: cleanCookieStr }))
              }
            })
            .catch((e) => console.error('[QR] 补全用户信息失败:', e))
        }
      } catch (err) {
        console.error("[QR] 轮询失败:", err)
        if (runningRef.current) {
          setError(err instanceof Error ? err.message : "轮询失败")
        }
      }
    }, 1000)
  }

  const scheduleRefresh = () => {
    clearRefresh()

    refreshRef.current = setTimeout(() => {
      clearPoll()
      createQrFlow()
    }, 30000)
  }

  const start = async () => {
    if (runningRef.current) return
    runningRef.current = true

    setStatus("loading")
    setError(null)

    await createQrFlow()
  }

  const reset = () => {
    stopAll()
    setQrImg("")
    setStatus("idle")
    setError(null)
  }

  useEffect(() => {
    return () => stopAll()
  }, [])

  return {
    qrImg,
    status,
    error,
    start,
    reset,
  }
}
