import styled from 'styled-components'

export const LyricPanelWrapper = styled.div<{ $visible: boolean; $closing: boolean }>`
  position: fixed;
  z-index: 999;
  inset: 0;
  background: rgba(15, 17, 23, 0.92);
  backdrop-filter: blur(8px);
  display: ${({ $visible, $closing }) => ($visible || $closing ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${({ $visible, $closing }) => ($visible && !$closing ? 1 : 0)};
  transition: opacity 0.5s ease;
`

export const LyricClose = styled.button`
  position: absolute;
  top: 32px;
  right: 48px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`

export const LyricScroll = styled.div`
  width: 560px;
  max-height: 70vh;
  overflow-y: auto;
  padding: 35vh 0;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 15%,
    black 85%,
    transparent 100%
  );
`

export const LyricInner = styled.div``

export const LyricLine = styled.p<{ $distance: number }>`
  text-align: center;
  font-size: ${({ $distance }) =>
    $distance === 0 ? '22px' : $distance === 1 ? '18px' : '15px'};
  font-weight: ${({ $distance }) =>
    $distance === 0 ? '700' : $distance === 1 ? '500' : '400'};
  color: ${({ $distance }) =>
    $distance === 0
      ? '#FF4D4F'
      : $distance === 1
        ? 'rgba(255,255,255,0.75)'
        : 'rgba(255,255,255,0.4)'};
  line-height: 2.6;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
`

export const LyricSongTitle = styled.div`
  margin-bottom: 32px;
  text-align: center;

  .name {
    font-size: 20px;
    color: #fff;
    font-weight: 600;
  }

  .artist {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 6px;
  }
`

export const NoLyric = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  text-align: center;
`

export const LyricBottomBar = styled.div<{ $playMode: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  .left {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 160px;
    flex-shrink: 0;

    .cover {
      width: 36px;
      height: 36px;
      border-radius: 6px;
      flex-shrink: 0;
      object-fit: cover;
    }

    .meta {
      min-width: 0;

      .name {
        font-size: 13px;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .artist {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }

  .center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    .controls {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;

      .btn {
        width: 24px;
        height: 24px;
        border: none;
        cursor: pointer;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.7);
        font-size: 10px;
        transition: all 0.2s;

        &:hover {
          color: #fff;
          transform: scale(1.15);
        }
      }

      .play-btn {
        width: 32px;
        height: 32px;
        font-size: 14px;
        background: #FF4D4F;
        border-radius: 50%;
        color: #fff;

        &:hover {
          background: #ff7875;
        }
      }
    }

    .progress-wrap {
      flex: 1;
      max-width: 360px;
      display: flex;
      align-items: center;
      gap: 8px;

      .time {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.4);
        flex-shrink: 0;
      }

      [data-slot="slider"] {
        flex: 1;
      }

      [data-slot="slider-track"] {
        background: rgba(255, 255, 255, 0.12);
      }
      [data-slot="slider-range"] {
        background: #FF4D4F;
      }
      [data-slot="slider-thumb"] {
        border-color: #FF4D4F;
      }
    }
  }

  .right {
    width: 160px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;

    .right-btn {
      width: 28px;
      height: 28px;
      border: none;
      cursor: pointer;
      background: none;
      color: rgba(255, 255, 255, 0.5);
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s;

      &:hover {
        color: #fff;
        transform: scale(1.1);
      }
    }

    [data-slot="slider"] {
      width: 80px;

      [data-slot="slider-track"] {
        background: rgba(255, 255, 255, 0.12);
      }
      [data-slot="slider-range"] {
        background: #FF4D4F;
      }
      [data-slot="slider-thumb"] {
        border-color: #FF4D4F;
      }
    }
  }
`
