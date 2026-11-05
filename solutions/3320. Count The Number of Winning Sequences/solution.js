/**
 * @param {string} s
 * @return {number}
 */
const countWinningSequences = function (s) {
  const MODULO = 10 ** 9 + 7;
  const n = s.length;
  const summonsTypes = ['F', 'W', 'E'];
  const summonsMap = { F: 0, W: 1, E: 2 };
  const dp = Array.from({ length: n }, () => {
    return new Array(4).fill('').map(() => new Array(n * 2 + 1).fill(-1));
  });

  const getScore = (a, b) => {
    if (a === 'W' && b === 'F') return -1;

    if (a === 'F' && b === 'E') return -1;

    if (a === 'E' && b === 'W') return -1;

    if (a === 'F' && b === 'W') return 1;

    if (a === 'E' && b === 'F') return 1;

    if (a === 'W' && b === 'E') return 1;

    return 0;
  };

  const getBobWinSeqCount = (index, score, prev) => {
    if (index >= n) return score > 0 ? 1 : 0;

    const scoreKey = score + n;
    const prevKey = summonsMap[prev] ?? 3;

    if (dp[index][prevKey][scoreKey] !== -1) {
      return dp[index][prevKey][scoreKey];
    }

    const summons = s[index];
    let result = 0;

    for (const type of summonsTypes) {
      if (type === prev) continue;

      const nextScore = score + getScore(summons, type);
      const count = getBobWinSeqCount(index + 1, nextScore, type);

      result = (result + count) % MODULO;
    }

    dp[index][prevKey][scoreKey] = result;

    return result;
  };

  return getBobWinSeqCount(0, 0, '');
};
