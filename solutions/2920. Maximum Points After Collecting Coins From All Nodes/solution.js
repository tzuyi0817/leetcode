/**
 * @param {number[][]} edges
 * @param {number[]} coins
 * @param {number} k
 * @return {number}
 */
const maximumPoints = function (edges, coins, k) {
  const n = coins.length;
  const graph = Array.from({ length: n }, () => []);
  const maxCoin = Math.max(...coins);
  const maxMask = Math.ceil(Math.log2(maxCoin || 1));

  const dp = Array.from({ length: n }, () => {
    return new Array(maxMask + 1).fill(-1);
  });

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const collectMaxPoints = (node, prev, halved) => {
    if (halved > maxMask) return 0;

    if (dp[node][halved] !== -1) return dp[node][halved];

    const coin = Math.floor(coins[node] / (1 << halved));
    let collectAll = coin - k;
    let collectHalf = Math.floor(coin / 2);

    for (const neighbor of graph[node]) {
      if (neighbor === prev) continue;

      collectAll += collectMaxPoints(neighbor, node, halved);
      collectHalf += collectMaxPoints(neighbor, node, halved + 1);
    }

    const result = Math.max(collectAll, collectHalf);

    dp[node][halved] = result;

    return dp[node][halved];
  };

  return collectMaxPoints(0, -1, 0);
};
