import styled from "styled-components"

export const SongsListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 28px 24px;

  @media (max-width: 1340px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 720px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 12px;
  }
`

export const CardWrapper = styled.div`
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px) scale(1.03);

    .cover-wrapper {
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);

      img {
        filter: brightness(0.6);
      }

      .play-overlay {
        opacity: 1;
        pointer-events: auto;
      }

      .play-circle {
        transform: translate(0, 0) scale(1);
        opacity: 1;
      }
    }
  }
`

export const CoverWrapper = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  transition: all 0.25s ease;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.88);
    transition: all 0.25s ease;
  }
`

export const PlayOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 12px;
  background: linear-gradient(
    180deg,
    transparent 55%,
    rgba(0, 0, 0, 0.25) 100%
  );
  opacity: 0;
  transition: opacity 0.25s ease;
  border-radius: 18px;
  pointer-events: none;
`

export const PlayCircle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #ff4d4f;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transform: translate(6px, 6px) scale(0.8);
  opacity: 0;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.15) !important;
    background: #ff6666;
  }

  svg {
    width: 15px;
    height: 15px;
    fill: #fff;
    color: #fff;
    margin-left: 1px;
  }
`

export const CardInfo = styled.div`
  margin-top: 12px;
  padding: 0 2px;
`

export const CardName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #f5f5f7;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);

  svg {
    width: 12px;
    height: 12px;
  }
`
