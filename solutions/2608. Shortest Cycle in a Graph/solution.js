/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
const findShortestCycle = function (n, edges) {
  const graph = Array.from({ length: n }, () => []);
  const MAX_LEN = n + 1;
  let result = MAX_LEN;

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const getCycleLength = startNode => {
    const dist = new Array(n).fill(-1);
    const parent = new Array(n).fill(-1);
    let queue = [startNode];
    let minCycle = MAX_LEN;

    dist[startNode] = 0;

    while (queue.length) {
      const nextQueue = [];

      for (const node of queue) {
        for (const neighbor of graph[node]) {
          if (dist[neighbor] === -1) {
            dist[neighbor] = dist[node] + 1;
            parent[neighbor] = node;
            nextQueue.push(neighbor);
          } else if (neighbor !== parent[node]) {
            const len = dist[neighbor] + dist[node] + 1;

            minCycle = Math.min(len, minCycle);
          }
        }
      }

      queue = nextQueue;
    }

    return minCycle;
  };

  for (let index = 0; index < n; index++) {
    const len = getCycleLength(index);

    if (len !== MAX_LEN) {
      result = Math.min(len, result);
    }
  }

  return result === MAX_LEN ? -1 : result;
};
