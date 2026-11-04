import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCalculator } from './hooks/useCalculator';

export default function CalculatorScreen() {
  const {
    number,
    prevNumber,
    formula,
    lastExpression,
    clean,
    deleteLastNumber,
    buildNumber,
    toggleSign,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    calculateResult,
    applyScientificFunction,
  } = useCalculator();

  const operationPreview = lastExpression || (formula ? `${prevNumber}${formula}${number}` : '');
  const previousResultPreview = lastExpression ? `${lastExpression} = ${number}` : '';

  return (
    <View style={styles.container}>
      <View style={styles.displayBox}>
        <Text style={styles.historyText} numberOfLines={1} adjustsFontSizeToFit>
          {previousResultPreview || ' '}
        </Text>
        <Text style={styles.operationText} numberOfLines={1} adjustsFontSizeToFit>
          {operationPreview || '0'}
        </Text>
        <Text style={styles.resultText} numberOfLines={1} adjustsFontSizeToFit>
          {number}
        </Text>
      </View>

      <View style={styles.panel}>
        <View style={styles.scientificRow}>
          <TouchableOpacity style={[styles.button, styles.lightButton]} onPress={() => applyScientificFunction('sqrt')}>
            <Text style={styles.lightButtonText}>√</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.lightButton]} onPress={() => applyScientificFunction('square')}>
            <Text style={styles.lightButtonText}>x²</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.lightButton]} onPress={() => applyScientificFunction('percent')}>
            <Text style={styles.lightButtonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.lightButton]} onPress={() => applyScientificFunction('pi')}>
            <Text style={styles.lightButtonText}>π</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.scientificRow}>
          <TouchableOpacity style={[styles.button, styles.lightButton]} onPress={() => applyScientificFunction('sin')}>
            <Text style={styles.lightButtonText}>sin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.lightButton]} onPress={() => applyScientificFunction('cos')}>
            <Text style={styles.lightButtonText}>cos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.lightButton]} onPress={() => applyScientificFunction('tan')}>
            <Text style={styles.lightButtonText}>tan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.lightButton]} onPress={() => applyScientificFunction('ln')}>
            <Text style={styles.lightButtonText}>ln</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={clean}>
            <Text style={styles.grayButtonText}>CE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={toggleSign}>
            <Text style={styles.grayButtonText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={deleteLastNumber}>
            <Text style={styles.grayButtonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={() => buildNumber('(')}>
            <Text style={styles.grayButtonText}>(</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={() => buildNumber(')')}>
            <Text style={styles.grayButtonText}>)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={divideOperation}>
            <Text style={styles.operatorButtonText}>÷</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buildNumber('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buildNumber('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buildNumber('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={multiplyOperation}>
            <Text style={styles.operatorButtonText}>x</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => buildNumber('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buildNumber('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buildNumber('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={subtractOperation}>
            <Text style={styles.operatorButtonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={addOperation}>
            <Text style={styles.operatorButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => buildNumber('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buildNumber('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buildNumber('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.zeroButton]} onPress={() => buildNumber('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buildNumber('.')}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowBottom}>
          <TouchableOpacity style={[styles.button, styles.equalButton, styles.equalGlow]} onPress={calculateResult}>
            <Text style={styles.operatorButtonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-end',
    paddingBottom: 30,
    paddingHorizontal: 12,
  },
  displayBox: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 18,
    paddingHorizontal: 8,
  },
  historyText: {
    color: '#8a8a8e',
    fontSize: 18,
    textAlign: 'right',
    minHeight: 22,
    marginBottom: 2,
  },
  operationText: {
    color: '#5c5c61',
    fontSize: 24,
    textAlign: 'right',
    minHeight: 28,
    marginBottom: 6,
  },
  resultText: {
    color: '#111111',
    fontSize: 70,
    textAlign: 'right',
    fontWeight: '300',
  },
  panel: {
    backgroundColor: '#efefef',
    borderRadius: 30,
    padding: 12,
  },
  scientificRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rowBottom: {
    alignItems: 'center',
    marginTop: 6,
  },
  button: {
    backgroundColor: '#dfe3eb',
    height: 72,
    width: 72,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightButton: {
    backgroundColor: '#eef2ff',
  },
  zeroButton: {
    width: 72,
    borderRadius: 24,
  },
  equalButton: {
    width: 180,
    borderRadius: 24,
  },
  equalGlow: {
    backgroundColor: '#ff9f0a',
  },
  operatorButton: {
    backgroundColor: '#ff9f0a',
  },
  grayButton: {
    backgroundColor: '#d0d5dd',
  },
  buttonText: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '600',
  },
  lightButtonText: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '600',
  },
  grayButtonText: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '700',
  },
  operatorButtonText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '700',
  },
});