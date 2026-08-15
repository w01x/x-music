import styled from "styled-components"

export const ArtistWrapper = styled.div`
  height: calc(100vh - 64px - 90px);
  background: linear-gradient(180deg, #0b1020 0%, #090d18 30%, #07090f 100%);

  &::before {
    content: "";
    position: fixed;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 600px;
    background: radial-gradient(
      ellipse,
      rgba(40, 70, 160, 0.08) 0%,
      rgba(20, 40, 80, 0.03) 40%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }

  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  overflow: hidden;

  .left {
    position: relative;
    z-index: 1;
    width: 180px;
    flex-shrink: 0;
    overflow-y: auto;

    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.08) transparent;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.08);
      border-radius: 2px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }

  .right {
    position: relative;
    z-index: 1;
    flex: 1;
    padding: 40px 48px;
    overflow-y: auto;

    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.08) transparent;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.08);
      border-radius: 2px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }
`
