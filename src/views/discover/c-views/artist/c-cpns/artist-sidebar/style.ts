import styled from "styled-components"

export const SidebarWrapper = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0 12px 12px 0;
  padding: 8px 0;

  .group {
    padding: 12px 0;

    h3 {
      padding-left: 20px;
      margin-bottom: 6px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: rgba(255, 255, 255, 0.4);
    }
  }

  .item {
    display: flex;
    align-items: center;
    height: 34px;
    padding: 0 14px;
    margin: 1px 10px;
    border-radius: 8px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.55);
    font-size: 13px;
    transition: all 0.25s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.85);
    }

    &.active {
      background: rgba(255, 77, 79, 0.12);
      color: #ff4d4f;
      font-weight: 500;
    }
  }
`
