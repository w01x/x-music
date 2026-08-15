import styled from "styled-components"

export const AlbumSidebarWrapper = styled.div`
  padding: 20px;

  .section-title {
    font-size: 14px;
    font-weight: bold;
    color: #B3B3B3;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #1F2230;
  }

  .album-list {
    .album-item {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
      cursor: pointer;

      &:hover {
        .name {
          color: #0c73c2;
        }
      }

      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        flex-shrink: 0;
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
          margin-bottom: 4px;
        }

        .meta {
          font-size: 12px;
          color: #6A6A6A;
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
