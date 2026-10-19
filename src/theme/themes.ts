export const themes = {
  light: {
    background: '#FFFFFF',
    card: '#F8F9FA',
    text: '#212529',
    subtext: '#6C757D',
    primary: '#0D6EFD',
    border: '#DEE2E6',
  },
  dark: {
    background: '#121212',
    card: '#1E1E1E',
    text: '#F8F9FA',
    subtext: '#ADB5BD',
    primary: '#3D8BFD',
    border: '#2C2C2C',
  },
};

export type ThemeMode = 'light' | 'dark';
export type FontScale = 'small' | 'normal' | 'large';
export type AppTheme = typeof themes.light;