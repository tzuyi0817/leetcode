/**
 * @param {number[][]} edges
 * @return {number[]}
 */
const timeTaken = function (edges) {
  const n = edges.length + 1;
  const graph = Array.from({ length: n }, () => []);
  const dp = Array.from({ length: n }, () => null);
  const result = [];

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const getTime = node => (node % 2 ? 1 : 2);

  const dfs = (node, prev) => {
    const top1 = { node: -1, time: 0 };
    const top2 = { node: -1, time: 0 };

    for (const neighbor of graph[node]) {
      if (neighbor === prev) continue;

      const time = getTime(neighbor);
      const total = time + dfs(neighbor, node);

      if (total > top1.time) {
        top2.node = top1.node;
        top2.time = top1.time;
        top1.node = neighbor;
        top1.time = total;
      } else if (total > top2.time) {
        top2.node = neighbor;
        top2.time = total;
      }
    }

    dp[node] = { top1, top2 };

    return top1.time;
  };

  const reroot = (node, prev, maxTime) => {
    const { top1, top2 } = dp[node];
    const time = getTime(node);

    result[node] = Math.max(maxTime, top1.time);

    for (const neighbor of graph[node]) {
      if (neighbor === prev) continue;

      const childTime = top1.node === neighbor ? top2.time : top1.time;
      const nextMaxTime = time + Math.max(maxTime, childTime);

      reroot(neighbor, node, nextMaxTime);
    }
  };

  dfs(0, -1);
  reroot(0, -1, 0);

  return result;
};
