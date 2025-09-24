/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
const fractionToDecimal = function (numerator, denominator) {
  if (numerator === 0) return '0';

  let result = '';

  if (Math.sign(numerator) !== Math.sign(denominator)) {
    result += '-';
  }

  const den = Math.abs(denominator);
  let num = Math.abs(numerator);

  result += Math.floor(num / den);
  num %= den;

  if (num === 0) return result;

  const numMap = new Map();

  result += '.';

  while (num) {
    if (numMap.has(num)) {
      const index = numMap.get(num);

      return `${result.slice(0, index)}(${result.slice(index)})`;
    }

    numMap.set(num, result.length);
    num *= 10;
    result += Math.floor(num / den);
    num %= den;
  }

  return result;
};
