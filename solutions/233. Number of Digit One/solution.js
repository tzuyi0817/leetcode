/**
 * @param {number} n
 * @return {number}
 */
const countDigitOne = function (n) {
  const sumCount = num => {
    if (num < 1) return 0;
    let first = num;
    let digits = 1;
    let rest = 0;

    while (first >= 10) {
      first = Math.floor(first / 10);
      digits *= 10;
    }
    rest = num % digits;

    const result = first * sumCount(digits - 1) + sumCount(rest);

    return result + (first === 1 ? rest + 1 : digits);
  };

  return sumCount(n);
};
