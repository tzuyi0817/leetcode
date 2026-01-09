/**
 * @param {number} k
 * @param {number[][]} rowConditions
 * @param {number[][]} colConditions
 * @return {number[][]}
 */
const buildMatrix = function (k, rowConditions, colConditions) {
  const topologicalSort = conditions => {
    const indegree = Array.from({ length: k + 1 }, () => 0);
    const graph = Array.from({ length: k + 1 }, () => []);
    const order = [];
    let queue = [];

    for (const [u, v] of conditions) {
      indegree[v] += 1;
      graph[u].push(v);
    }

    for (let index = 1; index <= k; index++) {
      if (indegree[index]) continue;

      queue.push(index);
      order.push(index);
    }

    while (queue.length) {
      const nextQueue = [];

      for (const node of queue) {
        for (const next of graph[node]) {
          indegree[next] -= 1;

          if (indegree[next]) continue;

          nextQueue.push(next);
          order.push(next);
        }
      }

      queue = nextQueue;
    }

    return order.length < k ? null : order;
  };

  const rowOrder = topologicalSort(rowConditions);

  if (!rowOrder) return [];

  const colOrder = topologicalSort(colConditions);

  if (!colOrder) return [];

  const rowIndices = Array.from({ length: k + 1 }, () => 0);
  const result = Array.from({ length: k }, () => new Array(k).fill(0));

  for (let row = 0; row < k; row++) {
    const num = rowOrder[row];

    rowIndices[num] = row;
  }

  for (let col = 0; col < k; col++) {
    const num = colOrder[col];
    const row = rowIndices[num];

    result[row][col] = num;
  }

  return result;
};
