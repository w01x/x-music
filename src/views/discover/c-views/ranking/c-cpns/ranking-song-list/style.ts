import styled from "styled-components"

export const SongListWrapper = styled.div`
  margin-top: 40px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }

  .header {
    height: 38px;
    display: flex;
    align-items: center;
    background: #0F1117;
    border: 1px solid #1F2230;
    font-size: 12px;
    color: #6A6A6A;
  }

  .song-item {
    height: 70px;
    display: flex;
    align-items: center;
    border-left: 1px solid #1F2230;
    border-right: 1px solid #1F2230;
    border-bottom: 1px solid #1F2230;
    transition: all 0.2s;
    cursor: pointer;

    &:nth-child(odd) {
      background: rgba(255, 255, 255, 0.02);
    }

    &:hover {
      background: rgba(255, 255, 255, 0.04);
      .operator { opacity: 1; }
    }

    &.active {
      background: rgba(255, 77, 79, 0.08);
      .rank { color: #FF4D4F; font-weight: 700; }
      .title span { color: #FF4D4F; font-weight: 700; }
    }

    @media (max-width: 768px) {
      height: 56px;
    }
  }

  .rank {
    width: 80px;
    text-align: center;
    font-size: 16px;
    color: #6A6A6A;
    transition: all 0.2s;

    @media (max-width: 768px) {
      width: 32px;
      font-size: 13px;
    }
  }

  .title {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;

    img {
      width: 50px;
      height: 50px;
      margin-right: 12px;
      border: 3px solid #1F2230;
      object-fit: cover;

      @media (max-width: 768px) {
        width: 36px;
        height: 36px;
        margin-right: 8px;
        border-width: 2px;
      }
    }

    span {
      font-size: 14px;
      color: #B3B3B3;
      transition: all 0.2s;

      @media (max-width: 768px) {
        font-size: 12px;
      }

      &:hover { color: #FF4D4F; }
    }

    .operator {
      margin-left: auto;
      margin-right: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      opacity: 0;
      transition: all 0.2s;

      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .duration {
    width: 120px;
    font-size: 13px;
    color: #6A6A6A;

    @media (max-width: 768px) {
      width: 56px;
      font-size: 11px;
    }
  }

  .singer {
    width: 180px;
    font-size: 13px;
    color: #6A6A6A;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .empty-hint {
    padding: 80px 0;
    text-align: center;
    font-size: 14px;
    color: #6A6A6A;
  }

  .pagination {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 12px;

    @media (max-width: 768px) {
      gap: 6px;
    }

    button {
      width: 36px;
      height: 36px;
      border: 1px solid #1F2230;
      background: #0F1117;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;

      @media (max-width: 768px) {
        width: 28px;
        height: 28px;
        font-size: 12px;
      }

      &:hover { background: #1F2230; }

      &:disabled {
        background: #FF4D4F;
        color: #fff;
        cursor: default;
        border-color: #FF4D4F;
      }
    }
  }
`
