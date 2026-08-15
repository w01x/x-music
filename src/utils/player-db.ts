import type { Song } from '@/types/music'

const DB_NAME = 'x-music'
const DB_VERSION = 1
const STORE_NAME = 'playerState'

interface PlayerData {
  currentSong: Song | Record<string, never>
  playSongList: Song[]
  playSongIndex: number
  playMode: number
  recentPlays: Song[]
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
    request.onblocked = () => console.warn('[player-db] Database blocked, close other tabs')
  })
}

export async function savePlayerState(data: Partial<PlayerData>): Promise<void> {
  try {
    const db = await openDB()
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)

    // 逐字段写入，避免整个大对象序列化失败
    if (data.currentSong !== undefined) {
      store.put(data.currentSong, 'currentSong')
    }
    if (data.playSongList !== undefined) {
      store.put(data.playSongList, 'playSongList')
    }
    if (data.playSongIndex !== undefined) {
      store.put(data.playSongIndex, 'playSongIndex')
    }
    if (data.playMode !== undefined) {
      store.put(data.playMode, 'playMode')
    }
    if (data.recentPlays !== undefined) {
      store.put(data.recentPlays, 'recentPlays')
    }

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
      tx.onabort = () => reject(tx.error)
    })
  } catch (err) {
    console.warn('[player-db] Failed to save player state:', err)
  }
}

export async function loadPlayerState(): Promise<Partial<PlayerData>> {
  try {
    const db = await openDB()
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)

    const keys = ['currentSong', 'playSongList', 'playSongIndex', 'playMode', 'recentPlays']
    const results = await Promise.all(
      keys.map(
        (key) =>
          new Promise<[string, unknown]>((resolve) => {
            const req = store.get(key)
            req.onsuccess = () => resolve([key, req.result])
            req.onerror = () => resolve([key, undefined])
          })
      )
    )

    const data: Record<string, unknown> = {}
    for (const [key, value] of results) {
      if (value !== undefined) {
        data[key] = value
      }
    }

    // 校验数据完整性
    if (
      data.currentSong &&
      data.currentSong.id &&
      Array.isArray(data.playSongList)
    ) {
      return data
    }

    return {}
  } catch (err) {
    console.warn('[player-db] Failed to load player state:', err)
    return {}
  }
}
