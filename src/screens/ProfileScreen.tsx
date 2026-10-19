import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSettings } from '../context/SettingsContext';

export default function ProfileScreen() {
  const { colors, fontSizeMultiplier } = useSettings();
  const getFontSize = (baseSize: number) => baseSize * fontSizeMultiplier;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={{ color: colors.text, fontSize: getFontSize(22), fontWeight: 'bold' }}>Профиль пользователя</Text>
        <Text style={{ color: colors.subtext, fontSize: getFontSize(14), marginTop: 8 }}>
          Здесь отображаются данные пользователя. Шрифт и тема синхронизированы.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  card: { padding: 20, borderRadius: 12, borderWidth: 1 },
});