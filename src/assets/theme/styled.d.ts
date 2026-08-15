import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string;
      primaryHover: string;
      secondary: string;
      bg: string;
      card: string;
      cardHover: string;
      sidebar: string;
      header: string;
      textPrimary: string;
      textSecondary: string;
      textTertiary: string;
      border: string;
      divider: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    shadow: {
      sm: string;
      md: string;
      lg: string;
    };
    transition: string;
    size: Record<string, never>;
    mixin: {
      wrapv1: string;
      textNowrap: string;
    };
  }
}
