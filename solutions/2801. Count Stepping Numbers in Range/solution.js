/**
 * @param {string} low
 * @param {string} high
 * @return {number}
 */
const countSteppingNumbers = function (low, high) {
  const n = high.length;
  const leadingZeroLow = low.padStart(n, '0');
  const MODULO = 10 ** 9 + 7;
  const dp = Array.from({ length: n }, () => {
    return new Array(10).fill('').map(() =>
      new Array(2).fill('').map(() => {
        return new Array(2).fill(-1);
      }),
    );
  });

  const getSteppingCount = (index, prev, tight1, tight2, leadingZero) => {
    if (index >= n) return 1;

    const t1 = Number(tight1);
    const t2 = Number(tight2);

    if (dp[index][prev][t1][t2] !== -1) {
      return dp[index][prev][t1][t2];
    }

    const start = tight1 ? Number(leadingZeroLow[index]) : 0;
    const end = tight2 ? Number(high[index]) : 9;
    let result = 0;

    for (let num = start; num <= end; num++) {
      const nextTight1 = tight1 && num === start;
      const nextTight2 = tight2 && num === end;
      const nextLeadingZero = leadingZero && num === 0;

      if (leadingZero) {
        result += getSteppingCount(index + 1, num, nextTight1, nextTight2, nextLeadingZero);
      } else if (Math.abs(num - prev) === 1) {
        result += getSteppingCount(index + 1, num, nextTight1, nextTight2, false);
      }

      result = result % MODULO;
    }

    dp[index][prev][t1][t2] = result;

    return result;
  };

  return getSteppingCount(0, 0, true, true, true);
};
