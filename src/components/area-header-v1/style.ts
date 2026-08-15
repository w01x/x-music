import styled from 'styled-components'

export const HeaderV1Wrapper = styled.div`
  height: 33px;
  border-bottom: 1px solid ${(props) => props.theme.color.border};
  padding: 0 0 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;

    .title {
      font-size: 22px;
      font-weight: 700;
      color: ${(props) => props.theme.color.textPrimary};
      margin-right: 20px;
    }

    .keywords {
      display: flex;
      align-items: center;

      .item {
        position: relative;
        top: 2px;

        .divider {
          margin: 0 12px;
          color: ${(props) => props.theme.color.border};
        }
        .link {
          color: ${(props) => props.theme.color.textTertiary};
          font-size: 12px;
          text-decoration: none;
          transition: color 0.15s;

          &:hover {
            cursor: pointer;
            color: ${(props) => props.theme.color.textSecondary};
          }
        }

        &:last-child {
          .divider {
            display: none;
          }
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 4px;

    .more {
      color: ${(props) => props.theme.color.textTertiary};
      font-size: 12px;
      text-decoration: none;
      transition: color 0.15s;

      &:hover {
        color: ${(props) => props.theme.color.textSecondary};
      }
    }

    .icon {
      display: inline-block;
      color: ${(props) => props.theme.color.textTertiary};
      font-size: 12px;
    }
  }
`
