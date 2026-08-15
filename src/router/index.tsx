import React, { lazy } from 'react'
import {
  RouteObject,
  Navigate
} from 'react-router-dom'

const Discover =
  lazy(() => import('@/views/discover'))

const Mine =
  lazy(() => import('@/views/mine'))

const UserDetail =
  lazy(() => import('@/views/user-detail'))

const Community =
  lazy(() => import('@/views/community'))

const Album =
  lazy(() => import('@/views/discover/c-views/album'))

const Artist =
  lazy(() => import('@/views/discover/c-views/artist'))

const Djradio =
  lazy(() => import('@/views/discover/c-views/djradio'))

const Ranking =
  lazy(() => import('@/views/discover/c-views/ranking'))

const Recommend =
  lazy(() => import('@/views/discover/c-views/recommend'))

const Songs =
  lazy(() => import('@/views/discover/c-views/songs'))

const Search =
  lazy(() => import('@/views/search'))

const Login =
  lazy(() => import('@/views/login'))

const DjRadioRecommend =
  lazy(() =>
    import(
      '@/views/discover/c-views/djradio/c-cpns/recommend'
    )
  )

const DjRadioProgramRanking =
  lazy(() =>
    import(
      '@/views/discover/c-views/djradio/c-cpns/program-ranking'
    )
  )

const ArtistDetail =
  lazy(() =>
    import('@/views/artist-detail')
  )

const AlbumDetail =
  lazy(() =>
    import('@/views/album')
  )

const PlaylistDetail = lazy(() => import('@/views/playlist'))

const NotFound = lazy(() => import('@/views/not-found'))

const SongDetail =
  lazy(() =>
    import('@/views/song-detail')
  )

const ProgramDetail =
  lazy(() =>
    import('@/views/program-detail')
  )

const routes: RouteObject[] = [

  /* 首页重定向 */
  {
    path: '/',

    element:
      <Navigate
        to="/discover"
      />
  },

  /* 发现音乐 */
  {
    path: '/discover',

    element:
      <Discover />,

    children: [

      /* 默认 */
      {
        index: true,

        element:
          <Navigate
            to="recommend"
          />
      },

      /* 推荐 */
      {
        path: 'recommend',

        element:
          <Recommend />
      },

      /* 排行榜 */
      {
        path: 'ranking',

        element:
          <Ranking />
      },

      /* 歌单 */
      {
        path: 'songs',

        element:
          <Songs />
      },

      /* 电台 */
      {
        path: 'djradio',

        element:
          <Djradio />
      },

      /* 电台推荐 */
      {
        path:
          'djradio/recommend',

        element:
          <DjRadioRecommend />
      },

      /* 节目排行榜 */
      {
        path:
          'djradio/program-ranking',

        element:
          <DjRadioProgramRanking />
      },

      /* 歌手 */
      {
        path: 'artist',

        element:
          <Artist />
      },

      /* 歌手详情 */
      {
        path:
          'artist/:id',

        element:
          <ArtistDetail />
      },

      /* 新碟 */
      {
        path: 'album',

        element:
          <Album />
      },

      /* 专辑详情 */
      {
        path:
          'album/:id',

        element:
          <AlbumDetail />
      },

      /* 歌单详情 */
      {
        path:
          'playlist/:id',

        element:
          <PlaylistDetail />
      },

      /* 单曲详情 */
      {
        path:
          'song/:id',

        element:
          <SongDetail />
      },

      /* 电台节目详情 */
      {
        path:
          'program/:id',

        element: <ProgramDetail />
      },

      // discover 子路由未匹配时重定向到首页
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },

  /* 用户详情 */
  {
    path: '/user/:id',

    element:
      <UserDetail />
  },

  /* 社区 */
  {
    path: '/community',

    element:
      <Community />
  },

  /* 关注 (redirect to community) */
  {
    path: '/focus',

    element:
      <Navigate to="/community" />
  },

  /* 我的音乐 */
  {
    path: '/mine',

    element:
      <Mine />
  },

  /* 搜索 */
  {
    path: '/search',

    element:
      <Search />
  },

  /* 登录 */
  {
    path: '/login',
    element: <Login />
  },

  /* 404 */
  {
    path: '*',
    element: <NotFound />
  }
]

export default routes
