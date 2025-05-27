/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
const differenceOfSums = function (n, m) {
  const sum = ((1 + n) * n) / 2;

  const getDivisibleSum = () => {
    const multiple = Math.floor(n / m);

    if (multiple === 0) return 0;

    return ((m + multiple * m) * multiple) / 2;
  };

  const num2 = getDivisibleSum();
  const num1 = sum - num2;

  return num1 - num2;
};
