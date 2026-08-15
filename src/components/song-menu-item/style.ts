import styled from 'styled-components'

export const MenuItemWrapper = styled.div`
  width: 140px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  .top {
    display: block;
    position: relative;
    border-radius: 12px;
    overflow: hidden;

    & > img {
      width: 140px;
      height: 140px;
      display: block;
      object-fit: cover;
    }

    .cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(transparent 60%, rgba(0, 0, 0, 0.6));

      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        color: #ccc;
        height: 27px;

        .headset {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #ccc;
          font-size: 12px;
        }

        .play {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: #fff;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s;

          &:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        }
      }
    }
  }

  .bottom {
    font-size: 13px;
    color: ${(props) => props.theme.color.textPrimary};
    margin-top: 8px;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`
