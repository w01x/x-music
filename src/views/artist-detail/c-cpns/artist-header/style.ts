import styled from 'styled-components'

export const ArtistHeaderWrapper = styled.div`
  display: flex;
  padding: 40px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px 0;
    gap: 16px;
  }

  .avatar {
    width: 180px;
    height: 180px;
    flex-shrink: 0;

    @media (max-width: 768px) {
      width: 120px;
      height: 120px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    margin-left: 30px;
    flex: 1;

    .name {
      font-size: 24px;
      font-weight: 700;
      color: #B3B3B3;
      line-height: 1.2;
    }

    .alias {
      margin-top: 8px;
      font-size: 14px;
      color: #6A6A6A;
    }

    .stats {
      margin-top: 20px;
      display: flex;
      gap: 24px;

      span {
        font-size: 13px;
        color: #6A6A6A;
      }
    }

    .actions {
      margin-top: 20px;

      .btn-follow {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 31px;
        padding: 0 28px;
        font-size: 13px;
        color: #fff;
        background: #FF4D4F;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background: #cc1111;
        }
      }
    }
  }
`
