
import { memo } from 'react'
import type { FC } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { SidebarWrapper, SectionTitle, SidebarItem, UserInfo } from './style'
import { sidebarSections } from '@/assets/data/sidebar_menu'
import { useAppSelector } from '@/store'
import { useMobile } from '@/utils/mobile-context'
import * as Icons from '@ant-design/icons'

const iconMap: Record<string, React.ComponentType<any>> = {
  HomeOutlined: Icons.HomeOutlined,
  SearchOutlined: Icons.SearchOutlined,
  CustomerServiceOutlined: Icons.CustomerServiceOutlined,
  BarChartOutlined: Icons.BarChartOutlined,
  UnorderedListOutlined: Icons.UnorderedListOutlined,
  UserOutlined: Icons.UserOutlined,
  PlayCircleOutlined: Icons.PlayCircleOutlined,
  SoundOutlined: Icons.SoundOutlined,
  CommentOutlined: Icons.CommentOutlined,
  TeamOutlined: Icons.TeamOutlined,
  HeartOutlined: Icons.HeartOutlined,
}

interface SidebarProps {
  $mobile?: boolean
  $open?: boolean
}

const AppSidebar: FC<SidebarProps> = ({ $mobile, $open }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { closeSidebar } = useMobile()
  const { isLoggedIn, profile } = useAppSelector((state) => ({
    isLoggedIn: state.loginUser.isLoggedIn,
    profile: state.loginUser.profile,
  }))

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 6) return "夜深了"
    if (hour < 12) return "早上好"
    if (hour < 14) return "中午好"
    if (hour < 18) return "下午好"
    return "晚上好"
  }

  const discoverTopRoutes = ['/discover', '/discover/recommend']

  const isActive = (path: string) => {
    const [base, query] = path.split('?')
    const fullPath = location.pathname + location.search

    if (base === '/discover') {
      return discoverTopRoutes.includes(location.pathname) || location.pathname.startsWith('/discover/djradio/')
    }
    if (base === '/community') {
      if (query) {
        return fullPath === path
      }
      return location.pathname === '/community' && !location.search.includes('tab=following')
    }
    if (base === '/mine') {
      if (query) {
        return fullPath === path
      }
      return location.pathname === '/mine' && !location.search.includes('tab=recent')
    }
    return location.pathname === base
  }

  return (
    <SidebarWrapper $mobile={$mobile} $open={$open}>
      <UserInfo
        onClick={() => profile?.userId && navigate(`/user/${profile.userId}`)}
        style={{ cursor: isLoggedIn ? 'pointer' : 'default' }}
      >
        {isLoggedIn && profile?.avatarUrl ? (
          <img className="avatar" src={profile.avatarUrl} alt="" />
        ) : (
          <div className="avatar-placeholder">
            <Icons.UserOutlined />
          </div>
        )}
        <div className="info">
          <div className="greeting">{getGreeting()}</div>
          <div className="name">
            {isLoggedIn && profile?.nickname ? profile.nickname : "未登录"}
          </div>
        </div>
      </UserInfo>
      {sidebarSections.map((section) => {
        const visibleItems = section.items.filter(
          (item) => !item.requiresAuth || isLoggedIn
        )
        if (visibleItems.length === 0) return null

        return (
          <div key={section.title || 'main'}>
            {section.title && <SectionTitle>{section.title}</SectionTitle>}
            {visibleItems.map((item) => {
              const IconComponent = iconMap[item.icon]
              return (
                <NavLink
                  key={item.label + item.path}
                  to={item.path}
                  style={{ textDecoration: 'none' }}
                  onClick={() => $mobile && closeSidebar()}
                >
                  <SidebarItem $active={isActive(item.path)}>
                    {IconComponent && <IconComponent />}
                    <span>{item.label}</span>
                  </SidebarItem>
                </NavLink>
              )
            })}
          </div>
        )
      })}
      <div className="icp-footer">
        <span>晋ICP备2026008203号-1</span>
        <span>晋公网安备14112402160022号</span>
      </div>
    </SidebarWrapper>
  )
}

export default memo(AppSidebar)
