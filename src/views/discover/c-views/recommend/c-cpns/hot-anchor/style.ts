import styled from 'styled-components'

export const AnchorWrapper = styled.div`
  background: ${(props) => props.theme.color.card};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 20px;

  .anchors {
    margin-top: 12px;

    .item {
      display: flex;
      margin-bottom: 10px;
      width: 100%;
      padding: 8px;
      border-radius: ${(props) => props.theme.borderRadius.sm};
      transition: all 0.15s;

      &:hover {
        background: ${(props) => props.theme.color.cardHover};
      }

      .image {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .info {
        width: 160px;
        margin-left: 8px;

        .name {
          color: ${(props) => props.theme.color.textPrimary};
          font-weight: 500;
          margin-top: 3px;
          font-size: 13px;
        }

        .position {
          color: ${(props) => props.theme.color.textTertiary};
          font-size: 11px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
`
