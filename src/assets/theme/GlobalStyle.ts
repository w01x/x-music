import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background: #0F1117;
    color: #FFFFFF;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ::selection {
    background: rgba(255, 77, 79, 0.3);
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #2A2C32;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #3A3C42;
  }

  /* Ant Design overrides */
  .ant-slider-rail {
    background: #2A2C32 !important;
  }
  .ant-slider-track {
    background: #FF4D4F !important;
  }
  .ant-slider-handle {
    border-color: #FF4D4F !important;
  }
  .ant-slider-handle:focus {
    box-shadow: 0 0 0 5px rgba(255, 77, 79, 0.12) !important;
  }
  .ant-pagination-item {
    background: #171A21;
    border-color: #1F2230;
  }
  .ant-pagination-item a {
    color: #B3B3B3;
  }
  .ant-pagination-item-active {
    background: #FF4D4F;
    border-color: #FF4D4F;
  }
  .ant-pagination-item-active a {
    color: #fff;
  }
  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link {
    background: #171A21;
    border-color: #1F2230;
    color: #B3B3B3;
  }
  .ant-input {
    background: #1F2230;
    border-color: #1F2230;
    color: #fff;
  }
  .ant-input:focus,
  .ant-input-focused {
    border-color: #FF4D4F;
    box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
  }
  .ant-input::placeholder {
    color: #6A6A6A;
  }
  .ant-message-notice-content {
    background: rgba(0, 0, 0, 0.85) !important;
    color: #fff;
    border-radius: 8px;
  }
  .ant-tooltip-inner {
    background: #222733;
    border-radius: 6px;
  }
  .ant-tabs-tab {
    color: #B3B3B3 !important;
  }
  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #FF4D4F !important;
  }
  .ant-tabs-ink-bar {
    background: #FF4D4F !important;
  }

  /* Page transition */
  .page-enter {
    animation: pageEnter 0.25s ease;
  }
  @keyframes pageEnter {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .card-hover {
    transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  }
  .card-hover:hover {
    transform: translateY(-2px);
    background: #222733;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  button:active {
    transform: scale(0.96);
  }
`

export default GlobalStyle
