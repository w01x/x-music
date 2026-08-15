import styled from "styled-components"

export const RankingWrapper = styled.div`
  padding: 20px 24px;

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: #E8E8E8;
      letter-spacing: -0.3px;
      margin: 0;
    }

    span {
      color: #666;
      font-size: 13px;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
  }

  .program-item {
    display: flex;
    align-items: center;
    gap: 16px;
    height: 64px;
    padding: 0 12px;
    border-radius: 8px;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.03);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    }

    .rank {
      width: 32px;
      font-size: 15px;
      font-weight: 500;
      color: #555;
      text-align: center;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;

      &.top3 {
        color: #FF4D4F;
        font-weight: 700;
        font-size: 17px;
      }
    }

    img {
      display: block;
      width: 44px;
      height: 44px;
      border-radius: 6px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .play-btn {
      display: block;
      width: 16px;
      height: 17px;
      background: none;
      cursor: pointer;
      flex-shrink: 0;
      opacity: 0;
      transform: scale(1.3);
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 1;
      }
    }

    &:hover .play-btn {
      opacity: 0.6;
    }

    .info {
      flex: 1;
      min-width: 0;

      .name {
        font-size: 14px;
        font-weight: 500;
        color: #E8E8E8;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;

        a {
          color: inherit;
          text-decoration: none;

          &:hover {
            color: #FF4D4F;
          }
        }
      }

      .radio {
        font-size: 12px;
        color: #555;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .meta {
      display: flex;
      gap: 20px;
      flex-shrink: 0;
      font-size: 12px;
      color: #555;

      .score {
        color: #FF4D4F;
        font-weight: 500;
      }
    }
  }

  .loading {
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
`
