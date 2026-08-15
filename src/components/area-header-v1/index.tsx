import { memo } from "react";
import { ReactNode, FC } from "react";
import { HeaderV1Wrapper } from "./style";
import { Link } from "react-router";
import { RightOutlined } from "@ant-design/icons";

interface IProps {
  children?: ReactNode;
  title?: string;
  keywords?: string[];
  moreText?: string;
  moreLink?: string;
}

const AreaHeaderV1: FC<IProps> = (props) => {
  const {
    title = '默认标题',
    keywords = [],
    moreText = '更多',
    moreLink = '/'
  } = props;

  return (
    <HeaderV1Wrapper>
      <div className="left">
        <h3 className="title">{title}</h3>
        {keywords.length > 0 && (
          <div className="keywords">
            {keywords.map((item, index, array) => (
              <div className="item" key={item}>
                <Link className="link" to={`${moreLink}?cat=${item}`}>{item}</Link>
                {index < array.length - 1 && <span className="divider">|</span>}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="right">
        <Link className="more" to={moreLink}>{moreText}</Link>
        <span className="icon"><RightOutlined /></span>
      </div>
    </HeaderV1Wrapper>
  );
};

export default memo(AreaHeaderV1);
