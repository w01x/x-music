import styled from 'styled-components'

export const LoginWrapper = styled.div`
  background: ${(props) => props.theme.color.card};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    line-height: 22px;
    color: ${(props) => props.theme.color.textSecondary};
    font-size: 13px;
    text-align: center;
  }

  a {
    margin-top: 14px;
    display: inline-block;
    padding: 8px 32px;
    border-radius: 20px;
    text-align: center;
    color: #fff;
    text-decoration: none;
    background: ${(props) => props.theme.color.primary};
    font-size: 13px;
    font-weight: 500;
    transition: all 0.15s;

    &:hover {
      background: ${(props) => props.theme.color.primaryHover};
    }
  }
`
