import { useState } from 'react';
import { Vibration } from 'react-native';

export const useCalculator = () => {
  const [formula, setFormula] = useState<string | null>(null);
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');
  const [lastExpression, setLastExpression] = useState('');

  const triggerVibration = () => {
    Vibration.vibrate(35);
  };

  const normalizeExpression = (value: string) =>
    value.replace(/x/gi, '*').replace(/÷/gi, '/').replace(/−/gi, '-').replace(/\s+/g, '');

  const evaluateExpression = (expression: string): string | null => {
    const safeExpression = normalizeExpression(expression);

    if (!/^[0-9+\-*/().]+$/.test(safeExpression)) return null;

    try {
      const result = Function(`"use strict"; return (${safeExpression});`)();
      if (!Number.isFinite(result)) return 'Error';
      return String(result);
    } catch {
      return null;
    }
  };

  const clean = () => {
    triggerVibration();
    setNumber('0');
    setPrevNumber('0');
    setFormula(null);
    setLastExpression('');
  };

  const deleteLastNumber = () => {
    triggerVibration();

    if (number.length <= 1) {
      setNumber('0');
      return;
    }

    setNumber(number.slice(0, -1));
  };

  const buildNumber = (textNumber: string) => {
    triggerVibration();

    if (formula === null && lastExpression && number !== '0') {
      setLastExpression('');
    }

    if (textNumber === '(' || textNumber === ')') {
      if (textNumber === '(') {
        if (number === '0') {
          setNumber('(');
        } else if (/[0-9)]$/.test(number)) {
          setNumber(`${number}*(`);
        } else {
          setNumber(`${number}(`);
        }
        return;
      }

      const openParentheses = (number.match(/\(/g) ?? []).length;
      const closeParentheses = (number.match(/\)/g) ?? []).length;

      if (openParentheses <= closeParentheses || /[+\-*/(]$/.test(number)) {
        return;
      }

      setNumber(`${number})`);
      return;
    }

    if (number.includes('.') && textNumber === '.') return;

    if (number === '0' && textNumber !== '.') {
      setNumber(textNumber);
      return;
    }

    if (number === '0' && textNumber === '.') {
      setNumber('0.');
      return;
    }

    setNumber(number + textNumber);
  };

  const toggleSign = () => {
    triggerVibration();

    if (number === '0') return;

    if (number.startsWith('-')) {
      setNumber(number.slice(1));
      return;
    }

    setNumber(`-${number}`);
  };

  const setLastNumber = () => {
    const toSave = number.endsWith('.') ? number.slice(0, -1) : number;
    setPrevNumber(toSave || '0');
    setNumber('0');
  };

  const applyOperator = (nextOperator: string) => {
    triggerVibration();

    if (formula && number !== '0') {
      const chainedExpression = `${prevNumber}${formula}${number}`;
      setPrevNumber(chainedExpression);
      setFormula(nextOperator);
      setNumber('0');
      return;
    }

    if (formula && number === '0') {
      setFormula(nextOperator);
      return;
    }

    if (!formula && lastExpression) {
      setPrevNumber(number || '0');
      setFormula(nextOperator);
      setNumber('0');
      setLastExpression('');
      return;
    }

    setPrevNumber(number || '0');
    setFormula(nextOperator);
    setNumber('0');
  };

  const divideOperation = () => {
    applyOperator('/');
  };

  const multiplyOperation = () => {
    applyOperator('x');
  };

  const subtractOperation = () => {
    applyOperator('-');
  };

  const addOperation = () => {
    applyOperator('+');
  };

  const calculateResult = () => {
    triggerVibration();

    if (!formula) {
      return;
    }

    const expression = `${prevNumber}${formula}${number}`;
    const result = evaluateExpression(expression);

    if (!result) return;

    setLastExpression(expression);
    setNumber(result);
    setPrevNumber('0');
    setFormula(null);
  };

  const formatResult = (value: number) => {
    if (!Number.isFinite(value)) {
      return 'Error';
    }

    if (Number.isInteger(value)) {
      return String(value);
    }

    return String(value.toFixed(10)).replace(/\.0+$|(?<=\.[0-9]*?)0+$/g, '').replace(/\.$/, '');
  };

  const applyScientificFunction = (kind: string) => {
    triggerVibration();

    const currentValue = Number(number === '0' ? prevNumber : number);

    if (!Number.isFinite(currentValue)) {
      setNumber('Error');
      return;
    }

    let result: number | null = null;
    let expressionLabel = '';

    switch (kind) {
      case 'sqrt':
        if (currentValue < 0) {
          setNumber('Error');
          return;
        }
        result = Math.sqrt(currentValue);
        expressionLabel = `√(${number === '0' ? prevNumber : number})`;
        break;
      case 'square':
        result = currentValue * currentValue;
        expressionLabel = `(${number === '0' ? prevNumber : number})²`;
        break;
      case 'inverse':
        if (currentValue === 0) {
          setNumber('Error');
          return;
        }
        result = 1 / currentValue;
        expressionLabel = `1/(${number === '0' ? prevNumber : number})`;
        break;
      case 'percent':
        result = currentValue / 100;
        expressionLabel = `(${number === '0' ? prevNumber : number})%`;
        break;
      case 'sin':
        result = Math.sin((currentValue * Math.PI) / 180);
        expressionLabel = `sin(${number === '0' ? prevNumber : number})`;
        break;
      case 'cos':
        result = Math.cos((currentValue * Math.PI) / 180);
        expressionLabel = `cos(${number === '0' ? prevNumber : number})`;
        break;
      case 'tan':
        result = Math.tan((currentValue * Math.PI) / 180);
        expressionLabel = `tan(${number === '0' ? prevNumber : number})`;
        break;
      case 'log':
        if (currentValue <= 0) {
          setNumber('Error');
          return;
        }
        result = Math.log10(currentValue);
        expressionLabel = `log(${number === '0' ? prevNumber : number})`;
        break;
      case 'ln':
        if (currentValue <= 0) {
          setNumber('Error');
          return;
        }
        result = Math.log(currentValue);
        expressionLabel = `ln(${number === '0' ? prevNumber : number})`;
        break;
      case 'pi':
        setNumber(String(Math.PI));
        setLastExpression('π');
        setPrevNumber('0');
        setFormula(null);
        return;
      case 'e':
        setNumber(String(Math.E));
        setLastExpression('e');
        setPrevNumber('0');
        setFormula(null);
        return;
      default:
        return;
    }

    setLastExpression(expressionLabel);
    setNumber(formatResult(result));
    setPrevNumber('0');
    setFormula(null);
  };

  return {
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
  };
};