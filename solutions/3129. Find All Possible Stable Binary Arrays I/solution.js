/**
 * @param {number} zero
 * @param {number} one
 * @param {number} limit
 * @return {number}
 */
const numberOfStableArrays = function (zero, one, limit) {
  const MODULO = 10 ** 9 + 7;
  const dp = Array.from({ length: zero + 1 }, () => {
    return new Array(one + 1).fill('').map(() => new Array(2).fill(-1));
  });

  const getStableCount = (zeros, ones, prev) => {
    if (zeros === 0 && ones === 0) return 1;

    if (dp[zeros][ones][prev] !== -1) {
      return dp[zeros][ones][prev];
    }

    const len = Math.min(limit, prev ? zeros : ones);
    let result = 0;

    for (let index = 1; index <= len; index++) {
      if (prev === 0) {
        const count = getStableCount(zeros, ones - index, 1);

        result = (result + count) % MODULO;
      } else {
        const count = getStableCount(zeros - index, ones, 0);

        result = (result + count) % MODULO;
      }
    }

    dp[zeros][ones][prev] = result;

    return result;
  };

  return (getStableCount(zero, one, 0) + getStableCount(zero, one, 1)) % MODULO;
};
