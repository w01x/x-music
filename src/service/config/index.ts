// 生产环境通过 nginx 代理 /api -> 后端
// 开发环境通过 Vite proxy /api -> 后端
export const BASE_URL = import.meta.env.VITE_BASE_URL || '/api'
export const TIME_OUT = 10000
