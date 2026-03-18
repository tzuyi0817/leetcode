/**
 * @param {number} target
 * @param {number[][]} types
 * @return {number}
 */
const waysToReachTarget = function (target, types) {
  const MODULO = 10 ** 9 + 7;
  const n = types.length;
  const dp = Array.from({ length: n }, () => {
    return new Array(target + 1).fill(-1);
  });

  const getToReachWays = (index, remainder) => {
    if (!remainder) return 1;

    if (index >= n) return 0;

    if (dp[index][remainder] !== -1) return dp[index][remainder];

    const [count, mark] = types[index];
    const limitCount = Math.min(count, Math.floor(remainder / mark));
    let result = 0;

    for (let questions = 0; questions <= limitCount; questions++) {
      const earnPoints = questions * mark;
      const ways = getToReachWays(index + 1, remainder - earnPoints);

      result = (result + ways) % MODULO;
    }

    dp[index][remainder] = result;

    return result;
  };

  return getToReachWays(0, target);
};
