
import { memo, useRef, useCallback, useState } from "react"
import type { ReactNode, FC } from "react"
import { HeaderLeft, HeaderRight, HeaderWrapper, CropOverlay, CropContainer } from "./style"
import { MenuOutlined } from "@ant-design/icons"

import { NavLink, useNavigate } from "react-router-dom"

import { useAppSelector, useAppDispatch, shallowEqualApp } from "@/store"
import { useMobile } from "@/utils/mobile-context"
import { logout, updateProfile } from "@/views/login/store/userSlice"
import hyRequest from "@/service"
import ClassicSearch from "@/components/search/classic-search"
import Cropper, { type Area } from "react-easy-crop"
import { Slider } from "@/components/ui/slider"

interface IProps {
  children?: ReactNode
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })

const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<Blob> => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement("canvas")
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext("2d")!
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  )
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/jpeg", 0.9)
  })
}

const AppHeader: FC<IProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { toggleSidebar } = useMobile()
  const fileRef = useRef<HTMLInputElement>(null)

  const { isLoggedIn, profile, cookie } = useAppSelector(
    (state) => ({
      isLoggedIn: state.loginUser.isLoggedIn,
      profile: state.loginUser.profile,
      cookie: state.loginUser.cookie,
    }),
    shallowEqualApp,
  )

  /* ---- 头像裁剪状态 ---- */
  const [cropSrc, setCropSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [uploading, setUploading] = useState(false)

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  function handleLogout() {
    dispatch(logout())
    navigate("/")
  }

  function handleChangeAvatar() {
    fileRef.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setCropSrc(reader.result as string)
    reader.readAsDataURL(file)
    // 重置 input 以便同一文件可再次选择
    if (fileRef.current) fileRef.current.value = ""
  }

  function handleCropCancel() {
    setCropSrc(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedAreaPixels(null)
  }

  async function handleCropConfirm() {
    if (!cropSrc || !croppedAreaPixels || !cookie) return
    setUploading(true)
    try {
      const croppedBlob = await getCroppedImg(cropSrc, croppedAreaPixels)
      const formData = new FormData()
      formData.append("imgFile", croppedBlob, "avatar.jpg")
      const res: any = await hyRequest.post({
        url: `/avatar/upload?imgSize=300&cookie=${encodeURIComponent(cookie)}&timestamp=${Date.now()}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      if (res.code === 200) {
        const newUrl = res.data?.url || res.data?.avatarUrl
        if (newUrl) {
          dispatch(updateProfile({ avatarUrl: newUrl + "?t=" + Date.now() }))
        }
      }
      handleCropCancel()
    } catch (err) {
      console.error("头像上传失败:", err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <HeaderWrapper>
      <div className="content">
        <button className="menu-btn" onClick={toggleSidebar}>
          <MenuOutlined />
        </button>
        <HeaderLeft>
          <a href="/" className="logo">
            <span>X</span>·Music
          </a>
          <div className="title-list"></div>
        </HeaderLeft>
        <HeaderRight>
          <ClassicSearch />
          {isLoggedIn ? (
            <div className="user-info">
              <img
                className="avatar"
                src={profile?.avatarUrl || ""}
                alt=""
              />
              <div className="dropdown">
                <div className="dropdown-item" onClick={handleChangeAvatar}>
                  更新头像
                </div>
                <div className="dropdown-item logout" onClick={handleLogout}>
                  退出登录
                </div>
              </div>
            </div>
          ) : (
            <NavLink to="/login" className="login">
              登录
            </NavLink>
          )}
        </HeaderRight>
      </div>

      {/* 隐藏文件选择器 */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* ---- 裁剪弹窗 ---- */}
      {cropSrc && (
        <CropOverlay>
          <CropContainer>
            <div className="crop-header">
              <span>裁剪头像</span>
              <button className="close-btn" onClick={handleCropCancel}>✕</button>
            </div>
            <div className="crop-area">
              <Cropper
                image={cropSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                objectFit="contain"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="crop-controls">
              <span className="label">缩放</span>
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.01}
                onValueChange={([v]) => setZoom(v)}
              />
            </div>
            <div className="crop-actions">
              <button className="btn-cancel" onClick={handleCropCancel}>取消</button>
              <button
                className="btn-confirm"
                onClick={handleCropConfirm}
                disabled={uploading}
              >
                {uploading ? "上传中..." : "确认"}
              </button>
            </div>
          </CropContainer>
        </CropOverlay>
      )}
    </HeaderWrapper>
  )
}

export default memo(AppHeader)
