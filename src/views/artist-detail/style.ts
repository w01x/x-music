import styled from 'styled-components'

export const ArtistDetailWrapper = styled.div`
  background: #0F1117;
  border: 1px solid #1F2230;
  border-top: none;

  .wrap-v2 {
    padding: 0 30px 40px;

    @media (max-width: 768px) {
      padding: 0 12px 40px;
    }
  }

  .tabs {
    display: flex;
    height: 40px;
    border-bottom: 2px solid #FF4D4F;

    .tab-item {
      padding: 0 24px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #B3B3B3;
      background: none;
      border: none;
      cursor: pointer;

      &:hover {
        color: #FF4D4F;
      }

      &.active {
        color: #FF4D4F;
        font-weight: 700;
        background: rgba(255, 77, 79, 0.1);
        border: 2px solid #FF4D4F;
        border-bottom: none;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(255, 77, 79, 0.1);
        }
      }
    }
  }

  .tab-content {
    padding-top: 20px;
  }
`
