/**
 * @param {number[]} edges
 * @return {number[]}
 */
const countVisitedNodes = function (edges) {
  const n = edges.length;
  const indegrees = Array.from({ length: n }, () => 0);
  const seen = Array.from({ length: n }, () => false);
  const nonCycleNodes = [];
  const result = Array.from({ length: n }, () => 0);
  let queue = [];

  for (const node of edges) {
    indegrees[node] += 1;
  }

  for (let node = 0; node < n; node++) {
    if (!indegrees[node]) {
      queue.push(node);
    }
  }

  while (queue.length) {
    const nextQueue = [];

    for (const node of queue) {
      const neighbor = edges[node];

      indegrees[neighbor] -= 1;

      if (!indegrees[neighbor]) {
        nextQueue.push(neighbor);
      }

      nonCycleNodes.push(node);
      seen[node] = true;
    }

    queue = nextQueue;
  }

  const fillCycle = node => {
    let current = node;
    let visitedNodes = 0;

    while (!seen[current]) {
      visitedNodes += 1;
      seen[current] = true;
      current = edges[current];
    }

    result[node] = visitedNodes;
    current = edges[node];

    while (current !== node) {
      result[current] = visitedNodes;
      current = edges[current];
    }
  };

  for (let node = 0; node < n; node++) {
    if (!seen[node]) {
      fillCycle(node);
    }
  }

  for (let index = nonCycleNodes.length - 1; index >= 0; index--) {
    const node = nonCycleNodes[index];

    result[node] = result[edges[node]] + 1;
  }

  return result;
};
