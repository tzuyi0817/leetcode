/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} invocations
 * @return {number[]}
 */
const remainingMethods = function (n, k, invocations) {
  const graph = Array.from({ length: n }, () => new Set());
  const suspicious = Array.from({ length: n }, () => false);
  const result = [];

  for (const [a, b] of invocations) {
    graph[a].add(b);
  }

  const dfs = (node, prev) => {
    if (suspicious[node]) return;

    suspicious[node] = true;

    for (const neighbor of graph[node]) {
      if (node === prev) continue;

      dfs(neighbor, node);
    }
  };

  dfs(k, -1);

  for (const [a, b] of invocations) {
    if (suspicious[a] && suspicious[b]) continue;

    if (suspicious[b]) {
      return Array.from({ length: n }, (_, index) => index);
    }
  }

  for (let node = 0; node < n; node++) {
    if (!suspicious[node]) {
      result.push(node);
    }
  }

  return result;
};
