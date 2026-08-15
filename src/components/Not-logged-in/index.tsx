import { memo, useEffect, useState } from "react"
import type { FC } from "react"
import { useNavigate } from "react-router-dom"
import { UserOutlined, ArrowRightOutlined } from "@ant-design/icons"

import {
  Wrapper,
  IconCircle,
  Title,
  Desc,
  LoginButton,
} from "./style"

interface IProps {
  title?: string
  desc?: string
  buttonText?: string
  redirectPath?: string
}

const NotLoggedIn: FC<IProps> = (props) => {
  const {
    title = "登录以发现更多",
    desc = "登录后可查看个性化推荐、收藏歌单、与好友互动",
    buttonText = "立即登录",
    redirectPath = "/login",
  } = props

  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <Wrapper>
      <IconCircle $show={show} style={{ transitionDelay: '0.1s' }}>
        <UserOutlined />
      </IconCircle>
      <Title $show={show} style={{ transitionDelay: '0.2s' }}>{title}</Title>
      <Desc $show={show} style={{ transitionDelay: '0.3s' }}>{desc}</Desc>
      <LoginButton $show={show} style={{ transitionDelay: '0.4s' }} onClick={() => navigate(redirectPath)}>
        {buttonText}
        <ArrowRightOutlined style={{ fontSize: 12, marginLeft: 6 }} />
      </LoginButton>
    </Wrapper>
  )
}

export default memo(NotLoggedIn)
