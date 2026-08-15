import styled from 'styled-components'

export const SidebarWrapper = styled.nav<{ $mobile?: boolean; $open?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 240px;
  background: ${(props) => props.theme.color.sidebar};
  border-right: 1px solid ${(props) => props.theme.color.border};
  overflow-y: auto;
  z-index: 70;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease;

  @media (max-width: 768px) {
    top: 64px;
    transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(-100%)')};
    box-shadow: ${({ $open }) => ($open ? '4px 0 20px rgba(0,0,0,0.5)' : 'none')};
  }

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #2A2C32;
    border-radius: 2px;
  }

  .icp-footer {
    margin-top: auto;
    padding: 12% 15% 3%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-top: 1px solid ${(props) => props.theme.color.border};

    span {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.2);
    }
  }
`

export const SectionTitle = styled.h4`
  padding: 16px 12px 8px;
  color: ${(props) => props.theme.color.textTertiary};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px 20px;
  margin-bottom: 8px;
  border-bottom: 1px solid ${(props) => props.theme.color.border};

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    background: #1F2230;
    flex-shrink: 0;
  }

  .avatar-placeholder {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #1F2230;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #6A6A6A;
    flex-shrink: 0;
  }

  .info {
    min-width: 0;

    .greeting {
      font-size: 12px;
      color: ${(props) => props.theme.color.textTertiary};
      margin-bottom: 2px;
    }

    .name {
      font-size: 14px;
      color: #fff;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`

export const SidebarItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  color: ${(props) => (props.$active ? '#fff' : props.theme.color.textSecondary)};
  font-size: 14px;
  font-weight: ${(props) => (props.$active ? '500' : '400')};
  background: ${(props) => (props.$active ? '#1F2230' : 'transparent')};
  transition: all 0.15s;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #fff;
    background: ${(props) => (props.$active ? '#1F2230' : 'rgba(255,255,255,0.04)')};
  }

  .anticon {
    font-size: 18px;
  }
`
