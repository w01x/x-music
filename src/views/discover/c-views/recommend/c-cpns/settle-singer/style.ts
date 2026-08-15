import styled from 'styled-components'

export const SingerWrapper = styled.div`
  background: ${(props) => props.theme.color.card};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 20px;

  .artists {
    .item {
      display: flex;
      height: 62px;
      margin-top: 14px;
      background: ${(props) => props.theme.color.bg};
      text-decoration: none;
      border-radius: ${(props) => props.theme.borderRadius.sm};
      overflow: hidden;
      transition: all 0.15s;

      &:hover {
        background: ${(props) => props.theme.color.cardHover};
      }

      img {
        width: 62px;
        height: 62px;
        object-fit: cover;
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 3px 12px;
        border: 1px solid ${(props) => props.theme.color.border};
        border-left: none;
        overflow: hidden;

        .name {
          font-size: 14px;
          font-weight: 700;
          color: ${(props) => props.theme.color.textPrimary};
        }

        .alias {
          font-size: 12px;
          color: ${(props) => props.theme.color.textTertiary};
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }

  .apply-for {
    margin-top: 12px;

    a {
      color: ${(props) => props.theme.color.textSecondary};
      font-weight: 500;
      text-align: center;
      display: block;
      height: 31px;
      line-height: 31px;
      border-radius: ${(props) => props.theme.borderRadius.sm};
      background: ${(props) => props.theme.color.bg};
      border: 1px solid ${(props) => props.theme.color.border};
      text-decoration: none;
      font-size: 12px;
      transition: all 0.15s;

      &:hover {
        background: ${(props) => props.theme.color.cardHover};
        color: #fff;
      }
    }
  }
`
