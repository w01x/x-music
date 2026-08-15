import styled from "styled-components"

export const ProgramDetailWrapper = styled.div`
  max-width: 980px;
  min-height: 700px;
  margin: 0 auto;
  background: #0F1117;
  border: 1px solid #1F2230;
  border-top: none;
  display: flex;

  .main {
    flex: 1;
    padding: 30px;
    width: 600px;
    border-right: 1px solid #1F2230;

    .loading-placeholder {
      text-align: center;
      padding: 100px 0;
      font-size: 14px;
      color: #6A6A6A;
    }
  }

  .sidebar {
    width: 200px;
    flex-shrink: 0;
    background: #171A21;
  }
`
