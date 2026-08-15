
import { memo } from "react";
import type { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { SingerWrapper } from "./style";
import AreaHeaderV2 from "@/components/area-header-v2";
import { useAppSelector } from "@/store";
import { getImageSize } from "@/utils/format";

interface IProps {
  children?: ReactNode;
}

const SettleSingle: FC<IProps> = () => {
  const { settleSingers } = useAppSelector((state) => ({
    settleSingers: state.recommend.settleSingers
  }));

  return (
    <SingerWrapper>
      <AreaHeaderV2
        title="入驻歌手"
        moreText="查看全部"
        moreLink="#/discover/artist"
      />
      <div className="artists">
        {settleSingers.map((item) => {
          return (
            <Link to={`/discover/artist/${item.id}`} className="item" key={item.id}>
              <img src={getImageSize(item.picUrl, 100)} alt={item.name} />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="alias">{item.alias.join('')}</div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="apply-for">
        <a href="#/discover/artist">申请成为网易音乐人</a>
      </div>
    </SingerWrapper>
  );
};
export default memo(SettleSingle)
