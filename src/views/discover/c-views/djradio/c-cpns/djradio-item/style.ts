import styled from "styled-components"

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  background: #161822;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35),
                0 0 0 1px rgba(255, 255, 255, 0.06);
  }

  .cover-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    background: #1A1D2B;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
    }

    ${ItemWrapper}:hover & img {
      transform: scale(1.06);
    }

    .play-btn {
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #FF4D4F;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0;
      transform: translateY(6px);
      transition: opacity 0.3s ease, transform 0.3s ease,
                  background 0.2s ease;
      box-shadow: 0 4px 14px rgba(255, 77, 79, 0.35);

      &:hover {
        background: #ff6b6d;
      }

      &::after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-left: 10px solid #fff;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        margin-left: 2px;
      }
    }

    ${ItemWrapper}:hover & .play-btn {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .info {
    padding: 12px;

    .name {
      font-size: 13px;
      font-weight: 500;
      color: #E8E8E8;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 4px;

      a {
        color: inherit;
        text-decoration: none;

        &:hover {
          color: #FF4D4F;
        }
      }
    }

    .radio-name {
      font-size: 11px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`
