import styled from 'styled-components'

export const PanelOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  z-index: 98;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
`

export const PanelWrapper = styled.div<{ $visible: boolean }>`
  position: fixed;
  z-index: 100;
  right: ${({ $visible }) => ($visible ? '0' : '-420px')};
  top: 0;
  bottom: 80px;
  width: 340px;
  max-width: 100vw;
  background: #171A21;
  border-left: 1px solid #1F2230;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
`

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #1F2230;
  flex-shrink: 0;

  .title {
    font-size: 16px;
    font-weight: 600;
    color: #E0E0E0;

    .count {
      font-size: 13px;
      font-weight: 400;
      color: #6A6A6A;
      margin-left: 8px;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 10px;

    .clear-btn {
      background: none;
      border: none;
      color: #6A6A6A;
      font-size: 13px;
      cursor: pointer;
      padding: 4px 10px;
      border-radius: 4px;
      transition: all 0.15s;

      &:hover {
        color: #E0E0E0;
        background: rgba(255, 255, 255, 0.06);
      }
    }

    .close-btn {
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.06);
      color: #6A6A6A;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;

      &:hover {
        background: rgba(255, 255, 255, 0.12);
        color: #fff;
      }
    }
  }
`

export const SongList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;

  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
`

export const SongRow = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 20px;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? 'rgba(255, 77, 79, 0.1)' : 'transparent'};
  transition: background 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.04);

    .delete-btn {
      opacity: 1;
    }
  }

  .playing-icon {
    width: 16px;
    margin-right: 10px;
    font-size: 12px;
    flex-shrink: 0;

    .bar {
      display: inline-block;
      width: 3px;
      background: #FF4D4F;
      border-radius: 1px;
      margin-right: 1px;
      animation: equalizer 0.8s ease-in-out infinite;

      &:nth-child(1) { height: 10px; animation-delay: 0s; }
      &:nth-child(2) { height: 16px; animation-delay: 0.15s; }
      &:nth-child(3) { height: 8px; animation-delay: 0.3s; }
      &:nth-child(4) { height: 13px; animation-delay: 0.45s; }
    }

    @keyframes equalizer {
      0%, 100% { transform: scaleY(1); }
      50% { transform: scaleY(0.4); }
    }
  }

  .index {
    width: 26px;
    text-align: center;
    color: #6A6A6A;
    font-size: 13px;
    flex-shrink: 0;
  }

  .song-info {
    flex: 1;
    min-width: 0;
    margin-left: 8px;

    .song-name {
      font-size: 14px;
      color: ${({ $active }) => ($active ? '#FF4D4F' : '#E0E0E0')};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .song-artist {
      font-size: 12px;
      color: ${({ $active }) =>
        $active ? 'rgba(255, 77, 79, 0.7)' : '#6A6A6A'};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .duration {
    font-size: 12px;
    color: #6A6A6A;
    margin: 0 12px;
    flex-shrink: 0;
  }

  .delete-btn {
    width: 22px;
    height: 22px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    color: #aaa;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    flex-shrink: 0;
    transition: all 0.15s;

    &:hover {
      background: rgba(255, 77, 79, 0.6);
      color: #fff;
    }
  }
`

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6A6A6A;
  font-size: 15px;

  .tip {
    margin-top: 10px;
    font-size: 13px;
    color: #6A6A6A;
  }
`
