import styled from 'styled-components'

export const HotSongWrapper = styled.div`
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

  .song-table {
    border: 1px solid #1F2230;

    .table-header {
      display: flex;
      align-items: center;
      height: 36px;
      background: #0F1117;
      border-bottom: 2px solid #FF4D4F;
      font-size: 13px;
      color: #6A6A6A;

      .col-index {
        width: 72px;
        text-align: center;
      }

      .col-song {
        flex: 1;
        padding-left: 10px;
      }

      .col-duration {
        width: 90px;
        text-align: center;
      }
    }

    .table-body {
      .song-row {
        display: flex;
        align-items: center;
        height: 36px;
        font-size: 13px;
        color: #B3B3B3;
        cursor: pointer;

        &:nth-child(even) {
          background: #171A21;
        }

        &:hover {
          background: #2A2C32;
        }

        &.active {
          background: rgba(255,77,79,0.12);
          color: #FF4D4F;

          .col-index .index-num { color: #FF4D4F; }
          .col-duration { color: #FF4D4F; }
          .col-song a { color: #FF4D4F; }
        }

        .col-index {
          width: 72px;
          text-align: center;

          .index-num {
            color: #6A6A6A;
          }
        }

        .col-song {
          flex: 1;
          padding-left: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          a {
            color: #b3b3b3;
            text-decoration: none;
            &:hover { color: #fff; }
          }
        }

        .col-duration {
          width: 90px;
          text-align: center;
          color: #6A6A6A;
          font-size: 12px;
        }
      }
    }
  }

  .empty {
    padding: 20px 0;
    color: #6A6A6A;
    font-size: 13px;
  }
`
