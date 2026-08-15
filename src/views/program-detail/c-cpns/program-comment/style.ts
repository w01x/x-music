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

  .comment-input {
    display: flex;
    gap: 10px;
    margin-bottom: 12px;

    textarea {
      flex: 1;
      height: 60px;
      padding: 8px 10px;
      font-size: 13px;
      border: 1px solid #1F2230;
      border-radius: 2px;
      resize: vertical;
      outline: none;

      &:focus {
        border-color: #FF4D4F;
      }
    }

    .send-btn {
      width: 66px;
      height: 60px;
      font-size: 13px;
      color: #fff;
      background: #FF4D4F;
      border: none;
      border-radius: 2px;
      cursor: pointer;
      flex-shrink: 0;

      &:hover {
        background: #a00;
      }

      &:disabled {
        background: #2A2C32;
        cursor: not-allowed;
      }
    }
  }

  .comment-msg {
    margin-bottom: 12px;
    padding: 4px 10px;
    font-size: 12px;
    border-radius: 2px;

    &.ok {
      color: #52c41a;
      background: #f6ffed;
      border: 1px solid #b7eb8f;
    }

    &.err {
      color: #f5222d;
      background: rgba(255, 77, 79, 0.08);
      border: 1px solid #ffa39e;
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

    .del-btn {
      width: 20px;
      height: 20px;
      font-size: 14px;
      color: #6A6A6A;
      background: none;
      border: none;
      cursor: pointer;
      flex-shrink: 0;
      align-self: center;

      &:hover {
        color: #FF4D4F;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }
  }

  .like-btn {
    margin-top: 6px;
    padding: 2px 8px;
    font-size: 12px;
    color: #6A6A6A;
    background: #171A21;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    cursor: pointer;

    &:hover {
      background: #2A2C32;
    }

    &.liked {
      color: #FF4D4F;
      border-color: #FF4D4F;
      background: rgba(255, 77, 79, 0.08);
    }

    &:disabled {
      cursor: not-allowed;
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
