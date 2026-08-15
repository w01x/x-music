export function formatCount(count:number){
  if(count>100000){
  return Math.floor(count /10000)+'万'
  }
  else {
    return count
  }
  }
export function getImageSize(
  imageUrl:string,
  width:number,
  height:number=width){
  const url = imageUrl?.replace(/^http:/, 'https:') ?? ''
  // 网易云 CDN 缩略图参数标准格式: ?param={width}y{height}（用 y 分隔，不是 ×）
  return url+`?param=${width}y${height}`
}
export function cleanName(name: string) {
  return name?.replace(/网易云/g, '') ?? ''
}

export function formatTime(time:number){
  const timeSeconds = Math.floor(time / 1000)
  const minute = Math.floor(timeSeconds / 60)
  const second = Math.floor(timeSeconds % 60)
  const formatminute = String(minute).padStart(2,'0')
  const formatsecond = String(second).padStart(2,'0')
  return `${formatminute}:${formatsecond}`
}

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp
  const seconds = Math.floor(diff / 1000)
  if (seconds < 60) return "刚刚"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}小时前`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}天前`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}个月前`
  const years = Math.floor(months / 12)
  return `${years}年前`
}

const VALID_COOKIE_KEYS = new Set([
  'MUSIC_U', 'MUSIC_A', 'MUSIC_A_T', 'MUSIC_R_T', 'MUSIC_R_U',
  'MUSIC_SNS', '__csrf', '__remember_me', 'NMTID',
])

/** 清洗 cookie：从原始 Set-Cookie 字符串中只提取有效的 key=value 对，丢弃 Path/Expires/Max-Age 等属性，去重保留最后出现的值 */
export function cleanCookie(raw: string): string {
  if (!raw) return ''
  const map = new Map<string, string>()
  const parts = raw.split(';')
  for (const part of parts) {
    const eqIdx = part.indexOf('=')
    if (eqIdx <= 0 || eqIdx === part.length - 1) continue
    const key = part.substring(0, eqIdx).trim()
    if (VALID_COOKIE_KEYS.has(key)) {
      const value = part.substring(eqIdx + 1).trim()
      if (value) map.set(key, value)
    }
  }
  return Array.from(map.entries()).map(([k, v]) => `${k}=${v}`).join('; ')
}
