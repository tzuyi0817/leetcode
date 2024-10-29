/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
const superEggDrop = function (k, n) {
  const dp = new Array(k + 1).fill('').map(_ => new Array(n + 1).fill(0));

  let moves = 0;

  while (dp[k][moves] < n) {
    moves += 1;

    for (let eggs = 1; eggs <= k; eggs++) {
      const broken = dp[eggs - 1][moves - 1];
      const unBroken = dp[eggs][moves - 1];

      dp[eggs][moves] = 1 + broken + unBroken;
    }
  }
  return moves;
};
