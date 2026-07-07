/**
 * @param {number} n
 * @return {number}
 */
const sumAndMultiply = function (n) {
  let x = 0;
  let pos = 0;
  let sum = 0;

  while (n) {
    const digit = n % 10;

    if (digit) {
      x += digit * 10 ** pos;
      pos += 1;
      sum += digit;
    }

    n = Math.floor(n / 10);
  }

  return x * sum;
};
