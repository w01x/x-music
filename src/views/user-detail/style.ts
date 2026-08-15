import styled from 'styled-components'

export const BgWrapper = styled.div`
  min-height: 100vh;
  background: #0F1117;
`

export const DetailLayout = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 28px 16px;
`

/* ---- Header 卡片 ---- */
export const HeaderCard = styled.div`
  position: relative;
  padding: 32px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 6px;

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    border: 2px solid rgba(255,255,255,0.1);
  }

  .detail {
    flex: 1;
    min-width: 0;

    .nickname {
      font-size: 24px;
      font-weight: 700;
      color: ${(props) => props.theme.color.textPrimary};
      margin-bottom: 6px;
    }

    .stats {
      display: flex;
      gap: 24px;
      margin-bottom: 10px;

      span {
        font-size: 13px;
        color: ${(props) => props.theme.color.textSecondary};

        strong {
          color: ${(props) => props.theme.color.textPrimary};
          font-weight: 600;
          margin-right: 4px;
        }
      }
    }

    .sig {
      font-size: 13px;
      color: ${(props) => props.theme.color.textTertiary};
      line-height: 1.6;

      .sig-toggle {
        color: ${(props) => props.theme.color.primary};
        cursor: pointer;
        font-size: 12px;
        white-space: nowrap;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .actions {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }
`

export const ActionBtn = styled.button<{ $primary?: boolean }>`
  height: 34px;
  padding: 0 18px;
  border-radius: 20px;
  border: 1px solid ${({ $primary, ...props }) => $primary ? 'transparent' : props.theme.color.border};
  background: ${({ $primary, ...props }) => $primary ? props.theme.color.primary : 'transparent'};
  color: ${({ $primary, ...props }) => $primary ? '#fff' : props.theme.color.textSecondary};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: ${({ $primary, ...props }) => $primary ? props.theme.color.primaryHover : 'rgba(255,255,255,0.06)'};
    color: ${({ $primary }) => $primary ? '#fff' : 'inherit'};
  }
`

/* ---- Tab 栏 ---- */
export const TabBar = styled.div`
  display: flex;
  gap: 0;
  padding: 8px 0 0;
  margin-bottom: 20px;
  border-bottom: 1px solid ${(props) => props.theme.color.border};
`

export const TabItem = styled.button<{ $active?: boolean }>`
  position: relative;
  padding: 12px 24px;
  background: none;
  border: none;
  color: ${({ $active, ...props }) => $active ? props.theme.color.textPrimary : props.theme.color.textTertiary};
  font-size: 14px;
  font-weight: ${({ $active }) => $active ? 600 : 400};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.color.textPrimary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ $active }) => $active ? '28px' : '0'};
    height: 3px;
    border-radius: 2px;
    background: ${(props) => props.theme.color.primary};
    transition: width 0.2s;
  }
`

/* ---- 歌单 / 收藏 Grid ---- */
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
`

export const PlaylistCard = styled.div`
  background: ${(props) => props.theme.color.card};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;

  &:hover {
    border-color: rgba(255,255,255,0.06);
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    transform: translateY(-2px);
  }

  .cover-wrap {
    position: relative;
    overflow: hidden;
  }

  .cover {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    display: block;
  }

  .cover-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    .play-icon {
      width: 40px;
      height: 40px;
      color: #fff;
      opacity: 0;
      transition: opacity 0.2s;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
    }
  }

  &:hover .cover-overlay {
    background: rgba(0,0,0,0.4);

    .play-icon {
      opacity: 1;
    }
  }

  .meta {
    padding: 8px 10px 10px;

    .name {
      font-size: 12px;
      font-weight: 500;
      color: ${(props) => props.theme.color.textPrimary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 2px;
    }

    .count {
      font-size: 11px;
      color: ${(props) => props.theme.color.textTertiary};
    }
  }
`

/* ---- 动态卡片 ---- */
export const EventCard = styled.div`
  background: ${(props) => props.theme.color.card};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 12px;
  border: 1px solid ${(props) => props.theme.color.border};
  transition: all 0.2s;
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
    gap: 10px;
    margin-bottom: 12px;

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
    }

    .ev-user {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .ev-name {
        color: ${(props) => props.theme.color.textPrimary};
        font-size: 13px;
        font-weight: 500;
      }

      .ev-meta {
        color: ${(props) => props.theme.color.textTertiary};
        font-size: 11px;
      }
    }
  }

  .ev-text {
    color: ${(props) => props.theme.color.textSecondary};
    font-size: 14px;
    line-height: 1.7;
    word-break: break-all;
    margin-bottom: 10px;
  }

  .ev-pics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    margin-bottom: 10px;
    max-width: 420px;

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 4px;
      object-fit: cover;
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

      &:hover {
        color: ${(props) => props.theme.color.primary};
      }

      &.liked {
        color: #FF4D4F;
      }
    }
  }
`

export const SectionTitle = styled.h4`
  padding: 0 0 16px;
  color: ${(props) => props.theme.color.textSecondary};
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;

  .view-more {
    margin-left: auto;
  }
`

export const ViewMore = styled.span`
  margin-left: auto;
  font-size: 13px;
  font-weight: 400;
  color: ${(props) => props.theme.color.textTertiary};
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: ${(props) => props.theme.color.primary};
  }
`

export const EmptyTip = styled.div`
  color: ${(props) => props.theme.color.textTertiary};
  font-size: 14px;
  text-align: center;
  padding: 80px 0;
`

/* ---- 歌曲行 ---- */
export const SongRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;
`

export const SongCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: ${(props) => props.theme.color.card};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid transparent;

  &:hover {
    border-color: rgba(255,255,255,0.06);
    background: ${(props) => props.theme.color.cardHover};
  }

  .cover {
    width: 48px;
    height: 48px;
    border-radius: 6px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .info {
    flex: 1;
    min-width: 0;

    .name {
      font-size: 13px;
      font-weight: 500;
      color: ${(props) => props.theme.color.textPrimary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 2px;
    }

    .artist {
      font-size: 11px;
      color: ${(props) => props.theme.color.textTertiary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`

export const Divider = styled.div`
  height: 1px;
  background: ${(props) => props.theme.color.border};
  margin: 20px 0 24px;
  opacity: 1;
`

export const LoadMoreBtn = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  background: ${(props) => props.theme.color.card};
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: 12px;
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
`
