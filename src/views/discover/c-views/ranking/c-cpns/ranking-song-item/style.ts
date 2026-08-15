import styled from "styled-components"

export const SongItemWrapper = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.2s;
  width: 100%;
  cursor: pointer;
  background: transparent;

  &:nth-child(odd) {
    background: rgba(255, 255, 255, 0.02);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    transform: translateX(2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

    .operator {
      opacity: 1;
    }
  }

  &.active {
    background: rgba(255, 77, 79, 0.08);
    border-left: 2px solid #FF4D4F;

    .rank {
      color: #FF4D4F;
      font-weight: 700;
    }

    .title span {
      color: #FF4D4F;
      font-weight: 700;
    }
  }

  &:nth-child(n+5) {
    height: 35px;

    img {
      width: 30px;
      height: 30px;
    }

    .rank {
      font-size: 13px;
    }

    .title span {
      font-size: 12px;
    }

    .duration {
      font-size: 11px;
    }

    .singer {
      font-size: 11px;
    }
  }

  .rank {
    width: 80px;
    text-align: center;
    font-size: 15px;
    color: #6A6A6A;
  }

  .title {
    flex: 1;
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      margin-right: 12px;
      border: 3px solid #1F2230;
    }

    span {
      font-size: 13px;
      line-height: 1.3;
      transition: all 0.2s;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

      &:hover {
        color: #FF4D4F;
      }
    }

    .operator {
      margin-left: auto;
      margin-right: 20px;
      display: flex;
      gap: 8px;
      transition: all 0.2s;

      .btn-add {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 50%;
        background: transparent;
        color: #6A6A6A;
        cursor: pointer;
        transition: all 0.15s;

        &:hover {
          color: #e8e8e8;
          background: rgba(255,255,255,0.08);
        }
      }
    }
  }

  .duration {
    width: 120px;
    font-size: 12px;
    color: #6A6A6A;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .singer {
    width: 180px;
    font-size: 12px;
    color: #6A6A6A;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    a {
      color: #6A6A6A;
      text-decoration: none;
      &:hover { color: #e8e8e8; }
    }
  }
`
