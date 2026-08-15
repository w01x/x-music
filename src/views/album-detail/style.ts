import styled from "styled-components"

export const AlbumDetailWrapper = styled.div`
  max-width: 980px;
  min-height: 1200px;
  margin: 0 auto;
  background: #0F1117;
  border: 1px solid #1F2230;
  border-top: none;
  display: flex;

  @media (max-width: 768px) {
    min-height: auto;
    flex-direction: column;
  }

  .main {
    flex: 1;
    padding: 40px;
    border-right: 1px solid #1F2230;

    @media (max-width: 768px) {
      padding: 16px;
      border-right: none;
    }

    .song-list-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;

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
  }

  .sidebar {
    width: 270px;
    padding: 20px;
    background: #171A21;

    @media (max-width: 768px) {
      display: none;
    }

    .placeholder {
      font-size: 12px;
      color: #6A6A6A;
      text-align: center;
      padding-top: 40px;
    }
  }

  .comment-placeholder {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 2px solid #FF4D4F;

    h3 {
      font-size: 20px;
      font-weight: normal;
      color: #B3B3B3;
      margin-bottom: 16px;
    }

    .placeholder-text {
      font-size: 12px;
      color: #6A6A6A;
      text-align: center;
      padding: 40px 0;
    }
  }
`
