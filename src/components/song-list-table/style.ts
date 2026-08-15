import styled from "styled-components"

export const SongListTableWrapper = styled.div`
  .header {
    display: flex;
    align-items: center;
    height: 36px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;

    .th {
      padding: 0 10px;
    }

    .th-index {
      width: 50px;
      text-align: center;
    }

    .th-title {
      flex: 1;
    }

    .th-duration {
      width: 80px;
      text-align: right;
    }

    .th-singer {
      width: 110px;
    }

    .th-album {
      width: 150px;
    }
  }

  .song-item {
    display: flex;
    align-items: center;
    height: 44px;
    border-radius: 8px;
    font-size: 13px;
    color: rgba(255,255,255,0.65);
    transition: background 0.15s;
    cursor: pointer;

    &:hover {
      background: rgba(255,255,255,0.04);

      .td-title .operator {
        opacity: 1;
      }

    }

    &.active {
      background: rgba(255,77,79,0.08);

      .td-index .num {
        color: #FF4D4F;
        font-weight: 700;
      }

      .td-title > a {
        color: #FF4D4F;
      }
    }

    .td {
      padding: 0 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .td-index {
      width: 50px;
      text-align: center;
      color: rgba(255,255,255,0.3);
      font-size: 12px;

      .play-icon {
        display: none;
        color: #fff;
        font-size: 10px;
      }
    }

    .td-title {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;

      img {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        object-fit: cover;
      }

      > a {
        color: rgba(255,255,255,0.65);
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:hover {
          color: #fff;
        }
      }

      .operator {
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 2px;
        opacity: 0;
        transition: opacity 0.15s;

        .btn {
          width: 28px;
          height: 28px;
          cursor: pointer;
          border: none;
          background: none;
          color: rgba(255,255,255,0.4);
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: all 0.15s;

          &.play:hover {
            color: #fff;
            background: rgba(255,255,255,0.08);
          }

          &.add:hover {
            color: #fff;
            background: rgba(255,255,255,0.08);
          }

          &.del:hover {
            color: #FF4D4F;
            background: rgba(255,77,79,0.1);
          }
        }
      }
    }

    .td-duration {
      width: 80px;
      text-align: right;
      color: rgba(255,255,255,0.3);
      font-size: 12px;
    }

    .td-singer {
      width: 110px;
      color: rgba(255,255,255,0.35);
      font-size: 12px;

      a {
        color: rgba(255,255,255,0.35);
        text-decoration: none;

        &:hover {
          color: rgba(255,255,255,0.7);
        }
      }
    }

    .td-album {
      width: 150px;
      color: rgba(255,255,255,0.35);
      font-size: 12px;

      a {
        color: rgba(255,255,255,0.35);
        text-decoration: none;

        &:hover {
          color: rgba(255,255,255,0.7);
        }
      }
    }
  }
`
