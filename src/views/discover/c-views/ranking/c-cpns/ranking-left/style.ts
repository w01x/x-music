import styled from "styled-components"

export const LeftWrapper = styled.div`
  width: 274px;
  height: 100%;
  flex-shrink: 0;

  overflow-y: auto;

  background: #171A21;
  border: 0px solid #da6a6a37;

  @media (max-width: 768px) {
    display: none;
  }
  flex-shrink: 0; // 防止压缩左边宽度

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

  .group {
    padding: 10px 0;
  }
`

export const GroupTitle = styled.h3`
  padding: 0 20px;
  margin-bottom: 12px;

  font-size: 14px;
  font-weight: 700;

  color: #B3B3B3;
`

export const RankingItem = styled.div<{
  $active: boolean
}>`
  height: 62px;

  padding: 10px 20px;

  display: flex;
  align-items: center;

  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;

  background: ${(props) =>
    props.$active
      ? "rgba(255, 255, 255, 0.06)"
      : "transparent"
    };

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(6px);
  }

  img {
    width: 40px;
    height: 40px;

    border: 3px solid #1F2230;
  }

  .info {
    margin-left: 12px;

    .name {
      font-size: 14px;
      color: #B3B3B3;
    }

    .update {
      margin-top: 6px;

      font-size: 12px;
      color: #6A6A6A;
    }
  }
`
