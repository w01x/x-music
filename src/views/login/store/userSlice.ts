import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { UserProfile } from "@/types/music"
import { cleanCookie } from "@/utils/format"

interface UserState {
  isLoggedIn: boolean
  profile: UserProfile | null
  cookie: string | null
}

const initialState: UserState = {
  isLoggedIn: false,
  profile: null,
  cookie: null,
}

const userSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<{ profile: UserProfile; cookie: string }>) {
      state.isLoggedIn = true
      state.profile = action.payload.profile
      state.cookie = action.payload.cookie
    },
    initUser(state) {
      const stored = localStorage.getItem("user")
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          state.isLoggedIn = true
          state.profile = parsed.profile
          const cleaned = cleanCookie(parsed.cookie || '')
          state.cookie = cleaned
        } catch {
          // ignore
        }
      }
    },
    updateProfile(state, action: PayloadAction<{ avatarUrl: string }>) {
      if (state.profile) {
        state.profile.avatarUrl = action.payload.avatarUrl
      }
      const stored = localStorage.getItem("user")
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (parsed.profile) {
            parsed.profile.avatarUrl = action.payload.avatarUrl
            localStorage.setItem("user", JSON.stringify(parsed))
          }
        } catch {
          // ignore
        }
      }
    },
    logout(state) {
      state.isLoggedIn = false
      state.profile = null
      state.cookie = null
      localStorage.removeItem("user")
    },
  },
})

export const { setLogin, initUser, updateProfile, logout } = userSlice.actions
export default userSlice.reducer
