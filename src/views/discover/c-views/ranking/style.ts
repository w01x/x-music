import styled from "styled-components"

export const RankingWrapper = styled.div`
  display: flex;

  background: #0F1117;
  border: 1px solid #1F2230;

  border-top: none;

  height: calc(100vh - 105px);
  overflow: hidden;

  @media (max-width: 768px) {
    height: calc(100vh - 64px - 64px);
  }
`

export const Content = styled.div`
  flex: 1;

  padding: 40px;

  overflow-y: auto;

  background: #0F1117;

  @media (max-width: 768px) {
    padding: 16px;
  }

  /* 自定义滚动条 */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  .empty {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    color: #6A6A6A;
  }

`
