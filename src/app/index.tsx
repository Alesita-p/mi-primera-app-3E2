import React from 'react';
import { View, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import Display from './components/Display';
import Rejilla from './components/botones/Rejilla';
import { useCalculator } from './hooks/useCalculator';

export default function CalculatorScreen() {
  const { displayValue, expression, handleKeyPress } = useCalculator();
  const { width, height } = useWindowDimensions();
  const desktopPhoneStyle = width >= 600
    ? {
        width: Math.min(390, width - 48),
        height: Math.min(844, height - 32),
        justifyContent: 'space-between' as const,
      }
    : undefined;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.calculatorBox, desktopPhoneStyle]}>
        <Display expression={expression} value={displayValue} />
        <Rejilla onPressKey={handleKeyPress} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050510',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculatorBox: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#0f0f23',
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1f1f3d',
  },
});