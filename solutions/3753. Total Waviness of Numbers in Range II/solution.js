/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
const totalWaviness = function (num1, num2) {
  const getWaviness = num => {
    if (num < 100) return 0;

    const target = `${num}`;
    const n = target.length;

    const dp = Array.from({ length: n }, () => {
      return new Array(100).fill(-1);
    });

    const getNextWaviness = (index, prev1, prev2, started, tight) => {
      if (index >= n) return { count: 1, waviness: 0 };

      const isValidPrev = started && prev1 !== -1 && prev2 !== -1;
      const prevKey = 10 * prev1 + prev2;

      if (isValidPrev && !tight && dp[index][prevKey] !== -1) {
        return dp[index][prevKey];
      }

      const limit = tight ? Number(target[index]) : 9;
      const result = { count: 0, waviness: 0 };

      for (let current = 0; current <= limit; current++) {
        const nextTight = tight && current === limit;

        if (!started && !current) {
          const next = getNextWaviness(index + 1, -1, -1, false, nextTight);

          result.count += next.count;
          result.waviness += next.waviness;
        } else {
          const isPeaks = current < prev2 && prev1 < prev2;
          const isValleys = current > prev2 && prev1 > prev2;
          const isWaviness = isValidPrev && (isPeaks || isValleys);
          const next = getNextWaviness(index + 1, prev2, current, true, nextTight);

          result.count += next.count;
          result.waviness += next.waviness + (isWaviness ? next.count : 0);
        }
      }

      if (isValidPrev && !tight) {
        dp[index][prevKey] = result;
      }

      return result;
    };

    return getNextWaviness(0, -1, -1, false, true).waviness;
  };

  return getWaviness(num2) - getWaviness(num1 - 1);
};
