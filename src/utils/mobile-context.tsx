import { createContext, useContext, useState, useEffect } from 'react'

interface MobileCtx {
  sidebarOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
  isMobile: boolean
}

export const MobileContext = createContext<MobileCtx>({
  sidebarOpen: false,
  toggleSidebar: () => {},
  closeSidebar: () => {},
  isMobile: false,
})

export const useMobile = () => useContext(MobileContext)

const isMobileDevice = () => typeof window !== 'undefined' && window.innerWidth <= 768

export function useMobileProvider() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(isMobileDevice)

  useEffect(() => {
    const onResize = () => setIsMobile(isMobileDevice())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const toggleSidebar = () => setSidebarOpen(v => !v)
  const closeSidebar = () => setSidebarOpen(false)

  return { sidebarOpen, toggleSidebar, closeSidebar, isMobile }
}
