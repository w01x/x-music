import api from '@/service'

/**
 * 获取二维码 key
 * POST /login/qr/key
 */
export const getQrKey = async () => {
  const res = await api.request({
    url: '/login/qr/key',
    method: 'POST',
    data: { timestamp: Date.now() },
  })

  return res.data?.unikey
}

/**
 * 生成二维码图片
 * POST /login/qr/create
 */
export const createQrCode = async (key: string) => {
  const res = await api.request({
    url: '/login/qr/create',
    method: 'POST',
    data: {
      key,
      qrimg: true,
      timestamp: Date.now(),
    },
  })

  return res.data?.qrimg
}

/**
 * 检查扫码状态
 * GET /login/qr/check
 *
 * 返回状态码：
 * 800 = 二维码过期
 * 801 = 等待扫码
 * 802 = 待确认（已扫码）
 * 803 = 授权登录
 */
export const checkQrStatus = async (key: string) => {
  const res = await api.request({
    url: '/login/qr/check',
    method: 'GET',
    params: {
      key,
      timestamp: Date.now(),
    },
  })

  return res
}

/**
 * 获取当前登录用户信息
 * GET /login/status
 */
export const getLoginStatus = async (cookie?: string) => {
  const res = await api.request({
    url: '/login/status',
    method: 'GET',
    params: cookie ? { cookie, timestamp: Date.now() } : { timestamp: Date.now() },
  })
  return res
}
