import styled from "styled-components"

export const BgWrapper = styled.div<{ $loggedIn?: boolean }>`
  height: 100%;
  background: ${({ $loggedIn }) => ($loggedIn ? '#0F1117' : '#0F1117')};
`

export const CommunityLayout = styled.div`
  display: flex;
  height: calc(100vh - 64px - 90px);
  max-width: 1100px;
  margin: 0 auto;
  padding: 12px 16px 0;
  gap: 16px;
`

export const SectionTitle = styled.h4`
  padding: 0 0 16px;
  color: ${(props) => props.theme.color.textSecondary};
  font-size: 14px;
  font-weight: 600;
`

export const FollowPanel = styled.div`
  width: 280px;
  min-width: 280px;
  background: ${(props) => props.theme.color.card};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: 20px;
  overflow-y: auto;
  height: 100%;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #2A2C32;
    border-radius: 2px;
  }
`

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 95%;
    height: 1px;
    background: rgba(98, 98, 98, 0.89);
  }

  &:last-child::after {
    display: none;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow: hidden;

    .name {
      color: ${(props) => props.theme.color.textPrimary};
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sig {
      color: ${(props) => props.theme.color.textTertiary};
      font-size: 11px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`

export const FeedPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;

  /* ---- 标签栏 ---- */
  .feed-tabs {
    display: flex;
    gap: 0;
    padding: 0 0 12px;
    flex-shrink: 0;
    border-bottom: 1px solid ${(props) => props.theme.color.border};
    margin-bottom: 0;
  }

  .tab-item {
    position: relative;
    padding: 8px 20px;
    background: none;
    border: none;
    color: ${(props) => props.theme.color.textTertiary};
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: ${(props) => props.theme.color.textSecondary};
    }

    &.active {
      color: ${(props) => props.theme.color.textPrimary};
      font-weight: 600;

      &::after {
        content: '';
        position: absolute;
        bottom: -13px;
        left: 50%;
        transform: translateX(-50%);
        width: 24px;
        height: 3px;
        border-radius: 2px;
        background: ${(props) => props.theme.color.primary};
      }
    }
  }

  /* ---- 可滑动列表 ---- */
  .feed-scroll {
    flex: 1;
    overflow-y: auto;
    padding-top: 16px;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #2A2C32;
      border-radius: 3px;
    }
  }

  .load-more-btn {
    display: block;
    width: 100%;
    padding: 12px;
    margin-top: 8px;
    background: ${(props) => props.theme.color.card};
    border: 1px solid ${(props) => props.theme.color.border};
    border-radius: ${(props) => props.theme.borderRadius.lg};
    color: ${(props) => props.theme.color.textSecondary};
    font-size: 13px;
    cursor: pointer;
    transition: all 0.15s;

    &:hover:not(:disabled) {
      color: ${(props) => props.theme.color.textPrimary};
      background: ${(props) => props.theme.color.cardHover};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .tab-refresh {
    margin-left: auto;
    padding: 6px 8px;
    background: none;
    border: none;
    color: ${(props) => props.theme.color.textTertiary};
    font-size: 16px;
    cursor: pointer;
    transition: color 0.2s;

    &:hover:not(:disabled) {
      color: ${(props) => props.theme.color.primary};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`

export const Composer = styled.div`
  flex-shrink: 0;
  background: ${(props) => props.theme.color.card};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: 12px 16px;
  margin-bottom: 16px;
  border: 1px solid ${(props) => props.theme.color.border};

  .composer-input {
    width: 100%;
    min-height: 40px;
    background: transparent;
    border: none;
    color: ${(props) => props.theme.color.textPrimary};
    font-size: 14px;
    resize: none;
    outline: none;
    font-family: inherit;

    &::placeholder {
      color: ${(props) => props.theme.color.textTertiary};
    }
  }

  .composer-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid ${(props) => props.theme.color.border};

    .action-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: ${(props) => props.theme.borderRadius.full};
      background: transparent;
      border: none;
      color: ${(props) => props.theme.color.textSecondary};
      font-size: 13px;
      cursor: pointer;
      transition: all 0.15s;

      &:hover {
        color: ${(props) => props.theme.color.textPrimary};
        background: rgba(255, 255, 255, 0.06);
      }

      .anticon {
        font-size: 16px;
      }
    }

    .publish-btn {
      margin-left: auto;
      height: 28px;
      padding: 0 16px;
      border-radius: ${(props) => props.theme.borderRadius.full};
      border: none;
      background: ${(props) => props.theme.color.primary};
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;

      &:hover {
        background: ${(props) => props.theme.color.primaryHover};
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  .composer-attachment {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    margin-bottom: 8px;
    background: rgba(255,255,255,0.04);
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.06);

    .att-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;

      .att-name {
        font-size: 13px;
        color: ${(props) => props.theme.color.textPrimary};
        font-weight: 500;
      }

      .att-artist {
        font-size: 11px;
        color: ${(props) => props.theme.color.textTertiary};
      }
    }

    .att-remove {
      font-size: 14px;
      color: ${(props) => props.theme.color.textTertiary};
      cursor: pointer;
      padding: 4px;

      &:hover {
        color: #FF4D4F;
      }
    }
  }

  .composer-song-picker {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid ${(props) => props.theme.color.border};

    .song-search-bar {
      display: flex;
      gap: 8px;

      input {
        flex: 1;
        height: 30px;
        padding: 0 8px;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 6px;
        color: ${(props) => props.theme.color.textPrimary};
        font-size: 13px;
        outline: none;

        &::placeholder {
          color: ${(props) => props.theme.color.textTertiary};
        }
      }

      button {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 6px;
        color: ${(props) => props.theme.color.textSecondary};
        cursor: pointer;
        font-size: 14px;

        &:hover {
          background: rgba(255,255,255,0.1);
        }
      }
    }

    .song-results {
      margin-top: 6px;
      max-height: 160px;
      overflow-y: auto;

      .song-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.1s;

        &:hover {
          background: rgba(255,255,255,0.04);
        }

        .si-cover {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          object-fit: cover;
          flex-shrink: 0;

          &.si-cover-placeholder {
            background: rgba(255,255,255,0.08);
          }
        }

        .si-name {
          font-size: 13px;
          color: ${(props) => props.theme.color.textPrimary};
          flex-shrink: 0;
        }

        .si-sep {
          font-size: 13px;
          color: ${(props) => props.theme.color.textTertiary};
          margin: 0 4px;
        }

        .si-artist {
          font-size: 13px;
          color: ${(props) => props.theme.color.textTertiary};
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .song-searching,
    .song-empty {
      margin-top: 8px;
      padding: 12px;
      text-align: center;
      font-size: 13px;
      color: ${(props) => props.theme.color.textTertiary};
    }
  }

  .action-btn.active {
    color: ${(props) => props.theme.color.primary} !important;
    background: rgba(255,255,255,0.08) !important;
  }
`

export const ResourceCard = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  margin-bottom: 6px;
  background: rgba(255,255,255,0.03);
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.05);

  .rc-cover {
    width: 44px;
    height: 44px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .rc-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;

    .rc-name {
      font-size: 13px;
      font-weight: 500;
      color: ${(props) => props.theme.color.textPrimary};
      align-self: flex-start;
    }

    .rc-artist {
      font-size: 11px;
      color: ${(props) => props.theme.color.textTertiary};
      align-self: flex-start;
    }
  }
`

export const EventCard = styled.div`
  background: ${(props) => props.theme.color.card};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: 20px;
  margin-bottom: 12px;
  border: 1px solid ${(props) => props.theme.color.border};
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: ${(props) => props.theme.color.cardHover};
  }

  .ev-own-menu {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 2;

    .ev-own-trigger {
      font-size: 18px;
      color: ${(props) => props.theme.color.textTertiary};
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: all 0.15s;

      &:hover {
        color: ${(props) => props.theme.color.textPrimary};
        background: rgba(255,255,255,0.06);
      }
    }

    .ev-own-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 4px;
      background: ${(props) => props.theme.color.card};
      border: 1px solid ${(props) => props.theme.color.border};
      border-radius: 8px;
      padding: 4px;
      min-width: 100px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);

      button {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 8px 12px;
        border: none;
        border-radius: 6px;
        background: none;
        color: ${(props) => props.theme.color.textSecondary};
        font-size: 13px;
        cursor: pointer;
        white-space: nowrap;

        &:hover {
          background: rgba(255,77,79,0.1);
          color: #FF4D4F;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
  }

  .ev-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .ev-user {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .ev-nickname {
        color: ${(props) => props.theme.color.textPrimary};
        font-size: 14px;
        font-weight: 500;
      }

      .ev-type {
        color: ${(props) => props.theme.color.textTertiary};
        font-size: 12px;
      }
    }
  }

  .ev-text {
    color: ${(props) => props.theme.color.textSecondary};
    font-size: 14px;
    line-height: 1.7;
    word-break: break-all;
    margin-bottom: 12px;
  }

  .ev-pics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    margin-bottom: 12px;

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: ${(props) => props.theme.borderRadius.sm};
      object-fit: cover;
      cursor: pointer;
      transition: opacity 0.15s;

      &:hover {
        opacity: 0.85;
      }
    }

    &.ev-pics--topic {
      grid-template-columns: repeat(3, 160px);
      gap: 4px;

      img {
        width: 160px;
        height: 160px;
        border-radius: 4px;
      }
    }
  }

  .ev-actions {
    display: flex;
    gap: 24px;
    padding-top: 12px;
    border-top: 1px solid ${(props) => props.theme.color.border};

    .action-item {
      display: flex;
      align-items: center;
      gap: 6px;
      color: ${(props) => props.theme.color.textTertiary};
      font-size: 13px;
      cursor: pointer;
      transition: color 0.15s;
      background: none;
      border: none;
      padding: 0;

      .anticon {
        font-size: 16px;
      }

      &:hover {
        color: ${(props) => props.theme.color.primary};
      }

      &.liked {
        color: #FF4D4F;
      }
    }
  }

  .ev-comments {
    border-top: 1px solid ${(props) => props.theme.color.border};
    padding: 12px 0 0;

    .ev-comments-loading,
    .ev-comments-empty {
      text-align: center;
      color: ${(props) => props.theme.color.textTertiary};
      font-size: 13px;
      padding: 16px 0;
    }

    .ev-comment-item {
      display: flex;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);

      &:last-child {
        border-bottom: none;
      }

      .c-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
        flex-shrink: 0;
      }

      .c-body {
        flex: 1;
        min-width: 0;

        .c-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;

          .c-nickname {
            font-size: 12px;
            font-weight: 600;
            color: ${(props) => props.theme.color.textPrimary};
            cursor: pointer;
          }

          .c-time {
            font-size: 11px;
            color: ${(props) => props.theme.color.textTertiary};
          }
        }

        .c-content {
          font-size: 13px;
          color: ${(props) => props.theme.color.textPrimary};
          line-height: 1.5;
          word-break: break-word;
        }
      }

      .c-del-btn {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: transparent;
        color: #666;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.15s;

        &:hover {
          color: #FF4D4F;
          background: rgba(255, 77, 79, 0.1);
        }
      }
    }

    .ev-comment-input {
      display: flex;
      gap: 8px;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.04);

      &--fixed {
        margin-top: 0;
        padding-top: 0;
        border-top: none;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      }

      input {
        flex: 1;
        height: 34px;
        padding: 0 12px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.04);
        color: #fff;
        font-size: 13px;
        outline: none;

        &::placeholder {
          color: #666;
        }

        &:focus {
          border-color: rgba(255, 255, 255, 0.15);
        }
      }

      button {
        height: 34px;
        padding: 0 16px;
        border-radius: 8px;
        border: none;
        background: #FF4D4F;
        color: #fff;
        font-size: 13px;
        cursor: pointer;
        flex-shrink: 0;

        &:hover {
          background: #ff7875;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }

    .ev-comments-scroll {
      max-height: 280px;
      overflow-y: auto;
      padding-top: 8px;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
      }
    }

    .ev-comments-more {
      display: block;
      width: 100%;
      padding: 10px 0;
      background: transparent;
      border: none;
      border-top: 1px solid rgba(255, 255, 255, 0.04);
      color: #888;
      font-size: 13px;
      cursor: pointer;
      text-align: center;
      transition: color 0.15s;

      &:hover {
        color: #fff;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`

export const EmptyTip = styled.div`
  color: ${(props) => props.theme.color.textTertiary};
  font-size: 14px;
  text-align: center;
  padding: 80px 0;
`
