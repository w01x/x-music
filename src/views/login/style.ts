import styled from "styled-components"

export const LoginWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.color.bg};
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
  overflow: hidden;
`

export const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.color.card};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: 40px 40px 36px;
  border: 1px solid ${(props) => props.theme.color.border};
  box-shadow: ${(props) => props.theme.shadow.lg};
  width: 352px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.4);
  }
`

export const Title = styled.h1`
  margin: 0 0 28px;
  font-size: 22px;
  font-weight: 600;
  color: ${(props) => props.theme.color.textPrimary};
  letter-spacing: 1px;
`

export const TabBar = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 28px;
  border-bottom: 2px solid ${(props) => props.theme.color.border};

  .tab {
    flex: 1;
    height: 40px;
    font-size: 15px;
    color: ${(props) => props.theme.color.textTertiary};
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;

    &:hover {
      color: #FF4D4F;
    }

    &.active {
      color: #FF4D4F;
      font-weight: 600;
      border-bottom-color: #FF4D4F;
    }
  }
`

export const QrWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid ${(props) => props.theme.color.border};
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.25s ease;

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }

  .qr-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.theme.color.bg};
    border: 1px dashed ${(props) => props.theme.color.border};
  }
`

export const ScanOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(15, 17, 23, 0.92);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  .check-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #FF4D4F;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: "";
      display: block;
      width: 10px;
      height: 18px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg) translateY(-1px);
      border-radius: 1px;
    }
  }

  span {
    color: ${(props) => props.theme.color.textPrimary};
    font-size: 14px;
    font-weight: 500;
  }
`

export const StatusText = styled.p<{ $status: string }>`
  margin: 0 0 8px;
  font-size: 14px;
  min-height: 20px;
  line-height: 20px;
  color: ${(props) => props.theme.color.textTertiary};
  transition: color 0.3s ease;
  text-align: center;

  ${({ $status }) => {
    switch ($status) {
      case "success":
        return "color: #43ad6c;"
      case "error":
      case "expired":
        return "color: #FF4D4F;"
      default:
        return "color: #B3B3B3;"
    }
  }}
`

export const HintText = styled.p`
  margin: 16px 0 0;
  font-size: 12px;
  color: ${(props) => props.theme.color.textTertiary};
  text-align: center;
`

export const ActionButton = styled.button`
  margin-top: 16px;
  padding: 10px 48px;
  background: #FF4D4F;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;

  &:hover {
    background: ${(props) => props.theme.color.primaryHover};
  }

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const SpinnerWrapper = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  .spinner {
    width: 36px;
    height: 36px;
    border: 3px solid ${(props) => props.theme.color.border};
    border-top-color: #FF4D4F;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  span {
    font-size: 13px;
    color: ${(props) => props.theme.color.textTertiary};
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export const PhoneForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const PhoneInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
  margin-bottom: 16px;
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #FF4D4F;
  }

  .prefix {
    display: flex;
    align-items: center;
    padding: 0 12px;
    font-size: 14px;
    color: ${(props) => props.theme.color.textSecondary};
    border-right: 1px solid ${(props) => props.theme.color.border};
    background: ${(props) => props.theme.color.bg};
    height: 100%;
  }

  input {
    flex: 1;
    height: 100%;
    padding: 0 12px;
    font-size: 14px;
    border: none;
    outline: none;
    background: ${(props) => props.theme.color.bg};
    color: ${(props) => props.theme.color.textPrimary};

    &::placeholder {
      color: ${(props) => props.theme.color.textTertiary};
    }
  }
`

export const CaptchaRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  margin-bottom: 16px;

  input {
    flex: 1;
    height: 44px;
    padding: 0 12px;
    font-size: 14px;
    border: 1px solid ${(props) => props.theme.color.border};
    border-radius: 8px;
    outline: none;
    background: ${(props) => props.theme.color.bg};
    color: ${(props) => props.theme.color.textPrimary};
    transition: border-color 0.2s;

    &:focus {
      border-color: #FF4D4F;
    }

    &::placeholder {
      color: ${(props) => props.theme.color.textTertiary};
    }
  }

  .send-btn {
    width: 120px;
    height: 44px;
    font-size: 13px;
    color: #FF4D4F;
    background: transparent;
    border: 1px solid #FF4D4F;
    border-radius: 8px;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      color: #fff;
      background: #FF4D4F;
    }

    &:disabled {
      color: ${(props) => props.theme.color.textTertiary};
      border-color: ${(props) => props.theme.color.border};
      cursor: not-allowed;
    }
  }
`

export const SwitchLink = styled.span`
  font-size: 13px;
  color: ${(props) => props.theme.color.textTertiary};
  cursor: pointer;
  margin-bottom: 12px;

  &:hover {
    color: #FF4D4F;
  }
`

export const ErrorText = styled.p`
  margin: 0 0 8px;
  font-size: 13px;
  color: #FF4D4F;
  text-align: center;
`
