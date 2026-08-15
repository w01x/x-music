import styled from 'styled-components';

export const BannerWrapper = styled.div<{ $bgImage?: string }>`
  background: url(${props => props.$bgImage || ''}) center center / 6000px;
  transition: background-image 0.3s ease-in-out;
  margin-bottom: 32px;

  .banner {
    height: 220px;
    display: flex;
    position: relative;
    border-radius: 16px;
    overflow: hidden;
  }
`;

export const BannerLeft = styled.div`
  position: relative;
  flex: 1;

  .banner-item {
    overflow: hidden;
    height: 220px;

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .dots {
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 6px;

    > li {
      .item {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.3);
        cursor: pointer;
        text-indent: -9999px;
        transition: all 0.3s ease;

        &.active {
          background: #FF4D4F;
          width: 24px;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;

export const BannerRight = styled.div`
  width: 254px;
  height: 220px;
  background: linear-gradient(135deg, #1A1D2E, #222733);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #222733, #2A2E3E);
  }

  .download-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(255, 77, 79, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #FF4D4F;
  }

  .download-text {
    color: #B3B3B3;
    font-size: 13px;
  }

  .download-btn {
    padding: 6px 20px;
    border-radius: 16px;
    background: #FF4D4F;
    color: #fff;
    font-size: 12px;
    border: none;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
      background: #ff7875;
    }
  }
`;

export const BannerControl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;

  .btn {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }
  }

  .left {
    left: -54px;
  }

  .right {
    right: -54px;
  }
`;
