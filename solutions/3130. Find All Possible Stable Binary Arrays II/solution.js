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

  const getStableCount = (zeros, ones, last) => {
    if (zeros === 0) {
      return last === 0 || ones > limit ? 0 : 1;
    }

    if (ones === 0) {
      return last === 1 || zeros > limit ? 0 : 1;
    }

    if (dp[zeros][ones][last] !== -1) {
      return dp[zeros][ones][last];
    }

    let result = 0;

    if (last === 0) {
      const lastZeroCount = getStableCount(zeros - 1, ones, 0);
      const lastOneCount = getStableCount(zeros - 1, ones, 1);

      result = (lastZeroCount + lastOneCount) % MODULO;

      if (zeros > limit) {
        const raceCount = getStableCount(zeros - limit - 1, ones, 1);

        result = (result - raceCount + MODULO) % MODULO;
      }
    } else {
      const lastZeroCount = getStableCount(zeros, ones - 1, 0);
      const lastOneCount = getStableCount(zeros, ones - 1, 1);

      result = (lastZeroCount + lastOneCount) % MODULO;

      if (ones > limit) {
        const raceCount = getStableCount(zeros, ones - limit - 1, 0);

        result = (result - raceCount + MODULO) % MODULO;
      }
    }

    dp[zeros][ones][last] = result;

    return result;
  };

  const lastZeroCount = getStableCount(zero, one, 0);
  const lastOneCount = getStableCount(zero, one, 1);

  return (lastZeroCount + lastOneCount) % MODULO;
};
