import styled from "styled-components"

export const HeaderWrapper = styled.div`
  margin-bottom: 40px;
`

export const HeaderTop = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
`

export const HeaderLeft = styled.div`
  flex-shrink: 0;

  h2 {
    font-size: 34px;
    font-weight: 700;
    color: #f5f5f7;
    margin: 0 0 16px 0;
    letter-spacing: -0.3px;
  }

  .subtitle {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.55);
    margin: 0;
  }
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding-bottom: 2px;
`

export const CategoryTag = styled.button<{ $active?: boolean }>`
  padding: 8px 22px;
  font-size: 14px;
  font-weight: ${(p) => (p.$active ? 600 : 400)};
  color: ${(p) => (p.$active ? "#ff4d4f" : "rgba(255,255,255,0.55)")};
  background: ${(p) =>
    p.$active ? "rgba(255,77,79,0.12)" : "transparent"};
  border: 1px solid transparent;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${(p) => (p.$active ? "#ff4d4f" : "rgba(255,255,255,0.85)")};
    background: ${(p) =>
      p.$active
        ? "rgba(255,77,79,0.15)"
        : "rgba(255,255,255,0.05)"};
  }
`

export const Divider = styled.div`
  margin-top: 30px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  height: 2px;
  background: #db1014c3;
  border-radius: 1px;
`
