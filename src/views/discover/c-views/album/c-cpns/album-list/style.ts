import styled from "styled-components"

export const AlbumListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 28px 24px;

  @media (min-width: 1480px) {
    grid-template-columns: repeat(6, 1fr);
  }
`

export const CardWrapper = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.25s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
    border-color: rgba(255, 255, 255, 0.12);

    .card-cover {
      img {
        transform: scale(1.04);
        filter: brightness(1.05);
      }

      .play-overlay {
        opacity: 1;
      }

      .play-circle {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
`

export const CoverSection = styled.div`
  position: relative;
  padding: 12px 12px 0 12px;

  img {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.25s ease;
  }
`

export const PlayOverlay = styled.div`
  position: absolute;
  inset: 12px 12px 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.18);
  border-radius: 14px;
  opacity: 0;
  transition: opacity 0.25s ease;
`

export const PlayCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: #ff4d4f;
  border-radius: 50%;
  transform: scale(0.8);
  opacity: 0;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);

  svg {
    width: 19px;
    height: 19px;
    fill: #fff;
    color: #fff;
    margin-left: 2px;
  }
`

export const InfoSection = styled.div`
  padding: 14px 16px 16px;
`

export const NameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

export const AlbumName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #f5f5f7;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
`

export const ArtistName = styled.div`
  margin-top: 4px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const CollectBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0;
  border: none;
  background: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #ff4d4f;
    transform: scale(1.15);
  }

  svg {
    width: 15px;
    height: 15px;
  }
`
