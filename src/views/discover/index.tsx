import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

export interface IProps {
  children?: ReactNode
}

const Discover: FC<IProps> = () => {
  return (
    <Suspense fallback="">
      <Outlet />
    </Suspense>
  )
}

export default memo(Discover)
