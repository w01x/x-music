export interface SidebarItem {
  label: string
  icon: string
  path: string
  requiresAuth?: boolean
}

export interface SidebarSection {
  title: string
  items: SidebarItem[]
}

export const sidebarSections: SidebarSection[] = [
  {
    title: '',
    items: [
      { label: '首页', icon: 'HomeOutlined', path: '/discover' },
      { label: '搜索', icon: 'SearchOutlined', path: '/search' },
    ]
  },
  {
    title: '音乐',
    items: [
      { label: '发现音乐', icon: 'CustomerServiceOutlined', path: '/discover' },
      { label: '排行榜', icon: 'BarChartOutlined', path: '/discover/ranking' },
      { label: '歌单', icon: 'UnorderedListOutlined', path: '/discover/songs' },
      { label: '歌手', icon: 'UserOutlined', path: '/discover/artist' },
      { label: '新碟上架', icon: 'PlayCircleOutlined', path: '/discover/album' },
      { label: '电台', icon: 'SoundOutlined', path: '/discover/djradio' },
    ]
  },
  {
    title: '社区',
    items: [
      { label: '社区动态', icon: 'CommentOutlined', path: '/community' },
      { label: '关注的人', icon: 'TeamOutlined', path: '/community?tab=following' },
    ]
  },
  {
    title: '我的',
    items: [
      { label: '我的音乐', icon: 'HeartOutlined', path: '/mine', requiresAuth: true },

    ]
  },
]
