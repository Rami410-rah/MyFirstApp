import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { FontScale } from '../theme/themes';

export default function SettingsScreen() {
  const { theme, fontScale, colors, fontSizeMultiplier, setTheme, setFontScale, resetSettings } = useSettings();
  const getFontSize = (baseSize: number) => baseSize * fontSizeMultiplier;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Переключатель темы */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.text, fontSize: getFontSize(16) }]}>Тёмная тема</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={(enabled) => setTheme(enabled ? 'dark' : 'light')}
          trackColor={{ false: '#767577', true: colors.primary }}
        />
      </View>

      {/* Выбор 3 размеров шрифта */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, flexDirection: 'column', alignItems: 'flex-start' }]}>
        <Text style={[styles.label, { color: colors.text, fontSize: getFontSize(16), marginBottom: 12 }]}>Размер шрифта</Text>
        <View style={styles.fontRow}>
          {(['small', 'normal', 'large'] as FontScale[]).map((scale) => {
            const labels = { small: 'Мелкий', normal: 'Нормальный', large: 'Крупный' };
            const isSelected = fontScale === scale;
            return (
              <TouchableOpacity
                key={scale}
                style={[
                  styles.fontButton,
                  { 
                    backgroundColor: isSelected ? colors.primary : colors.background,
                    borderColor: colors.border,
                  }
                ]}
                onPress={() => setFontScale(scale)}
              >
                <Text style={{ color: isSelected ? '#FFFFFF' : colors.text, fontSize: getFontSize(14), fontWeight: '600' }}>
                  {labels[scale]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Кнопка сброса настроек */}
      <TouchableOpacity 
        style={[styles.resetButton, { borderColor: colors.primary, backgroundColor: colors.card }]} 
        onPress={resetSettings}
      >
        <Text style={{ color: colors.primary, fontSize: getFontSize(16), fontWeight: 'bold' }}>Сбросить настройки</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 16, borderRadius: 12, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  label: { fontWeight: '500' },
  fontRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
  fontButton: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, alignItems: 'center', flex: 1, marginHorizontal: 4 },
  resetButton: { padding: 14, borderRadius: 12, borderWidth: 1, alignItems: 'center', marginTop: 10 },
});