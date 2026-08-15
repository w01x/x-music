import styled from "styled-components"
import spriteCover from '@/assets/img/sprite_cover.png'

export const PlaylistInfoWrapper = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;

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
      top: -4px;
      left: -4px;
      width: 216px;
      height: 216px;
      background: url(${spriteCover}) no-repeat;
      background-position: 0 -1285px;
    }
  }

  .info {
    flex: 1;
    min-width: 0;

    .title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;

      .tag {
        width: 54px;
        height: 24px;
        background-position: 0 -243px;
        flex-shrink: 0;
      }

      h2 {
        font-size: 20px;
        font-weight: normal;
        color: #B3B3B3;
        line-height: 24px;
      }
    }

    .creator {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      font-size: 12px;
      color: #6A6A6A;

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }

      a {
        color: #FF4D4F;

        &:hover {
          text-decoration: underline;
        }
      }

      .time {
        color: #6A6A6A;
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
          background: #FF4D4F;
          color: #fff;

          &:hover {
            background: #ff7875;
          }

          i {
            width: 20px;
            height: 18px;
            background-position: -2px -1622px;
          }
        }

        &-favor {
          background: #1F2230;
          color: #B3B3B3;
          border: 1px solid #1F2230;

          &:hover {
            background: #2A2C32;
          }
        }

        &-share {
          background: #1F2230;
          color: #B3B3B3;
          border: 1px solid #1F2230;

          &:hover {
            background: #2A2C32;
          }
        }
      }
    }

    .tags {
      margin-bottom: 12px;
      font-size: 12px;
      color: #6A6A6A;

      span {
        display: inline-block;
        padding: 0 8px;
        margin-right: 8px;
        margin-top: 4px;
        border: 1px solid #1F2230;
        border-radius: 10px;
        cursor: pointer;

        &:hover {
          background: #1F2230;
        }
      }
    }

    .desc {
      font-size: 12px;
      color: #6A6A6A;
      line-height: 20px;

      p {
        margin: 0;
        white-space: pre-wrap;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      &.expanded p {
        display: block;
        overflow: visible;
      }

      .toggle-desc {
        margin-top: 4px;
        padding: 0;
        border: none;
        background: none;
        color: #FF4D4F;
        font-size: 12px;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`
