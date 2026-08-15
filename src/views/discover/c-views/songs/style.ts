import styled from "styled-components"

export const SongsWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #07090f 0%, #0a0e18 30%, #0b1020 100%);

  &::before {
    content: "";
    position: fixed;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 1000px;
    height: 700px;
    background: radial-gradient(
      ellipse,
      rgba(40, 70, 160, 0.1) 0%,
      rgba(20, 40, 80, 0.04) 40%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }
`

export const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1460px;
  margin: 0 auto;
  padding: 40px 48px;
`

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 56px;
  padding-bottom: 48px;

  .ant-pagination-item {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    transition: all 0.25s ease;

    a {
      color: rgba(255, 255, 255, 0.4);
    }

    &:hover {
      border-color: rgba(255, 255, 255, 0.12);
      background: rgba(255, 255, 255, 0.05);

      a {
        color: rgba(255, 255, 255, 0.65);
      }
    }
  }

  .ant-pagination-item-active {
    background: #ff4d4f;
    border-color: #ff4d4f;

    a {
      color: #fff;
    }

    &:hover {
      background: #ff6666;
      border-color: #ff6666;

      a {
        color: #fff;
      }
    }
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    .ant-pagination-item-link {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 10px;
      color: rgba(255, 255, 255, 0.4);
      transition: all 0.25s ease;

      &:hover {
        border-color: rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.65);
      }
    }
  }
`
