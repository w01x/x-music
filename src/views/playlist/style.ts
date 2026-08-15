import styled from "styled-components"

export const PlaylistWrapper = styled.div`
  max-width: 980px;
  min-height: 700px;
  margin: 0 auto;
  background: #0F1117;
  border: 1px solid #1F2230;
  border-top: none;
  display: flex;

  .main {
    width: 740px;
    flex-shrink: 0;
    padding: 30px;
    border-right: 1px solid #1F2230;

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

    .loading-placeholder {
      text-align: center;
      padding: 100px 0;
      font-size: 14px;
      color: #6A6A6A;
    }
  }

  .sidebar {
    flex: 1;
    background: #171A21;
  }
`
