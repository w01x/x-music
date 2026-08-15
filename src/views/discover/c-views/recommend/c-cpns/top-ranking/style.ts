import styled from 'styled-components'

export const RankingWrapper = styled.div`
  .content {
    display: flex;
    width: 100%;
    margin-top: 16px;
    height: 472px;
    background: ${(props) => props.theme.color.card};
    border-radius: ${(props) => props.theme.borderRadius.md};
    overflow: hidden;
  }
`
