import styled from "styled-components"

export const PlaylistDetailWrapper = styled.div`
  max-width: 1100px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 40px 32px 80px;
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    padding: 16px 12px 80px;
    flex-direction: column;
    gap: 16px;
  }

  .main {
    flex: 1;
    min-width: 0;

    @media (max-width: 768px) {
      padding: 0;
    }

    .song-list-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 16px;
      margin-top: 40px;

      h3 {
        font-size: 22px;
        font-weight: 700;
        color: #fff;
      }

      .count {
        font-size: 13px;
        color: rgba(255,255,255,0.4);
      }
    }
  }

  .sidebar {
    width: 280px;
    flex-shrink: 0;
    padding: 24px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.04);
    background: rgba(255,255,255,0.02);
    backdrop-filter: blur(1px);
    align-self: flex-start;

    @media (max-width: 768px) {
      display: none;
    }

    .placeholder {
      font-size: 13px;
      color: rgba(255,255,255,0.3);
      text-align: center;
      padding-top: 80px;
    }
  }

  .comment-placeholder {
    margin-top: 48px;
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.06);

    h3 {
      font-size: 22px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 16px;
    }

    .placeholder-text {
      font-size: 13px;
      color: rgba(255,255,255,0.25);
      text-align: center;
      padding: 60px 0;
    }
  }
`
