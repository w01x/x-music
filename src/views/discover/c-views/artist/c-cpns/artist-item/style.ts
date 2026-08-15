import styled from "styled-components"

export const ItemWrapper = styled.div`
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-6px) scale(1.03);

    .cover-wrapper {
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);

      img {
        filter: brightness(1.05);
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
  width: 130px;
  height: 130px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.25s ease;

  @media (max-width: 480px) {
    width: 100%;
    aspect-ratio: 1;
    height: auto;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.25s ease;
  }
`

export const PlayOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px;
  background: linear-gradient(
    180deg,
    transparent 55%,
    rgba(0, 0, 0, 0.2) 100%
  );
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
`

export const PlayCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #ff4d4f;
  border-radius: 50%;
  transform: translate(6px, 6px) scale(0.8);
  opacity: 0;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);

  svg {
    width: 15px;
    height: 15px;
    fill: #fff;
    color: #fff;
    margin-left: 1px;
  }
`

export const ArtistName = styled.div`
  margin-top: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #f5f5f7;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 130px;
`

export const ArtistAlias = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
`

export const AliasText = styled.span`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
`

export const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
`
