/**
 * @param {string} expression
 * @return {number}
 */
const minOperationsToFlip = function (expression) {
  const n = expression.length;
  const stack = [];
  const bracketMap = new Map();

  for (let index = 0; index < n; index++) {
    const char = expression[index];

    if (char === '(') {
      stack.push(index);
    } else if (char === ')') {
      bracketMap.set(index, stack.pop());
    }
  }

  const getMinFlipCost = (start, end) => {
    if (start === end) return [Number(expression[start]), 1];
    const startBracket = bracketMap.get(end) ?? end;

    if (start === startBracket) return getMinFlipCost(start + 1, end - 1);
    const [value1, cost1] = getMinFlipCost(start, startBracket - 2);
    const [value2, cost2] = getMinFlipCost(startBracket, end);
    const operator = expression[startBracket - 1];

    if (operator === '&') {
      if (value1 === 0 && value2 === 0) {
        return [0, Math.min(cost1 + 1, cost2 + 1, cost1 + cost2)];
      }

      if (value1 === 1 && value2 === 1) {
        return [1, Math.min(cost1, cost2)];
      }

      return [0, 1];
    } else {
      if (value1 === 0 && value2 === 0) {
        return [0, Math.min(cost1, cost2)];
      }

      if (value1 === 1 && value2 === 1) {
        return [1, Math.min(cost1 + 1, cost2 + 1, cost1 + cost2)];
      }

      return [1, 1];
    }
  };

  return getMinFlipCost(0, n - 1)[1];
};
