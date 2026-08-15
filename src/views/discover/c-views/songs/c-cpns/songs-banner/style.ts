import styled from "styled-components"

export const BannerWrapper = styled.div`
  position: relative;
  height: 270px;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 48px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.03);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  }
`

export const BannerGlow = styled.div<{ $image: string }>`
  position: absolute;
  inset: -40px;
  background: url(${(props) => props.$image}) center / cover no-repeat;
  filter: blur(60px) brightness(0.45) saturate(1.5);
  opacity: 0.4;
`

export const BannerBg = styled.div<{ $image: string }>`
  position: absolute;
  inset: 0;
  background: url(${(props) => props.$image}) center / cover no-repeat;
  filter: blur(24px) brightness(0.4) saturate(1.2);
  transform: scale(1.1);
`

export const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(7, 9, 15, 0.75) 0%,
    rgba(7, 9, 15, 0.35) 45%,
    rgba(7, 9, 15, 0.1) 100%
  );
`

export const BannerVignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 70% 50%,
    transparent 30%,
    rgba(7, 9, 15, 0.25) 100%
  );
`

export const BannerContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 56px;
  gap: 48px;
`

export const BannerCover = styled.div`
  flex-shrink: 0;
  width: 160px;
  height: 160px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const BannerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`

export const BannerLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 77, 79, 0.85);
  text-transform: uppercase;
  letter-spacing: 2.5px;
`

export const BannerTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  color: #f5f5f7;
  margin: 0;
  line-height: 1.15;
  letter-spacing: -0.3px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const BannerDesc = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 540px;
`

export const BannerPlayBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 10px 28px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: #ff4d4f;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s ease;
  width: fit-content;

  &:hover {
    background: #ff6666;
    transform: scale(1.04);
    box-shadow: 0 4px 16px rgba(255, 77, 79, 0.3);
  }

  svg {
    width: 16px;
    height: 16px;
    fill: #fff;
  }
`
