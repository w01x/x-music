import {
  getQrKey,
  createQrCode,
  checkQrStatus,
  getLoginStatus,
} from './qr'

export const loginService = {
  getKey: () => getQrKey(),
  createQr: (key: string) => createQrCode(key),
  check: (key: string) => checkQrStatus(key),
  status: (cookie?: string) => getLoginStatus(cookie),
}
