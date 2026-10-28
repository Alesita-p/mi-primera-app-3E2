import { useState } from "react";

type Operation = "+" | "-";

interface Calculator {
  display: string;
  appendNumber: (num: string) => void;
  chooseOperation: (op: Operation) => void;
  clear: () => void;
  backspace: () => void;
  toggleSign: () => void;
  calculateResult: () => void;
}

const NUMBER_PATTERN = "(?:\\d+(?:\\.\\d*)?|\\.\\d+)";
const EXPRESSION_PATTERN = new RegExp(
  `^-?${NUMBER_PATTERN}(?:[+-]-?${NUMBER_PATTERN})*$`,
);

export default function useCalculator(): Calculator {
  const [display, setDisplay] = useState("0");

  const appendNumber = (num: string) => {
    if (!/^\d$|^\.$/.test(num)) return;

    setDisplay((currentDisplay: string): string => {
      const currentNumber = currentDisplay.match(/-?\d*\.?\d*$/)?.[0] ?? "";

      if (num === ".") {
        if (currentNumber.includes(".")) return currentDisplay;
        if (currentNumber === "" || currentNumber === "-") {
          return `${currentDisplay}0.`;
        }
        return `${currentDisplay}.`;
      }

      if (currentNumber === "0" || currentNumber === "-0") {
        return `${currentDisplay.slice(0, -currentNumber.length)}${
          currentNumber.startsWith("-") ? `-${num}` : num
        }`;
      }

      return `${currentDisplay}${num}`;
    });
  };

  const chooseOperation = (op: Operation) => {
    setDisplay((currentDisplay: string): string => {
      if (/[+-]$/.test(currentDisplay)) {
        return `${currentDisplay.slice(0, -1)}${op}`;
      }
      return `${currentDisplay}${op}`;
    });
  };

  const clear = () => setDisplay("0");

  const backspace = (): void => {
    setDisplay((currentDisplay: string): string => {
      const nextDisplay = currentDisplay.slice(0, -1);
      return nextDisplay === "" || nextDisplay === "-" ? "0" : nextDisplay;
    });
  };

  const toggleSign = () => {
    setDisplay((currentDisplay: string): string => {
      if (/[+-]$/.test(currentDisplay)) {
        if (/[+-]-$/.test(currentDisplay)) {
          return currentDisplay.slice(0, -1);
        }
        return `${currentDisplay}-`;
      }

      const currentNumber = currentDisplay.match(/-?(?:\d+(?:\.\d*)?|\.\d+)$/)?.[0];
      if (!currentNumber) return currentDisplay;

      const numberStart = currentDisplay.length - currentNumber.length;
      const toggledNumber = currentNumber.startsWith("-")
        ? currentNumber.slice(1)
        : `-${currentNumber}`;

      return `${currentDisplay.slice(0, numberStart)}${toggledNumber}`;
    });
  };

  const calculateResult = () => {
    setDisplay((currentDisplay: string): string => {
      if (!EXPRESSION_PATTERN.test(currentDisplay)) return currentDisplay;

      const firstNumber = currentDisplay.match(new RegExp(`^-?${NUMBER_PATTERN}`))?.[0];
      if (!firstNumber) return currentDisplay;

      let result = Number(firstNumber);
      const remainingExpression = currentDisplay.slice(firstNumber.length);
      const operations = remainingExpression.matchAll(
        new RegExp(`([+-])(-?${NUMBER_PATTERN})`, "g"),
      );

      for (const [, operator, operand] of operations) {
        const value = Number(operand);
        result = operator === "+" ? result + value : result - value;
      }

      if (!Number.isFinite(result)) return currentDisplay;
      const formattedResult = Number(result.toPrecision(12));
      return String(Object.is(formattedResult, -0) ? 0 : formattedResult);
    });
  };

  return {
    display,
    appendNumber,
    chooseOperation,
    clear,
    backspace,
    toggleSign,
    calculateResult,
  };
}