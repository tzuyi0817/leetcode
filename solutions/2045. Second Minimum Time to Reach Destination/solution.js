/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} time
 * @param {number} change
 * @return {number}
 */
const secondMinimum = function (n, edges, time, change) {
  const graph = Array.from({ length: n + 1 }, () => []);
  const minElapsed = Array.from({ length: n + 1 }, () => {
    return new Array(2).fill(Number.MAX_SAFE_INTEGER);
  });
  let queue = [{ node: 1, elapsed: 0 }];

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  minElapsed[1][0] = 0;

  while (queue.length) {
    const nextQueue = [];

    for (const { node, elapsed } of queue) {
      const rounds = Math.floor(elapsed / change);
      const nextElapsed = rounds % 2 ? (rounds + 1) * change + time : elapsed + time;

      for (const neighbor of graph[node]) {
        const [firstElapsed, secondElapsed] = minElapsed[neighbor];

        if (nextElapsed < firstElapsed) {
          minElapsed[neighbor][0] = nextElapsed;
          nextQueue.push({ node: neighbor, elapsed: nextElapsed });
        }

        if (nextElapsed > firstElapsed && nextElapsed < secondElapsed) {
          if (neighbor === n) return nextElapsed;

          minElapsed[neighbor][1] = nextElapsed;
          nextQueue.push({ node: neighbor, elapsed: nextElapsed });
        }
      }
    }

    queue = nextQueue;
  }

  return -1;
};
