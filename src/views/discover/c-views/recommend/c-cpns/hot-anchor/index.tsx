
import {memo}from "react";
import { ReactNode,FC } from "react";
import { AnchorWrapper } from "./style";
import AreaHeaderV2 from "@/components/area-header-v2";
import { hotRadios } from "@/assets/data/local_data";
import { getImageSize } from "@/utils/format";
interface IProps {
children?: ReactNode,
}
const HotAnchor:FC<IProps>=() => {
  return (
<AnchorWrapper>
  <AreaHeaderV2 title="热门主播" moreLink="/discover/anchor" />
  <div className="anchors">
    {
      hotRadios.map((item)=>{
        return (
          <div className="item" key={item.picUrl}>
            <a href={item.url} className="image" rel="noreferrer">
              <img src={getImageSize(item.picUrl, 40)} alt={item.name} />
            </a>
            <div className="info">
              <div className="name">{item.name}</div>
              <div className="position">{item.position}</div>
            </div>
          </div>
        )
      })
    }
  </div>
</AnchorWrapper>
  )
}
export default memo(HotAnchor)
