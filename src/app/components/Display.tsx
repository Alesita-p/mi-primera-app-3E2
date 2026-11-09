import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DisplayProps {
  expression: string; // Secuencia de emojis o símbolos actuales
  value: string;      // Valor numérico real (resultado o número en curso)
}

export default function Display({ expression, value }: DisplayProps) {
  return (
    <View style={styles.displayContainer}>
      {/* Secuencia visual de emojis espaciales */}
      <Text style={styles.expressionText} numberOfLines={1} adjustsFontSizeToFit>
        {expression || '🪐 🚀 🛸'}
      </Text>
      {/* Pantalla principal con el número exacto */}
      <Text style={styles.valueText} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  displayContainer: {
    backgroundColor: '#0b0b1a', // Fondo espacial oscuro
    paddingVertical: 24,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    minHeight: 140,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  expressionText: {
    color: '#8b8bc3',
    fontSize: 22,
    marginBottom: 8,
  },
  valueText: {
    color: '#ffffff',
    fontSize: 56,
    fontWeight: '300',
  },
});