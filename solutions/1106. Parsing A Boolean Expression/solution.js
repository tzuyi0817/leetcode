/**
 * @param {string} expression
 * @return {boolean}
 */
const parseBoolExpr = function (expression) {
  const n = expression.length;

  const express = (a, b, operator) => {
    if (a === -1) return b;
    if (operator === '&') return a & b;

    return a | b;
  };

  const parseExpression = (start, end) => {
    const operator = expression[start];
    let result = -1;

    for (let index = start + 1; index <= end; index++) {
      const current = expression[index];

      if (/[!&|]/.test(current)) {
        const left = index;
        let layer = 0;

        while (expression[index] !== ')' || layer !== 1) {
          if (expression[index] === '(') layer += 1;
          if (expression[index] === ')') layer -= 1;
          index += 1;
        }
        const subResult = parseExpression(left, index);

        result = express(result, subResult, operator);
      } else if (current === 't') {
        result = express(result, true, operator);
      } else if (current === 'f') {
        result = express(result, false, operator);
      }
    }
    return operator === '!' ? !result : result;
  };

  return parseExpression(0, n - 1);
};
