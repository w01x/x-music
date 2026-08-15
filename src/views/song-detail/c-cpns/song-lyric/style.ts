import styled from "styled-components"

export const SongLyricWrapper = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #FF4D4F;

  .lyric-header {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 16px;

    h3 {
      font-size: 20px;
      font-weight: normal;
      color: #B3B3B3;
    }
  }

  .lyric-lines {
    max-height: 350px;
    overflow-y: auto;

    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.1) transparent;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 2px;
    }
  }

  .lyric-line {
    line-height: 2.0;
    font-size: 14px;
    color: #6A6A6A;
    cursor: default;

    &.active {
      color: #FF4D4F;
      font-size: 15px;
      font-weight: 600;
    }

    &.clickable {
      cursor: pointer;

      &:hover {
        color: #C0C0C0;
      }

      &.active:hover {
        color: #FF7875;
      }
    }
  }

  .no-lyric {
    text-align: center;
    padding: 40px 0;
    font-size: 12px;
    color: #6A6A6A;
  }
`
