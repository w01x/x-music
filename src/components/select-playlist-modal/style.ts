import styled from "styled-components"

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

export const Box = styled.div`
  width: 340px;
  max-height: 420px;
  background: #1e2025;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
`

export const Title = styled.h3`
  color: #e8e8e8;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 12px;
  flex-shrink: 0;
`

export const List = styled.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #3a3c42;
    border-radius: 2px;
  }
`

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.1s;

  &:hover {
    background: #2a2c32;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 2px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .info {
    overflow: hidden;

    .name {
      color: #bbb;
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .count {
      color: #777;
      font-size: 11px;
    }
  }
`

export const Tip = styled.div`
  color: #777;
  font-size: 13px;
  text-align: center;
  padding: 24px 0;
`

export const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 22px;
  height: 22px;
  background: transparent;
  border: none;
  color: #888;
  font-size: 16px;
  cursor: pointer;
  line-height: 1;

  &:hover {
    color: #e8e8e8;
  }
`
