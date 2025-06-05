/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
const minTrioDegree = function (n, edges) {
  const indegree = Array.from({ length: n + 1 }, () => 0);
  const connected = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(false));
  let result = Number.MAX_SAFE_INTEGER;

  for (const [u, v] of edges) {
    indegree[u] += 1;
    indegree[v] += 1;
    connected[u][v] = true;
    connected[v][u] = true;
  }

  for (let u = 1; u <= n - 2; u++) {
    for (let v = u + 1; v <= n - 1; v++) {
      if (!connected[u][v]) continue;

      for (let k = v + 1; k <= n; k++) {
        if (!connected[v][k] || !connected[u][k]) continue;
        const degree = indegree[u] + indegree[v] + indegree[k] - 6;

        result = Math.min(degree, result);
      }
    }
  }

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
