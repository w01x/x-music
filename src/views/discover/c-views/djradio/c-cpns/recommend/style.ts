import styled from "styled-components"

export const RecommendWrapper = styled.div`
  width: 980px;
  margin: 0 auto;
  background: #0F1117;
  padding: 12px 20px;

  .header {
    display: flex;
    align-items: center;
    gap: 16px;
    height: 32px;
    border-bottom: 2px solid #FF4D4F;
    margin-bottom: 10px;

    h2 {
      font-size: 24px;
      font-weight: 400;
    }

    span {
      color: #6A6A6A;
      font-size: 13px;
    }
  }

  .list {
    border: 1px solid #e2e2e2;
  }

  .program-item {
    height: 64px;
    display: grid;
    grid-template-columns: 56px 28px 1.8fr 1fr 100px 64px;
    align-items: center;
    padding: 0 16px;
    border-bottom: 1px solid #f2f2f2;
    transition: background 0.2s;

    &:nth-child(2n) {
      background: #171A21;
    }

    &:hover {
      background: #171A21;
    }

    img {
      width: 44px;
      height: 44px;
      object-fit: cover;
      border: 3px solid #d0d0d0;
    }

    .play-btn {
      display: block;
      width: 16px;
      height: 17px;
      margin: 0 auto;
      background: none;
      cursor: pointer;
      transform: scale(1.5);
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.7);
      }
    }

    .name {
      font-size: 14px;
      color: #B3B3B3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 16px;

      a { color: inherit; }

      &:hover {
        color: #0c73c2;
      }
    }

    .radio {
      font-size: 13px;
      color: #6A6A6A;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .count,
    .like {
      font-size: 13px;
      color: #6A6A6A;
    }
  }

  .loading {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #6A6A6A;
  }
`
