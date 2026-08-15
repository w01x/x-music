
import { memo, useEffect, useState } from "react"
import type { FC } from "react"
import { useNavigate } from "react-router-dom"
import { useQrLogin } from "./hooks/useQrLogin"
import { usePhoneLogin } from "./hooks/usePhoneLogin"
import { useAppSelector, useAppDispatch, shallowEqualApp } from "@/store"
import { initUser } from "./store/userSlice"
import {
  LoginWrapper,
  LoginCard,
  Title,
  TabBar,
  QrWrapper,
  ScanOverlay,
  StatusText,
  HintText,
  ActionButton,
  SpinnerWrapper,
  PhoneForm,
  PhoneInput,
  CaptchaRow,
  ErrorText,
} from "./style"

const QR_STATUS_MAP: Record<string, string> = {
  idle: "点击下方按钮获取二维码",
  loading: "正在获取二维码...",
  waiting: "请使用网易云音乐 App 扫码",
  scanned: "已扫码，请在手机上确认登录",
  success: "登录成功",
  expired: "二维码已过期，请重新获取",
  error: "网络错误",
}

const LoginContent: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const qr = useQrLogin()
  const phone = usePhoneLogin()

  const [tab, setTab] = useState<"qr" | "phone">("qr")
  const isLoggedIn = useAppSelector((state) => state.loginUser.isLoggedIn, shallowEqualApp)

  /* 初始化登录态 */
  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  /* QR 登录成功跳转 */
  useEffect(() => {
    if (qr.status === "success" || phone.status === "success") {
      const timer = setTimeout(() => navigate("/"), 500)
      return () => clearTimeout(timer)
    }
  }, [qr.status, phone.status, navigate])

  /* 已登录跳转 */
  useEffect(() => {
    if (isLoggedIn) navigate("/")
  }, [isLoggedIn, navigate])

  /* 切换 tab 时重置 */
  const handleTabChange = (t: "qr" | "phone") => {
    setTab(t)
    if (t === "qr") phone.reset()
    else qr.reset()
  }

  /* QR 按钮文案 */
  const qrBtnText = () => {
    if (qr.status === "idle") return "获取二维码"
    if (qr.status === "expired" || qr.status === "error") return "重新获取"
    return "刷新二维码"
  }
  const showQrBtn = qr.status !== "loading" && qr.status !== "success"

  return (
    <LoginWrapper>
      <LoginCard>
        <Title>网易云音乐</Title>

        <TabBar>
          <button
            className={`tab ${tab === "qr" ? "active" : ""}`}
            onClick={() => handleTabChange("qr")}
          >
            扫码登录
          </button>
          <button
            className={`tab ${tab === "phone" ? "active" : ""}`}
            onClick={() => handleTabChange("phone")}
          >
            手机登录
          </button>
        </TabBar>

        {/* ========== 扫码登录 ========== */}
        {tab === "qr" && (
          <>
            <QrWrapper>
              {qr.status === "loading" && (
                <SpinnerWrapper>
                  <div className="spinner" />
                  <span>正在获取二维码...</span>
                </SpinnerWrapper>
              )}

              {qr.qrImg && qr.status !== "loading" && (
                <>
                  <img src={qr.qrImg} alt="登录二维码" />
                  {qr.status === "scanned" && (
                    <ScanOverlay>
                      <div className="check-icon" />
                      <span>已扫码，请确认</span>
                    </ScanOverlay>
                  )}
                </>
              )}

              {!qr.qrImg && qr.status !== "loading" && (
                <div className="qr-placeholder" />
              )}
            </QrWrapper>

            <StatusText $status={qr.status}>
              {qr.error || QR_STATUS_MAP[qr.status]}
            </StatusText>

            {showQrBtn && (
              <ActionButton onClick={() => { qr.reset(); qr.start() }}>
                {qrBtnText()}
              </ActionButton>
            )}

            <HintText>使用网易云音乐 App 扫码登录</HintText>
          </>
        )}

        {/* ========== 手机登录 ========== */}
        {tab === "phone" && (
          <PhoneForm onSubmit={(e) => { e.preventDefault(); phone.login() }}>
            <PhoneInput>
              <span className="prefix">+86</span>
              <input
                type="tel"
                placeholder="请输入手机号"
                maxLength={11}
                value={phone.phone}
                onChange={(e) => phone.setPhone(e.target.value)}
              />
            </PhoneInput>

            <CaptchaRow>
              <input
                type="text"
                placeholder="验证码"
                maxLength={6}
                value={phone.captcha}
                onChange={(e) => phone.setCaptcha(e.target.value)}
              />
              <button
                type="button"
                className="send-btn"
                disabled={phone.countdown > 0 || phone.status === "sendingCode"}
                onClick={phone.sendCode}
              >
                {phone.status === "sendingCode"
                  ? "发送中..."
                  : phone.countdown > 0
                    ? `${phone.countdown}s`
                    : "发送验证码"}
              </button>
            </CaptchaRow>

            {phone.error && <ErrorText>{phone.error}</ErrorText>}

            <ActionButton
              type="submit"
              disabled={phone.status === "logging" || phone.status === "sendingCode"}
            >
              {phone.status === "logging" ? "登录中..." : "登录"}
            </ActionButton>

            <HintText>未注册手机号登录后将自动创建账号</HintText>
          </PhoneForm>
        )}
      </LoginCard>
    </LoginWrapper>
  )
}

const Login: FC = () => <LoginContent />

export default memo(Login)
