import styled from "styled-components"

export const HotArtistWrapper = styled.div`
  .header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 40px;

    h2 {
      font-size: 32px;
      font-weight: 700;
      color: #f5f5f7;
      margin: 0;
    }

    .all-link {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.4);
      cursor: pointer;
      transition: all 0.25s ease;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 4px;

      &:hover {
        color: #ff4d4f;
      }

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  .list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 32px 24px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px 12px;
    }
  }

  .tag-cloud {
    margin-top: 56px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .tag-item {
      padding: 8px 20px;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.55);
      background: rgba(255, 255, 255, 0.04);
      border: none;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.25s ease;
      white-space: nowrap;

      &:hover {
        color: #ff4d4f;
        background: rgba(255, 77, 79, 0.12);
      }
    }
  }
`
