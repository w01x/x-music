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
    padding: 6px 0;
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
        margin-bottom: 4px;

        .nickname {
          font-size: 12px;
          color: #0c73c2;
        }

        .time {
          font-size: 12px;
          color: #6A6A6A;
          flex: 1;
        }

        .like-btn {
          margin-left: auto;
        }
      }

      .actions-row {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
        margin-bottom: 4px;
      }

      .comment-divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.04);
        margin-top: 10px;
      }

      .be-replied {
        padding: 6px 10px;
        margin-bottom: 6px;
        background: #0F1117;
        border-left: 3px solid #FF4D4F;
        border-radius: 2px;
        font-size: 12px;
        line-height: 1.5;

        .reply-target {
          color: #0c73c2;
        }

        .reply-text {
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

  .floor-replies {
    margin-left: 50px;
    padding: 4px 0 4px 16px;
    border-left: 2px solid #e8e8e8;

    .load-more-floors {
      padding: 6px 0;
      font-size: 12px;
      color: #0c73c2;
      background: none;
      border: none;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }

      &:disabled {
        color: #6A6A6A;
        cursor: not-allowed;
        text-decoration: none;
      }
    }
  }

  .floor-item {
    border-bottom: 1px dotted #f0f0f0;
    padding: 8px 0;

    &:last-child {
      border-bottom: none;
    }
  }

  .comment-msg {
    margin-bottom: 12px;
    font-size: 13px;

    &.ok {
      color: #52c41a;
    }

    &.err {
      color: #FF4D4F;
    }
  }

  .comment-scroll {
    max-height: 500px;
    overflow-y: auto;
    padding-right: 8px;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #2A2C32;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }

  .comment-input {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    padding: 12px 0;

    textarea {
      flex: 1;
      height: 64px;
      padding: 8px 12px;
      font-size: 13px;
      color: #B3B3B3;
      border: 1px solid #1F2230;
      border-radius: 4px;
      resize: none;
      outline: none;

      &:focus {
        border-color: #FF4D4F;
      }

      &::placeholder {
        color: #bbb;
      }

      &:disabled {
        background: #171A21;
      }
    }

    .send-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .cancel-reply {
      font-size: 11px;
      color: #6A6A6A;
      cursor: pointer;

      &:hover {
        color: #FF4D4F;
      }
    }

    .send-btn {
      width: 60px;
      height: 64px;
      background: #FF4D4F;
      color: #fff;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover:not(:disabled) {
        background: #a00a0a;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  .del-btn {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    align-self: center;
    background: transparent;
    border: none;
    color: #ccc;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    border-radius: 50%;

    &:hover:not(:disabled) {
      color: #FF4D4F;
      background: rgba(255, 77, 79, 0.08);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  .reply-btn {
    font-size: 12px;
    color: #6A6A6A;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;

    &:hover {
      color: #FF4D4F;
    }
  }

  .like-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 10px;
    font-size: 12px;
    color: #6A6A6A;
    background: #171A21;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      color: #FF4D4F;
      background: rgba(255, 77, 79, 0.08);
    }

    &.liked {
      color: #FF4D4F;
      background: rgba(255, 77, 79, 0.08);
    }

    &:disabled {
      opacity: 0.5;
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
