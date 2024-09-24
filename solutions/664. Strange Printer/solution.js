/**
 * @param {string} s
 * @return {number}
 */
const strangePrinter = function (s) {
  const n = s.length;
  const memo = Array(n)
    .fill('')
    .map(_ => Array(n).fill(0));

  const turnPrinter = (left, right) => {
    if (left > right) return 0;
    if (memo[left][right]) return memo[left][right];

    let result = turnPrinter(left + 1, right) + 1;

    for (let index = left + 1; index <= right; index++) {
      if (s[left] !== s[index]) continue;

      const turnTimes = turnPrinter(left, index - 1) + turnPrinter(index + 1, right);

      result = Math.min(turnTimes, result);
    }
    return (memo[left][right] = result);
  };

  return turnPrinter(0, n - 1);
};
