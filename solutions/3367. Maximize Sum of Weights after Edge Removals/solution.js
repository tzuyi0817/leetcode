/**
 * @param {number[][]} edges
 * @param {number} k
 * @return {number}
 */
const maximizeSumOfWeights = function (edges, k) {
  const n = edges.length + 1;
  const tree = Array.from({ length: n }, () => []);

  for (const [u, v, w] of edges) {
    tree[u].push({ node: v, w });
    tree[v].push({ node: u, w });
  }

  const dfs = (node, prev) => {
    const gains = [];
    let sum = 0;

    for (const { node: neighbor, w } of tree[node]) {
      if (prev === neighbor) continue;

      const { subSum, minusOneSubSum } = dfs(neighbor, node);
      const gain = minusOneSubSum + w - subSum;

      sum += subSum;

      if (gain > 0) {
        gains.push(gain);
      }
    }

    const limit = Math.min(gains.length, k);
    let totalGain = 0;
    let minusOneGain = 0;

    gains.sort((a, b) => b - a);

    for (let index = 0; index < limit; index++) {
      if (index < k - 1) {
        minusOneGain += gains[index];
      }

      totalGain += gains[index];
    }

    return {
      subSum: sum + totalGain,
      minusOneSubSum: sum + minusOneGain,
    };
  };

  return dfs(0, -1).subSum;
};
