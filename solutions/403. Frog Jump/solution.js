/**
 * @param {number[]} stones
 * @return {boolean}
 */
const canCross = function (stones) {
  const n = stones.length;
  const dp = Array(n)
    .fill('')
    .map(_ => new Set());
  const stoneMap = stones.reduce((map, stone, index) => {
    return map.set(stone, index);
  }, new Map());

  dp[0].add(0);

  for (let index = 0; index < n; index++) {
    const stone = stones[index];

    for (const jump of dp[index]) {
      for (let unit = -1; unit < 2; unit++) {
        const nextJump = jump + unit;

        if (nextJump < 1) continue;
        const jumpToStone = stone + nextJump;

        if (jumpToStone === stones[n - 1]) return true;
        if (!stoneMap.has(jumpToStone)) continue;
        const jumpToIndex = stoneMap.get(jumpToStone);

        dp[jumpToIndex].add(nextJump);
      }
    }
  }
  return false;
};
