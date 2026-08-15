import styled from "styled-components"
import spriteCover from '@/assets/img/sprite_cover.png'

export const AlbumInfoWrapper = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;

  .cover {
    width: 208px;
    height: 208px;
    flex-shrink: 0;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 1px solid #1F2230;
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url(${spriteCover}) no-repeat;
      background-position: 0 -1285px;
    }
  }

  .info {
    flex: 1;

    .title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;

      .tag {
        width: 54px;
        height: 24px;
        background-position: 0 -186px;
        flex-shrink: 0;
      }

      h2 {
        font-size: 20px;
        font-weight: normal;
        color: #B3B3B3;
        line-height: 24px;
      }
    }

    .artist {
      margin-bottom: 12px;
      font-size: 12px;
      color: #6A6A6A;

      a {
        color: #0c73c2;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .meta {
      margin-bottom: 12px;
      font-size: 12px;
      color: #6A6A6A;
      line-height: 20px;

      p {
        margin: 0;
      }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;

      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        height: 31px;
        padding: 0 12px;
        border: none;
        border-radius: 3px;
        font-size: 12px;
        cursor: pointer;

        &-play {
          background: #2e7ad6;
          color: #fff;

          &:hover {
            background: #4b9cf0;
          }

          i {
            width: 20px;
            height: 18px;
            background-position: -2px -1622px;
          }
        }

        &-favor {
          background: #f2f2f2;
          color: #B3B3B3;
          border: 1px solid #1F2230;

          &:hover {
            background: #2A2C32;
          }
        }

        &-share {
          background: #f2f2f2;
          color: #B3B3B3;
          border: 1px solid #1F2230;

          &:hover {
            background: #2A2C32;
          }
        }
      }
    }

    .desc {
      font-size: 12px;
      color: #6A6A6A;
      line-height: 20px;

      h3 {
        font-size: 12px;
        font-weight: bold;
        color: #B3B3B3;
        margin-bottom: 4px;
      }

      p {
        margin: 0;
        white-space: pre-wrap;
      }
    }
  }
`
