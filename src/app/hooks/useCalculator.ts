import { useState } from 'react';

// Mapeo para convertir números y operadores a emojis espaciales
export const emojiMap: Record<string, string> = {
  '0': '🪐', '1': '🚀', '2': '🛸', '3': '👽', 
  '4': '🌠', '5': '🌍', '6': '☄️', '7': '🛰️', 
  '8': '🌌', '9': '🔭', '+': '⭐', '-': '🌑', 
  '*': '☀️', '/': '☄️', '.': '✨'
};

export function useCalculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [expression, setExpression] = useState('');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [justCalculated, setJustCalculated] = useState(false);

  const calculate = (first: number, second: number, op: string) => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '*': return first * second;
      case '/': return second !== 0 ? first / second : 0;
      default: return second;
    }
  };

  const handleKeyPress = (key: string, type: string) => {
    if (type === 'number') {
      if (justCalculated) {
        setDisplayValue(key === '.' ? '0.' : key);
        setExpression(emojiMap[key] || key);
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        setJustCalculated(false);
        return;
      }

      if (key === '.' && !waitingForSecondOperand && displayValue.includes('.')) {
        return;
      }

      if (waitingForSecondOperand) {
        setDisplayValue(key === '.' ? '0.' : key);
        setWaitingForSecondOperand(false);
        setExpression(prev => prev + ' ' + (emojiMap[key] || key));
      } else {
        const nextValue = key === '.'
          ? (displayValue === '0' ? '0.' : displayValue + '.')
          : (displayValue === '0' ? key : displayValue + key);
        setDisplayValue(nextValue);
        setExpression(prev => prev + (emojiMap[key] || key));
      }
      setJustCalculated(false);
    } else if (type === 'operator') {
      if (waitingForSecondOperand) {
        setOperator(key);
        setExpression(prev => prev.replace(/\s+[^ ]+\s*$/, ` ${emojiMap[key] || key} `));
        return;
      }

      const inputValue = parseFloat(displayValue);

      if (firstOperand === null) {
        setFirstOperand(inputValue);
      } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        setFirstOperand(result);
        setDisplayValue(String(result));
      }

      setWaitingForSecondOperand(true);
      setOperator(key);
      setExpression(prev => prev + ' ' + (emojiMap[key] || key) + ' ');
      setJustCalculated(false);
    } else if (type === 'equal') {
      const inputValue = parseFloat(displayValue);

      if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, inputValue, operator);
        setDisplayValue(String(result));
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        setExpression(String(result));
        setJustCalculated(true);
      }
    } else if (type === 'action') {
      if (key === 'AC') {
        setDisplayValue('0');
        setExpression('');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        setJustCalculated(false);
      } else if (key === '±') {
        const newValue = String(parseFloat(displayValue) * -1);
        setDisplayValue(newValue);
        setJustCalculated(false);
      } else if (key === '%') {
        const newValue = String(parseFloat(displayValue) / 100);
        setDisplayValue(newValue);
        setJustCalculated(false);
      }
    }
  };

  return {
    displayValue,
    expression,
    handleKeyPress,
  };
};