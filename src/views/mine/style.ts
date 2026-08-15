import styled from "styled-components"

export const BgWrapper = styled.div<{ $loggedIn?: boolean }>`
  height: calc(100vh - 64px - 90px);
  overflow: hidden;
  background: ${(props) => props.theme.color.bg};
`

export const PlaylistLayout = styled.div`
  display: flex;
  height: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 8px 12px 4px;
  gap: 12px;
  overflow: hidden;
`

export const PlaylistNav = styled.div`
  width: 300px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.color.card};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.color.border};
`

export const NavSection = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #2A2C32;
    border-radius: 2px;
  }
`

export const SectionTitle = styled.h4`
  display: flex;
  align-items: center;
  padding: 10px 12px 6px;
  color: ${(props) => props.theme.color.textTertiary};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const NavItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  cursor: pointer;
  background: ${({ $active }) => ($active ? '#1F2230' : 'transparent')};
  border-left: 3px solid ${({ $active }) => ($active ? '#FF4D4F' : 'transparent')};
  transition: background 0.1s;

  &:hover {
    background: ${({ $active }) => ($active ? '#1F2230' : 'rgba(255,255,255,0.04)')};
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow: hidden;

    .name {
      color: ${({ $active }) => ($active ? '#fff' : '#B3B3B3')};
      font-size: 13px;
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

  }

  .delete-btn {
    margin-left: auto;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    display: none;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 50%;
    color: #888;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    transition: color 0.15s, background 0.15s;

    &:hover {
      color: #FF4D4F;
      background: rgba(255, 77, 79, 0.1);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &:hover .delete-btn {
    display: flex;
  }
`

export const PlaylistHeader = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;

  .cover {
    width: 120px;
    height: 120px;
    border-radius: 12px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 8px;

    h2 {
      color: ${(props) => props.theme.color.textPrimary};
      font-size: 20px;
      font-weight: 600;
      line-height: 1.3;
    }

    .creator {
      display: flex;
      align-items: center;
      gap: 6px;
      color: ${(props) => props.theme.color.textSecondary};
      font-size: 12px;

      .avatar {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        object-fit: cover;
      }

      .sep {
        color: ${(props) => props.theme.color.textTertiary};
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;

      .tag {
        padding: 2px 10px;
        background: ${(props) => props.theme.color.cardHover};
        color: ${(props) => props.theme.color.textSecondary};
        font-size: 11px;
        border-radius: 12px;
      }
    }

    .stats {
      color: ${(props) => props.theme.color.textSecondary};
      font-size: 12px;

      .sep {
        margin: 0 8px;
        color: ${(props) => props.theme.color.textTertiary};
      }
    }

    .desc {
      color: ${(props) => props.theme.color.textTertiary};
      font-size: 12px;
      line-height: 1.7;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
`

export const TrackListSection = styled.div`
  flex: 1;
  background: ${(props) => props.theme.color.card};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  overflow-y: auto;
  border: 1px solid ${(props) => props.theme.color.border};

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #2A2C32;
    border-radius: 3px;
  }

  .track-header {
    display: flex;
    align-items: baseline;
    gap: 16px;
    padding: 12px 16px 8px;

    h3 {
      color: ${(props) => props.theme.color.textPrimary};
      font-size: 16px;
      font-weight: 600;
    }

    .track-count {
      color: ${(props) => props.theme.color.textSecondary};
      font-size: 12px;
    }
  }
`

export const UserStatsRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`

export const StatCard = styled.div`
  flex: 1;
  background: ${(props) => props.theme.color.card};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: 20px;
  border: 1px solid ${(props) => props.theme.color.border};
  text-align: center;

  .stat-number {
    font-size: 28px;
    font-weight: 700;
    color: ${(props) => props.theme.color.textPrimary};
  }

  .stat-label {
    font-size: 12px;
    color: ${(props) => props.theme.color.textTertiary};
    margin-top: 4px;
  }
`

export const RightSidebar = styled.aside`
  width: 280px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const SidebarCard = styled.div`
  background: ${(props) => props.theme.color.card};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: 20px;
  border: 1px solid ${(props) => props.theme.color.border};

  .card-title {
    font-size: 14px;
    font-weight: 600;
    color: ${(props) => props.theme.color.textPrimary};
    margin-bottom: 12px;
  }

  .card-text {
    font-size: 13px;
    color: ${(props) => props.theme.color.textTertiary};
    line-height: 1.6;
  }
`

export const CreateBtn = styled.button`
  margin-left: auto;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: 50%;
  color: ${(props) => props.theme.color.textSecondary};
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s, background 0.15s;

  &:hover {
    color: #fff;
    border-color: ${(props) => props.theme.color.textSecondary};
    background: rgba(255, 255, 255, 0.06);
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`

export const ModalBox = styled.div`
  width: 380px;
  background: ${(props) => props.theme.color.card};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  border: 1px solid ${(props) => props.theme.color.border};

  h3 {
    color: ${(props) => props.theme.color.textPrimary};
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  input {
    width: 100%;
    height: 40px;
    padding: 0 12px;
    background: ${(props) => props.theme.color.bg};
    border: 1px solid ${(props) => props.theme.color.border};
    border-radius: ${(props) => props.theme.borderRadius.sm};
    color: ${(props) => props.theme.color.textPrimary};
    font-size: 13px;
    outline: none;
    transition: border-color 0.15s;

    &::placeholder {
      color: ${(props) => props.theme.color.textTertiary};
    }

    &:focus {
      border-color: #FF4D4F;
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;

    button {
      height: 34px;
      padding: 0 20px;
      border: none;
      border-radius: ${(props) => props.theme.borderRadius.sm};
      font-size: 13px;
      cursor: pointer;
      transition: opacity 0.15s;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .btn-cancel {
      background: ${(props) => props.theme.color.bg};
      color: ${(props) => props.theme.color.textSecondary};

      &:hover:not(:disabled) {
        background: ${(props) => props.theme.color.cardHover};
      }
    }

    .btn-confirm {
      background: #FF4D4F;
      color: #fff;

      &:hover:not(:disabled) {
        background: ${(props) => props.theme.color.primaryHover};
      }
    }
  }

  .error-text {
    color: #FF4D4F;
    font-size: 12px;
    margin-top: 8px;
  }

  .success-state {
    text-align: center;
    padding: 16px 0;

    h3 {
      color: ${(props) => props.theme.color.textPrimary};
      margin-bottom: 8px;
    }

    p {
      color: ${(props) => props.theme.color.textSecondary};
      font-size: 13px;
    }
  }
`

export const EmptyTip = styled.div`
  color: ${(props) => props.theme.color.textTertiary};
  font-size: 13px;
  text-align: center;
  padding: 60px 0;
`

export const LoginToast = styled.div`
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  background: ${(props) => props.theme.color.card};
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: 12px;
  padding: 12px 24px;
  color: ${(props) => props.theme.color.textPrimary};
  font-size: 13px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  animation: fadeInDown 0.25s ease;
`

export const RecentWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px;
`

export const RecentSection = styled.div`
  margin-bottom: 32px;
`

export const RecentPlaylistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
`

export const RecentPlaylistCard = styled.div`
  background: ${(props) => props.theme.color.card};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: 12px;
  border: 1px solid ${(props) => props.theme.color.border};
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: ${(props) => props.theme.color.cardHover};
    border-color: #2A2C32;
  }

  img {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  .name {
    color: ${(props) => props.theme.color.textPrimary};
    font-size: 13px;
    font-weight: 500;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 4px;
  }

  .count {
    color: ${(props) => props.theme.color.textTertiary};
    font-size: 11px;
  }
`

export const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 0 0 12px;

  h3 {
    color: ${(props) => props.theme.color.textPrimary};
    font-size: 18px;
    font-weight: 600;
  }

  .count {
    color: ${(props) => props.theme.color.textSecondary};
    font-size: 12px;
  }
`
