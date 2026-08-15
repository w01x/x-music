const theme = {
  color: {
    primary: '#FF4D4F',
    primaryHover: '#ff7875',
    secondary: '',
    bg: '#0F1117',
    card: '#171A21',
    cardHover: '#222733',
    sidebar: '#0D0F14',
    header: 'rgba(15, 17, 23, 0.85)',
    textPrimary: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textTertiary: '#6A6A6A',
    border: '#1F2230',
    divider: '#1F2230',
  },
  borderRadius: {
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.3)',
    md: '0 4px 12px rgba(0,0,0,0.4)',
    lg: '0 8px 24px rgba(0,0,0,0.5)',
  },
  transition: 'all 0.2s ease',
  size: {},
  mixin: {
    wrapv1: `
width: 1100px;
margin: 0 auto;
    `,
    textNowrap: `
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;`
  }
}

export default theme
