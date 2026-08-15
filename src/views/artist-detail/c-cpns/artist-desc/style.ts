import styled from 'styled-components'

export const ArtistDescWrapper = styled.div`
  margin-bottom: 30px;

  .title {
    display: flex;
    align-items: center;
    height: 24px;
    padding-left: 10px;
    border-left: 3px solid #FF4D4F;
    font-size: 20px;
    font-weight: 700;
    color: #B3B3B3;
    margin-bottom: 15px;
  }

  .brief-desc {
    font-size: 13px;
    color: #6A6A6A;
    line-height: 28px;
    text-indent: 2em;
  }

  .intro-list {
    margin-top: 20px;

    .intro-item {
      margin-bottom: 20px;

      .intro-title {
        font-size: 14px;
        font-weight: 600;
        color: #B3B3B3;
        line-height: 28px;
      }

      .intro-text {
        font-size: 13px;
        color: #6A6A6A;
        line-height: 28px;
        white-space: pre-wrap;
        text-indent: 2em;
      }
    }
  }

  .empty {
    padding: 10px 0;
    color: #6A6A6A;
    font-size: 13px;
  }
`
