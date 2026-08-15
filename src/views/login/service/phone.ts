import api from '@/service'

/**
 * 发送短信验证码
 */
export const sendCaptcha = async (phone: string, ctcode = '86') => {
  const res = await api.request({
    url: '/captcha/sent',
    method: 'GET',
    params: { phone, ctcode, timestamp: Date.now() }
  })
  return res
}

/**
 * 验证短信验证码
 */
export const verifyCaptcha = async (phone: string, captcha: string, ctcode = '86') => {
  const res = await api.request({
    url: '/captcha/verify',
    method: 'GET',
    params: { phone, captcha, ctcode, timestamp: Date.now() }
  })
  return res
}

/**
 * 手机号验证码登录
 */
export const cellphoneLogin = async (params: {
  phone: string
  captcha: string
  countrycode?: string
}) => {
  const res = await api.request({
    url: '/login/cellphone',
    method: 'GET',
    params: {
      phone: params.phone,
      captcha: params.captcha,
      countrycode: params.countrycode || '86',
      timestamp: Date.now()
    }
  })
  return res
}
