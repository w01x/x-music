import { useState, useRef, useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setLogin } from "../store/userSlice"
import { sendCaptcha, cellphoneLogin } from "../service/phone"
import { loginService } from "../service"
import { cleanCookie } from "@/utils/format"

export type PhoneLoginStatus =
  | "idle"
  | "sendingCode"
  | "codeSent"
  | "logging"
  | "success"
  | "error"

export interface UsePhoneLoginReturn {
  phone: string
  setPhone: (v: string) => void
  captcha: string
  setCaptcha: (v: string) => void
  status: PhoneLoginStatus
  error: string | null
  countdown: number
  sendCode: () => void
  login: () => void
  reset: () => void
}

export const usePhoneLogin = (): UsePhoneLoginReturn => {
  const dispatch = useDispatch()

  const [phone, setPhone] = useState("")
  const [captcha, setCaptcha] = useState("")
  const [status, setStatus] = useState<PhoneLoginStatus>("idle")
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(0)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => clearTimer()
  }, [clearTimer])

  /* 发送验证码 */
  const sendCode = useCallback(async () => {
    if (!/^1\d{10}$/.test(phone)) {
      setError("请输入正确的手机号")
      return
    }
    if (countdown > 0) return

    setStatus("sendingCode")
    setError(null)

    try {
      const res = await sendCaptcha(phone)
      setStatus("codeSent")
      setCountdown(60)
      timerRef.current = setInterval(() => {
        setCountdown((n) => {
          if (n <= 1) {
            clearTimer()
            return 0
          }
          return n - 1
        })
      }, 1000)
    } catch (err: any) {
      console.error('[Phone] 发送验证码失败:', err)
      setStatus("error")
      setError(err?.message || "发送验证码失败")
    }
  }, [phone, countdown, clearTimer])

  /* 登录 */
  const login = useCallback(async () => {
    if (!/^1\d{10}$/.test(phone)) {
      setError("请输入正确的手机号")
      return
    }
    if (!captcha) {
      setError("请输入验证码")
      return
    }

    setStatus("logging")
    setError(null)

    try {
      const res = await cellphoneLogin({
        phone,
        captcha,
      })

      if (res.code === 200) {
        setStatus("success")

        const profile = res.profile || res.account || res

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
          .catch((e) => console.error('[Phone] 补全用户信息失败:', e))
      } else {
        setStatus("error")
        setError(res.message || "登录失败")
      }
    } catch (err: any) {
      console.error('[Phone] 登录失败:', err)
      setStatus("error")
      setError(err?.message || "登录失败，请重试")
    }
  }, [phone, captcha, dispatch])

  const reset = useCallback(() => {
    clearTimer()
    setPhone("")
    setCaptcha("")
    setStatus("idle")
    setError(null)
    setCountdown(0)
  }, [clearTimer])

  return {
    phone, setPhone,
    captcha, setCaptcha,
    status, error, countdown,
    sendCode, login, reset
  }
}
