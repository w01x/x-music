import styled from "styled-components"

export const PlaylistInfoWrapper = styled.div`
  display: flex;
  gap: 32px;

  .cover {
    width: 220px;
    height: 220px;
    flex-shrink: 0;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 8px 40px rgba(0,0,0,0.5);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.82);
    }
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;

      h2 {
        font-size: 26px;
        font-weight: 700;
        color: #fff;
        line-height: 1.3;
      }
    }

    .creator {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      font-size: 13px;
      color: rgba(255,255,255,0.5);

      img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }

      a {
        color: rgba(255,255,255,0.7);
        text-decoration: none;

        &:hover {
          color: #fff;
        }
      }

      .time {
        color: rgba(255,255,255,0.35);
      }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;

      .btn {
        height: 36px;
        padding: 0 20px;
        border: none;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;

        &-play {
          background: #FF4D4F;
          color: #fff;

          &:hover {
            background: #ff7875;
            transform: scale(1.04);
          }
        }

        &-favor {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.08);

          &:hover {
            background: rgba(255,255,255,0.1);
            color: #fff;
            border-color: rgba(255,255,255,0.15);
          }
        }
      }
    }

    .tags {
      margin-bottom: 12px;
      font-size: 12px;
      color: rgba(255,255,255,0.4);

      span {
        display: inline-block;
        padding: 2px 10px;
        margin-right: 6px;
        margin-top: 4px;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        color: rgba(255,255,255,0.5);
        font-size: 12px;
        cursor: pointer;
        transition: all 0.15s;

        &:hover {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.8);
          border-color: rgba(255,255,255,0.15);
        }
      }
    }

    .desc {
      font-size: 13px;
      color: rgba(255,255,255,0.45);
      line-height: 22px;

      p {
        margin: 0;
        white-space: pre-wrap;
      }
    }
  }
`
