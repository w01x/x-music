import styled from "styled-components"

export const CommentWrapper = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 2px solid #FF4D4F;

  .comment-header {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 20px;

    h3 {
      font-size: 20px;
      font-weight: normal;
      color: #B3B3B3;
    }

    .count {
      font-size: 12px;
      color: #6A6A6A;
    }
  }

  .hot-comments {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e8e8e8;

    h4 {
      font-size: 14px;
      font-weight: bold;
      color: #B3B3B3;
      margin-bottom: 16px;
    }
  }

  .latest-comments {
    h4 {
      font-size: 14px;
      font-weight: bold;
      color: #B3B3B3;
      margin-bottom: 16px;
    }
  }

  .comment-item {
    display: flex;
    gap: 10px;
    padding: 12px 0;
    border-bottom: 1px dotted #e0e0e0;

    &:last-child {
      border-bottom: none;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .content {
      flex: 1;
      min-width: 0;

      .meta {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;

        .nickname {
          font-size: 12px;
          color: #0c73c2;
        }

        .time {
          font-size: 12px;
          color: #6A6A6A;
        }
      }

      .text {
        font-size: 14px;
        color: #B3B3B3;
        line-height: 1.6;
        word-break: break-word;
      }
    }
  }

  .empty {
    text-align: center;
    padding: 40px 0;
    font-size: 12px;
    color: #6A6A6A;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin-top: 20px;
    flex-wrap: wrap;

    .ellipsis {
      width: 28px;
      text-align: center;
      font-size: 13px;
      color: #6A6A6A;
    }

    .page-btn {
      min-width: 28px;
      height: 28px;
      padding: 0 6px;
      font-size: 13px;
      color: #B3B3B3;
      background: #171A21;
      border: 1px solid #1F2230;
      border-radius: 2px;
      cursor: pointer;

      &:hover {
        background: #2A2C32;
      }

      &.active {
        color: #fff;
        background: #FF4D4F;
        border-color: #FF4D4F;
      }

      &:disabled {
        color: #6A6A6A;
        cursor: not-allowed;
      }
    }
  }
`
