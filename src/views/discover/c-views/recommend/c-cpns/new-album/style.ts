import styled from 'styled-components'

export const AlbumWrapper = styled.div`
  margin-top: 0;

  > .content {
    height: 186px;
    background: ${(props) => props.theme.color.card};
    border-radius: ${(props) => props.theme.borderRadius.md};
    margin: 16px 0 0;
    padding: 0 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .arrow {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.06);
      border: none;
      color: ${(props) => props.theme.color.textSecondary};
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.15s;

      &:hover {
        background: rgba(255, 255, 255, 0.12);
        color: #fff;
      }
    }

    .arrow-left {
      margin-right: 8px;
    }

    .arrow-right {
      margin-left: 8px;
    }
  }

  .banner {
    overflow: hidden;
    flex: 1;

    .album-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`
