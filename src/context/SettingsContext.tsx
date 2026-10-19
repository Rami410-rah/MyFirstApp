import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes, ThemeMode, FontScale, AppTheme } from '../theme/themes';

const STORAGE_KEY = '@app_settings_lab7';

export type Settings = {
  theme: ThemeMode;
  fontScale: FontScale;
};

type SettingsContextValue = Settings & {
  colors: AppTheme;
  fontSizeMultiplier: number;
  setTheme: (value: ThemeMode) => void;
  setFontScale: (value: FontScale) => void;
  resetSettings: () => void;
  isReady: boolean;
};

const initialSettings: Settings = {
  theme: 'light',
  fontScale: 'normal',
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setSettings(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Ошибка загрузки настроек', error);
      } finally {
        setIsReady(true);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings)).catch(error =>
      console.error('Ошибка сохранения настроек', error)
    );
  }, [settings, isReady]);

  const setTheme = (theme: ThemeMode) => setSettings(curr => ({ ...curr, theme }));
  const setFontScale = (fontScale: FontScale) => setSettings(curr => ({ ...curr, fontScale }));
  const resetSettings = () => setSettings(initialSettings);

  const colors = themes[settings.theme];
  
  // Три размера шрифта: small (0.8), normal (1.0), large (1.3)
  const fontSizeMultiplier =
    settings.fontScale === 'small' ? 0.8 : settings.fontScale === 'large' ? 1.3 : 1.0;

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        colors,
        fontSizeMultiplier,
        setTheme,
        setFontScale,
        resetSettings,
        isReady,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings должен использоваться внутри SettingsProvider');
  }
  return context;
}