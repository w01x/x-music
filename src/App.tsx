import { useRoutes } from 'react-router-dom'
import styled from 'styled-components'
import routes from './router'
import AppHeader from './components/app-header'
import AppSidebar from './components/app-sidebar'
import AppPlayerBar from './views/player/app-player-bar'
import ImmersivePlayer from './views/player/immersive-player'
import MusicLoader from './components/music-loader'
import { useEffect, Suspense } from 'react'
import { initUser } from '@/views/login/store/userSlice'
import { useAppDispatch, useAppSelector } from '@/store'
import { MobileContext, useMobileProvider } from '@/utils/mobile-context'

const AppLayout = styled.div<{ $sidebarOpen: boolean }>`
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
  background: ${(props) => props.theme.color.bg};
  padding-top: 64px;
  padding-bottom: 90px;
  padding-left: 240px;

  @media (max-width: 768px) {
    padding-left: 0;
    padding-bottom: 74px;
  }

  .sidebar-overlay {
    display: none;
    @media (max-width: 768px) {
      display: ${({ $sidebarOpen }) => ($sidebarOpen ? 'block' : 'none')};
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 60;
    }
  }
`

const MainContent = styled.main`
  min-height: calc(100vh - 64px - 90px);

  @media (max-width: 768px) {
    min-height: calc(100vh - 64px - 74px);
  }

  > * {
    animation: pageEnter 0.25s ease;
  }

  @keyframes pageEnter {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`

function App() {
  const dispatch = useAppDispatch()
  const mobile = useMobileProvider()
  const isImmersive = useAppSelector((state: any) => state.player.isImmersive)

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  return (
    <MobileContext.Provider value={mobile}>
      <AppLayout $sidebarOpen={mobile.sidebarOpen}>
        <AppHeader />
        <div className="sidebar-overlay" onClick={mobile.closeSidebar} />
        <AppSidebar $mobile={mobile.isMobile} $open={mobile.sidebarOpen} />
        <MainContent>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[calc(100vh-64px-90px)]">
              <MusicLoader />
            </div>
          }>
            {useRoutes(routes)}
          </Suspense>
        </MainContent>
        <AppPlayerBar $mobile={mobile.isMobile} />
      </AppLayout>
      {isImmersive && <ImmersivePlayer />}
    </MobileContext.Provider>
  )
}

export default App
