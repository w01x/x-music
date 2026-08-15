export interface ILyric {
  time: number
  text: string
  words?: IWord[]
}

export interface IWord {
  text: string
  startTime: number
  duration: number
  /** 该词在全行文本中的字符起始位置 */
  c0: number
  /** 该词在全行文本中的字符结束位置 */
  c1: number
}

/* ── 原始 LRC 行级解析（保持不变）──────────────────── */

const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString: string): ILyric[] {
  const lines: string[] = lyricString.split('\n')
  const lyrics: ILyric[] = []
  for (const line of lines) {
    const result = timeRegExp.exec(line)
    if (!result) continue
    const time1 = Number(result[1]) * 60 * 1000
    const time2 = Number(result[2]) * 1000
    const time3 =
      result[3].length === 2 ? Number(result[3]) * 10 : Number(result[3])
    const time = time1 + time2 + time3
    const text = line.replace(timeRegExp, '')
    lyrics.push({ time, text })
  }
  return lyrics
}

/* ── YRC 逐字解析 ─────────────────────────────────── */

const yrcLineRe = /^\[(\d+),(\d+)\](.+)$/

export function parseYrcLyric(yrcString: string): ILyric[] {
  if (!yrcString) return []
  const lines = yrcString.split('\n')
  const lyrics: ILyric[] = []

  for (const raw of lines) {
    const line = raw.trim()
    const m = yrcLineRe.exec(line)
    if (!m) continue
    const lineStartMs = Number(m[1])
    const body = m[2]

    const wordParts = body.match(/\((\d+),(\d+)\)/g)
    if (!wordParts) {
      const text = body.replace(/\(\d+,\d+\)/g, '').trim()
      if (text) lyrics.push({ time: lineStartMs, text })
      continue
    }

    const words: IWord[] = []
    const rawTexts = body.split(/\(\d+,\d+\)/).filter(Boolean)
    let charPos = 0

    for (let i = 0; i < wordParts.length; i++) {
      const dm = wordParts[i].match(/\((\d+),(\d+)\)/)!
      const rawStart = Number(dm[1])
      const dur = Number(dm[2])
      const text = rawTexts[i] || ''
      const absStart = rawStart >= lineStartMs - 500 ? rawStart : lineStartMs + rawStart
      const c0 = charPos
      const c1 = charPos + text.length
      charPos = c1

      words.push({ text, startTime: absStart, duration: dur, c0, c1 })
    }

    lyrics.push({
      time: lineStartMs,
      text: words.map(w => w.text).join(''),
      words,
    })
  }

  return lyrics
}

/** 无 YRC 时自动推算逐字时间（每行时长均分到每个字） */
export function addEstimatedWords(lyrics: ILyric[]) {
  for (let i = 0; i < lyrics.length; i++) {
    if (lyrics[i].words?.length) continue
    const line = lyrics[i]
    const chars = [...line.text]
    if (chars.length === 0) continue
    const lineEnd = i + 1 < lyrics.length ? lyrics[i + 1].time : line.time + 5000
    const dur = Math.max(100, lineEnd - line.time)
    const perChar = dur / chars.length
    line.words = chars.map((ch, ci) => ({
      text: ch,
      startTime: line.time + ci * perChar,
      duration: perChar,
      c0: ci,
      c1: ci + 1,
    }))
  }
}

export function mergeYrcIntoLyrics(lrcLyrics: ILyric[], yrcLyrics: ILyric[]): ILyric[] {
  if (!yrcLyrics.length) return lrcLyrics
  for (let i = 0; i < lrcLyrics.length && i < yrcLyrics.length; i++) {
    if (yrcLyrics[i].words?.length) {
      lrcLyrics[i].words = yrcLyrics[i].words
    }
  }
  return lrcLyrics
}
