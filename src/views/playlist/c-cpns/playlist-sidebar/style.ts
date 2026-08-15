import styled from "styled-components"

export const PlaylistSidebarWrapper = styled.div`
  padding: 20px;

  .stats-card {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #1F2230;

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .stat-value {
        font-size: 14px;
        font-weight: bold;
        color: #6A6A6A;
      }

      .stat-label {
        font-size: 12px;
        color: #6A6A6A;
        margin-top: 2px;
      }
    }
  }

  .section-title {
    font-size: 14px;
    font-weight: bold;
    color: #B3B3B3;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #1F2230;
  }

  .related-list {
    .related-item {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
      cursor: pointer;
      border-radius: 8px;
      padding: 6px;
      transition: background 0.25s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.04);
        .name {
          color: #FF4D4F;
        }
      }

      img {
        width: 42px;
        height: 42px;
        object-fit: cover;
        flex-shrink: 0;
        border-radius: 4px;
      }

      .info {
        flex: 1;
        min-width: 0;

        .name {
          font-size: 12px;
          color: #B3B3B3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .meta {
          font-size: 11px;
          color: #6A6A6A;
          margin-top: 2px;
        }
      }
    }
  }

  .empty {
    font-size: 12px;
    color: #6A6A6A;
    text-align: center;
    padding: 20px 0;
  }
`
