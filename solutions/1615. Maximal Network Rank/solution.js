/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
const maximalNetworkRank = function (n, roads) {
  const connected = new Set();
  const ranks = Array(n).fill(0);
  let result = 0;

  for (const [a, b] of roads) {
    ranks[a] += 1;
    ranks[b] += 1;
    connected.add(`${a}_${b}`).add(`${b}_${a}`);
  }

  for (let a = 1; a < n; a++) {
    for (let b = a - 1; b >= 0; b--) {
      const isConnect = connected.has(`${a}_${b}`);
      const rank = ranks[a] + ranks[b] - (isConnect ? 1 : 0);

      result = Math.max(result, rank);
    }
  }
  return result;
};
