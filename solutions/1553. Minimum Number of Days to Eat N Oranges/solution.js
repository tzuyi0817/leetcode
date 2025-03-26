/**
 * @param {number} n
 * @return {number}
 */
const minDays = function (n) {
  const memo = new Map();

  const eatOrange = oranges => {
    if (oranges <= 1) return oranges;
    if (memo.has(oranges)) return memo.get(oranges);
    const days2 = eatOrange(Math.floor(oranges / 2)) + (oranges % 2);
    const days3 = eatOrange(Math.floor(oranges / 3)) + (oranges % 3);
    const result = 1 + Math.min(days2, days3);

    memo.set(oranges, result);

    return result;
  };

  return eatOrange(n);
};
