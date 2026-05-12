/**
 * @param {number} low
 * @param {number} high
 * @param {number} k
 * @return {number}
 */
const numberOfBeautifulIntegers = function (low, high, k) {
  const highStr = `${high}`;
  const n = highStr.length;
  const lowStr = `${low}`.padStart(n, '0');
  const dp = Array.from({ length: n }, () => {
    return new Array(k).fill('').map(() => {
      return new Array(n * 2).fill('').map(() => [
        [-1, -1],
        [-1, -1],
      ]);
    });
  });

  const getBeautifulCount = options => {
    const { index, remainder, balance, tight1, tight2, leadingZero } = options;

    if (index >= n) {
      return Number(balance === 0 && remainder === 0);
    }

    const t1 = Number(tight1);
    const t2 = Number(tight2);

    if (dp[index][remainder][balance + n][t1][t2] !== -1) {
      return dp[index][remainder][balance + n][t1][t2];
    }

    const start = tight1 ? Number(lowStr[index]) : 0;
    const end = tight2 ? Number(highStr[index]) : 9;
    let result = 0;

    for (let num = start; num <= end; num++) {
      const nextTight1 = tight1 && num === start;
      const nextTight2 = tight2 && num === end;
      const nextRemainder = (remainder * 10 + num) % k;
      const isEven = num % 2 === 0;
      const nextBalance = balance + (isEven ? Number(!leadingZero || num > 0) : -1);

      result += getBeautifulCount({
        index: index + 1,
        remainder: nextRemainder,
        balance: nextBalance,
        tight1: nextTight1,
        tight2: nextTight2,
        leadingZero: leadingZero && num === 0,
      });
    }

    dp[index][remainder][balance + n][t1][t2] = result;

    return result;
  };

  return getBeautifulCount({
    index: 0,
    remainder: 0,
    balance: 0,
    tight1: true,
    tight2: true,
    leadingZero: true,
  });
};
