/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
const countPaths = function (n, edges) {
  const sieve = Array.from({ length: n + 1 }, () => true);
  const graph = Array.from({ length: n + 1 }, () => []);
  let result = 0;

  sieve[0] = false;
  sieve[1] = false;

  for (let num = 2; num * num <= n; num++) {
    if (!sieve[num]) continue;

    for (let next = num * num; next <= n; next += num) {
      if (sieve[next]) {
        sieve[next] = false;
      }
    }
  }

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const dfs = (node, prev) => {
    let zeroPaths = sieve[node] ? 0 : 1;
    let onePaths = sieve[node] ? 1 : 0;

    for (const neighbor of graph[node]) {
      if (neighbor === prev) continue;

      const { zeroPaths: zeroChildPaths, onePaths: oneChildPaths } = dfs(neighbor, node);

      result += zeroPaths * oneChildPaths + onePaths * zeroChildPaths;

      if (sieve[node]) {
        onePaths += zeroChildPaths;
      } else {
        zeroPaths += zeroChildPaths;
        onePaths += oneChildPaths;
      }
    }

    return { zeroPaths, onePaths };
  };

  dfs(1, -1);

  return result;
};
