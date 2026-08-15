import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 240px;
  right: 0;
  z-index: 100;
  height: 64px;
  background: rgba(15, 15, 15, 0.75);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 768px) {
    left: 0;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 24px;

    @media (max-width: 768px) {
      padding: 0 12px;
      gap: 8px;
    }
  }

  .menu-btn {
    display: none;
    @media (max-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: none;
      border: none;
      color: #B3B3B3;
      font-size: 22px;
      cursor: pointer;
      flex-shrink: 0;
    }
  }
`

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  .logo {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    user-select: none;
    letter-spacing: -0.5px;

    span {
      color: ${(props) => props.theme.color.primary};
    }
  }

  .title-list {
    display: flex;
    align-items: center;
    gap: 4px;

    .item {
      a {
        display: block;
        padding: 8px 16px;
        border-radius: 6px;
        color: #B3B3B3;
        font-size: 14px;
        font-weight: 400;
        text-decoration: none;
        transition: all 0.15s;

        &:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.06);
        }

        &.active {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }
      }
    }
  }
`

export const CropOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 120px;
  padding-right:200px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
`

export const CropContainer = styled.div`
  background: #1a1d26;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  width: 420px;
  max-width: 90vw;
  overflow: hidden;

  .crop-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);

    .close-btn {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      color: #888;
      font-size: 16px;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.15s;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
        color: #fff;
      }
    }
  }

  .crop-area {
    position: relative;
    width: 100%;
    height: 320px;
    background: #111;
  }

  .crop-controls {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);

    .label {
      font-size: 13px;
      color: #888;
      flex-shrink: 0;
    }
  }

  .crop-actions {
    display: flex;
    gap: 12px;
    padding: 0 20px 20px;

    button {
      flex: 1;
      height: 38px;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      border: none;
      transition: all 0.15s;
    }

    .btn-cancel {
      background: rgba(255, 255, 255, 0.06);
      color: #ccc;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }

    .btn-confirm {
      background: #FF4D4F;
      color: #fff;

      &:hover {
        background: #ff7875;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 480px) {
    gap: 8px;
  }

  .search {
    width: 200px;
    height: 36px;

    @media (max-width: 480px) {
      width: 100px;
      font-size: 12px;
    }

    .ant-input-affix-wrapper {
      background: #1F2230;
      border: 1px solid transparent;
      border-radius: 18px;
      height: 36px;
      padding: 0 16px;

      &:hover {
        border-color: #2A2C32;
      }

      &:focus,
      &.ant-input-affix-wrapper-focused {
        border-color: ${(props) => props.theme.color.primary};
        background: #0F1117;
        box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.15);
      }

      input {
        color: #fff;
        font-size: 13px;
        background: transparent;

        &::placeholder {
          color: #6A6A6A;
        }
      }

      .ant-input-prefix {
        color: #6A6A6A;
        margin-right: 8px;
      }
    }
  }

  .icon-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: transparent;
    border: none;
    color: #B3B3B3;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.06);
    }
  }

  .login {
    height: 32px;
    line-height: 32px;
    padding: 0 20px;
    background: ${(props) => props.theme.color.primary};
    border-radius: 16px;
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    display: inline-block;
    transition: all 0.15s;

    &:hover {
      background: ${(props) => props.theme.color.primaryHover};
      color: #fff;
    }
  }

  .user-info {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;

    .avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid transparent;
      transition: border-color 0.15s;
    }

    &:hover .avatar {
      border-color: ${(props) => props.theme.color.primary};
    }

    .dropdown {
      position: absolute;
      top: 44px;
      right: -10px;
      background: #222733;
      border: 1px solid #1F2230;
      border-radius: 8px;
      padding: 4px 0;
      min-width: 120px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-6px);
      transition: opacity 0.15s, transform 0.15s, visibility 0.15s;
      z-index: 100;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);

      .dropdown-item {
        padding: 8px 16px;
        font-size: 13px;
        color: #B3B3B3;
        white-space: nowrap;
        cursor: pointer;
        transition: all 0.1s;

        &:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #fff;
        }

        &.logout:hover {
          color: ${(props) => props.theme.color.primary};
        }
      }
    }

    &:hover .dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
`
