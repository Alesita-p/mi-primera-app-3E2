import React from 'react';
import { View, StyleSheet } from 'react-native';
import Boton from './boton';

interface RejillaProps {
  onPressKey: (key: string, type: string) => void;
}

export default function Rejilla({ onPressKey }: RejillaProps) {
  return (
    <View style={styles.gridContainer}>
      {/* Fila 1 */}
      <View style={styles.row}>
        <Boton emoji="🧹" label="AC" type="action" onPress={() => onPressKey('AC', 'action')} />
        <Boton emoji="±" label="+/-" type="action"  onPress={() => onPressKey('±', 'action')} />
        <Boton emoji="%" label="%" type="action"  onPress={() => onPressKey('%', 'action')} />
        <Boton emoji="☄️" label="÷" type="operator" onPress={() => onPressKey('/', 'operator')} />
      </View>

      {/* Fila 2 */}
      <View style={styles.row}>
        <Boton emoji="🛰️" label="7" onPress={() => onPressKey('7', 'number')} />
        <Boton emoji="🌌" label="8" onPress={() => onPressKey('8', 'number')} />
        <Boton emoji="🔭" label="9" onPress={() => onPressKey('9', 'number')} />
        <Boton emoji="☀️" label="×" type="operator" onPress={() => onPressKey('*', 'operator')} />
      </View>

      {/* Fila 3 */}
      <View style={styles.row}>
        <Boton emoji="🌠" label="4" onPress={() => onPressKey('4', 'number')} />
        <Boton emoji="🌍" label="5" onPress={() => onPressKey('5', 'number')} />
        <Boton emoji="☄️" label="6" onPress={() => onPressKey('6', 'number')} />
        <Boton emoji="🌑" label="-" type="operator" onPress={() => onPressKey('-', 'operator')} />
      </View>

      {/* Fila 4 */}
      <View style={styles.row}>
        <Boton emoji="🚀" label="1" onPress={() => onPressKey('1', 'number')} />
        <Boton emoji="🛸" label="2" onPress={() => onPressKey('2', 'number')} />
        <Boton emoji="👽" label="3" onPress={() => onPressKey('3', 'number')} />
        <Boton emoji="⭐" label="+" type="operator" onPress={() => onPressKey('+', 'operator')} />
      </View>

      {/* Fila 5 */}
      <View style={styles.row}>
        <Boton emoji="🪐" label="0" isWide={true} onPress={() => onPressKey('0', 'number')} />
        <Boton emoji="✨" label="." onPress={() => onPressKey('.', 'number')} />
        <Boton emoji="🚀" label="=" type="equal" onPress={() => onPressKey('=', 'equal')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
});