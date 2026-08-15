import {memo}from "react";
import { ReactNode,FC } from "react";
import { LoginWrapper } from "./style";
interface IProps {
children?: ReactNode,
}
const UserLogin:FC<IProps>=() => {
  return (
<LoginWrapper>
  <p className="desc">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
<a href="#/login">用户登录</a>
</LoginWrapper>
  )
}
export default memo(UserLogin)
