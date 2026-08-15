import styled from "styled-components"

export const HeaderWrapper = styled.div`
  margin-bottom: 40px;
`

export const CategoryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
`

export const CategoryTag = styled.button<{ $active?: boolean }>`
  padding: 10px 24px;
  font-size: 14px;
  font-weight: ${(props) => (props.$active ? 600 : 400)};
  color: ${(props) => (props.$active ? "#ff4d4f" : "rgba(255, 255, 255, 0.55)")};
  background: ${(props) =>
    props.$active ? "rgba(255, 77, 79, 0.1)" : "transparent"};
  border: 1px solid
    ${(props) =>
      props.$active ? "rgba(255, 77, 79, 0.2)" : "transparent"};
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;

  &:hover {
    color: ${(props) => (props.$active ? "#ff4d4f" : "rgba(255, 255, 255, 0.85)")};
    background: ${(props) =>
      props.$active
        ? "rgba(255, 77, 79, 0.15)"
        : "rgba(255, 255, 255, 0.04)"};
    border-color: ${(props) =>
      props.$active ? "rgba(255, 77, 79, 0.3)" : "rgba(255, 255, 255, 0.06)"};
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
`

export const MoreBtn = styled.button<{ $open?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 18px;
  font-size: 14px;
  color: ${(props) =>
    props.$open ? "#ff4d4f" : "rgba(255, 255, 255, 0.55)"};
  background: ${(props) =>
    props.$open ? "rgba(255, 77, 79, 0.1)" : "transparent"};
  border: 1px solid
    ${(props) =>
      props.$open ? "rgba(255, 77, 79, 0.2)" : "transparent"};
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;

  &:hover {
    color: rgba(255, 255, 255, 0.85);
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  svg {
    width: 14px;
    height: 14px;
    transition: transform 0.25s ease;
    transform: rotate(${(props) => (props.$open ? "180deg" : "0deg")});
  }
`

export const CategoryDropdown = styled.div`
  position: relative;
  display: inline;
`

export const CategoryPanel = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  width: 620px;
  padding: 24px;
  background: rgba(10, 14, 22, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  z-index: 100;

  .all-cat {
    display: inline-block;
    padding: 6px 18px;
    margin-bottom: 22px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.55);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      background: rgba(255, 77, 79, 0.1);
      border-color: rgba(255, 77, 79, 0.3);
      color: #ff4d4f;
    }
  }

  .group {
    display: flex;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    .group-title {
      width: 80px;
      flex-shrink: 0;
      font-size: 13px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.4);
      padding-top: 4px;
    }

    .group-list {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      gap: 6px 4px;

      .cat-item {
        padding: 5px 16px;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.55);
        border-radius: 999px;
        cursor: pointer;
        transition: all 0.25s ease;
        white-space: nowrap;

        &:hover {
          color: #f5f5f7;
          background: rgba(255, 255, 255, 0.04);
        }
      }
    }
  }
`
