import styled, { keyframes } from "styled-components"

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(255,77,79,0.2); }
  50%      { box-shadow: 0 0 0 12px rgba(255,77,79,0); }
`

const anim = ($show: boolean) => `
  opacity: ${$show ? 1 : 0};
  transform: translateY(${$show ? 0 : 20}px);
  transition: opacity 0.5s ease, transform 0.5s ease;
`

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 160px 120px 0 0;
`

export const IconCircle = styled.div<{ $show: boolean }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255,77,79,0.12) 0%, rgba(255,77,79,0.04) 100%);
  border: 1px solid rgba(255,77,79,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: rgba(255,77,79,0.65);
  margin-bottom: 24px;
  ${({ $show }) => anim($show)}
  animation: ${pulseGlow} 3s ease-in-out infinite;
  animation-delay: 0.6s;
`

export const Title = styled.h2<{ $show: boolean }>`
  font-size: 18px;
  font-weight: 600;
  color: rgba(255,255,255,0.75);
  margin: 0 0 8px;
  letter-spacing: -0.2px;
  ${({ $show }) => anim($show)}
`

export const Desc = styled.p<{ $show: boolean }>`
  font-size: 13px;
  color: rgba(255,255,255,0.35);
  margin: 0;
  max-width: 280px;
  text-align: center;
  line-height: 1.6;
  ${({ $show }) => anim($show)}
`

export const LoginButton = styled.button<{ $show: boolean }>`
  margin-top: 28px;
  padding: 10px 28px;
  border-radius: 22px;
  border: none;
  background: linear-gradient(135deg, #FF4D4F 0%, #ff6666 100%);
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  ${({ $show }) => anim($show)}
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 16px rgba(255,77,79,0.3);
  }

  &:active {
    transform: translateY(0) !important;
  }
`
