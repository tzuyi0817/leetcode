/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const rearrangeSticks = function (n, k) {
  const MODULO = BigInt(10 ** 9 + 7);
  const dp = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(-1));

  const arrangeSticks = (sticks, visible) => {
    if (!sticks && !visible) return 1n;
    if (!sticks || !visible || visible > sticks) return 0n;
    if (dp[sticks][visible] !== -1) return dp[sticks][visible];
    const visibleArrange = arrangeSticks(sticks - 1, visible - 1);
    const unVisibleArrange = BigInt(sticks - 1) * arrangeSticks(sticks - 1, visible);
    const result = (visibleArrange + unVisibleArrange) % MODULO;

    dp[sticks][visible] = result;

    return result;
  };

  return Number(arrangeSticks(n, k));
};
