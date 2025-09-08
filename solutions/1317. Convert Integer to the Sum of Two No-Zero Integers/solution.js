/**
 * @param {number} n
 * @return {number[]}
 */
const getNoZeroIntegers = function (n) {
  let a = 0;
  let b = 0;
  let carry = 0;
  let digit = 0;

  while (n) {
    let num = (n % 10) - carry;

    n = Math.floor(n / 10);

    if (num < 0) {
      num += 10;
      n -= 1;
    }

    if (n <= 0 && num <= 0) return [a, b];

    if (num === 1 && n) {
      a += 2 * 10 ** digit;
      b += 9 * 10 ** digit;
      carry = 1;
    } else if (num === 0) {
      a += 5 * 10 ** digit;
      b += 5 * 10 ** digit;
      carry = 1;
    } else {
      const half = Math.floor(num / 2);

      a += half * 10 ** digit;
      b += (num - half) * 10 ** digit;
      carry = 0;
    }

    digit += 1;
  }

  return [a, b];
};
