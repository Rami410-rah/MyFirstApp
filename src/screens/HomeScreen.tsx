import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSettings } from '../context/SettingsContext';

export default function HomeScreen({ navigation }: any) {
  const { colors, fontSizeMultiplier } = useSettings();
  const getFontSize = (baseSize: number) => baseSize * fontSizeMultiplier;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={{ color: colors.text, fontSize: getFontSize(22), fontWeight: 'bold' }}>Главный экран</Text>
        <Text style={{ color: colors.subtext, fontSize: getFontSize(14), marginTop: 8 }}>
          Настройки темы и шрифта применяются глобально во всём приложении.
        </Text>
      </View>
      <Button title="Перейти в настройки" onPress={() => navigation.navigate('Settings')} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  card: { padding: 20, borderRadius: 12, borderWidth: 1, marginBottom: 20 },
});