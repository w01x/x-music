import styled from 'styled-components'

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #0f0f0f 0%, #181818 100%);
  color: #fff;

  ::-webkit-scrollbar {
    width: 0;
  }
`

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px 80px;
`

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h2 {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.3px;
  }

  a {
    font-size: 13px;
    color: #b3b3b3;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.15s;

    &:hover {
      color: #fff;
    }
  }
`

export const Section = styled.section`
  margin-bottom: 44px;
`
