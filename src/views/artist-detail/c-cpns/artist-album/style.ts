import styled from 'styled-components'

export const ArtistAlbumWrapper = styled.div`
  margin-bottom: 30px;

  .title {
    display: flex;
    align-items: center;
    height: 24px;
    padding-left: 10px;
    border-left: 3px solid #FF4D4F;
    font-size: 20px;
    font-weight: 700;
    color: #B3B3B3;
    margin-bottom: 15px;
  }

  .album-list {
    display: flex;
    flex-wrap: wrap;
    gap: 18px;

    .album-item {
      width: 164px;
      cursor: pointer;

      &:hover .cover img {
        transform: scale(1.04);
      }

      .cover {
        display: block;
        width: 164px;
        height: 164px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.2s ease;
        }
      }

      .album-name {
        margin-top: 8px;
        font-size: 13px;
        color: #B3B3B3;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:hover {
          color: #E0E0E0;
          text-decoration: underline;
          cursor: pointer;
        }
      }

      .publish-time {
        margin-top: 2px;
        font-size: 12px;
        color: #6A6A6A;
      }
    }
  }

  .empty {
    padding: 20px 0;
    color: #6A6A6A;
    font-size: 13px;
  }
`
