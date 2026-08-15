import styled from 'styled-components'

export const PlayerBarWrapper = styled.div`
  position: fixed;
  z-index: 99;
  left: 240px;
  right: 0;
  bottom: 0;
  height: 90px;
  background: rgba(15, 17, 23, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid #1F2230;

  @media (max-width: 768px) {
    left: 0;
    height: 72px;
  }

  /* 底部全宽进度条：横贯整个播放栏 */
  .top-progress {
    position: absolute;
    bottom: 0;
    left: 24px;
    right: 24px;
    height: 12px;
    display: flex;
    align-items: center;
    z-index: 2;

    [data-slot="slider"] {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
    }

    [data-slot="slider-track"] {
      height: 3px;
      background: #2A2C32;
      border-radius: 2px;
    }

    [data-slot="slider-range"] {
      height: 3px;
      background: #FF4D4F;
      border-radius: 2px;
    }

    [data-slot="slider-thumb"] {
      width: 11px;
      height: 11px;
      border: 2px solid #FF4D4F;
      background: #fff;
      opacity: 0;
      transition: opacity 0.15s;
    }

    [data-slot="slider"]:hover [data-slot="slider-thumb"] {
      opacity: 1;
    }

    @media (max-width: 768px) {
      left: 8px;
      right: 8px;
    }
  }

  /* 两端时间显示（进度条上方） */
  .top-time {
    position: absolute;
    bottom: 14px;
    left: 24px;
    right: 24px;
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #6A6A6A;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.3px;
    z-index: 2;

    .current {
      color: #B3B3B3;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .content {
    /* 模仿沉浸页播放器三段式布局：左信息 / 中控制 / 右操作 */
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    height: 100%;
    padding: 0 24px 26px;

    @media (max-width: 768px) {
      padding: 0 8px 14px;
    }
  }

`


interface IBarControl {
  $isPlaying: boolean
}

export const BarControl = styled.div<IBarControl>`
  display: flex;
  align-items: center;
  gap: 12px;

  .btn {
    cursor: pointer;
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #B3B3B3;
    transition: all 0.15s;
    font-size: 18px;

    &:hover {
      color: #fff;
    }

    &.prev,
    &.next {
      width: 32px;
      height: 32px;
      border-radius: 50%;

      &:hover {
        background: rgba(255, 255, 255, 0.06);
      }
    }

    &.play {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #FF4D4F;
      color: #fff;
      font-size: 18px;

      &:hover {
        background: #ff7875;
        transform: scale(1.05);
      }
    }
  }
`

export const BarPlayInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 600px;
  margin: 0 20px;

  @media (max-width: 480px) {
    margin: 0 6px;

    .song-lyric,
    .singer-name {
      display: none;
    }
  }

  .image {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;
    cursor: pointer;
    transition: opacity 0.15s;
    border: 1px solid rgba(255, 255, 255, 0.38);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);

    &:hover {
      opacity: 0.8;
    }
  }

  .info {
    flex: 1;
    margin-left: 14px;
    min-width: 0;

    .song {
      display: flex;
      align-items: flex-end;
      gap: 16px;
      margin-bottom: 4px;

      .song-info {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      .song-name {
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .singer-name {
        color: #B3B3B3;
        font-size: 12px;
        white-space: nowrap;
      }

      .song-lyric {
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
        padding-bottom: 1px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        flex-shrink: 0;
        transition: color 0.15s;

        &:hover {
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }

  }
`

interface IBarOperator {
  $playMode: number
}

export const BarOperator = styled.div<IBarOperator>`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .left {
    display: flex;
    align-items: center;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 4px;

    @media (max-width: 480px) {
      gap: 2px;

      .btn.lyric,
      .btn.loop,
      .volume-wrapper {
        display: none;
      }
    }
  }

  .btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: #B3B3B3;
    font-size: 18px;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.15s;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.06);
    }
  }

  .volume-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    &::after {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 48px;
      height: 10px;
    }

    &:hover .volume-panel,
    .volume-panel:hover {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
  }

  .volume-panel {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 8px;
    background: #222733;
    border-radius: 8px;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.15s, visibility 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    z-index: 10;

    [data-slot="slider"] {
      height: 100%;
    }

    [data-slot="slider-track"] {
      width: 4px;
      background: #2A2C32;
    }

    [data-slot="slider-range"] {
      background: #FF4D4F;
    }

    [data-slot="slider-thumb"] {
      width: 12px;
      height: 12px;
      border: 2px solid #FF4D4F;
      background: #fff;
    }
  }

  .playlist {
    position: relative;

    .playlist-count {
      position: absolute;
      top: 2px;
      right: 2px;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      line-height: 16px;
      text-align: center;
      border-radius: 8px;
      background: #FF4D4F;
      pointer-events: none;
    }
  }
`
