import styled from "styled-components"

export const HeaderWrapper = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
  }

  .image {
    width: 150px;
    height: 150px;
    border: 3px solid #1F2230;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    flex-shrink: 0;

    @media (max-width: 768px) {
      width: 120px;
      height: 120px;
    }

    &:hover {
      transform: scale(1.06);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.22);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    margin-left: 30px;

    @media (max-width: 768px) {
      margin-left: 0;
    }

    .title {
      margin-top: 10px;
      font-size: 26px;
      font-weight: 700;
      color: #B3B3B3;

      @media (max-width: 768px) {
        font-size: 20px;
      }
    }

    .update {
      margin-top: 12px;
      font-size: 13px;
      color: #6A6A6A;
    }

    .buttons {
      margin-top: 20px;
      display: flex;
      gap: 12px;

      @media (max-width: 768px) {
        justify-content: center;
      }

      button {
        height: 36px;
        padding: 0 22px;
        border: none;
        border-radius: 18px;
        cursor: pointer;
        transition: all 0.2s;

        @media (max-width: 768px) {
          height: 32px;
          padding: 0 16px;
          font-size: 13px;
        }
      }

      .play {
        background: #FF4D4F;
        color: #fff;
        &:hover { background: rgba(255, 77, 79, 0.6); }
      }

      .collect {
        background: #1F2230;
        color: #B3B3B3;
        &:hover { background: #2A2C32; }
      }
    }
  }
`
