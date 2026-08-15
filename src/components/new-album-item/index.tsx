
import {memo}from "react";
import { ReactNode,FC } from "react";
import { AlbumItemWrapper } from "./style";
import { getImageSize } from "@/utils/format";
interface IProps {
children?: ReactNode,
itemData?:any
}
const NewAlbumItem:FC<IProps>=(props) => {
  const {itemData}=props
  return (
<AlbumItemWrapper >
<a
  className="top"
  href={`#/discover/album/${itemData.id}`}
>
  <img src={getImageSize(itemData.picUrl, 100)} alt="" />
  <span className="cover" />
</a>
<div className="bottom">
  <div className="name">{itemData.name}</div>
  <div className="artist">{itemData.artist.name}</div>
</div>
</AlbumItemWrapper>
  )
}
export default memo(NewAlbumItem)
