/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
const magnificentSets = function (n, edges) {
  const graph = Array.from({ length: n + 1 }, () => []);
  const groups = Array.from({ length: n + 1 }, (_, index) => index);
  const ranks = Array.from({ length: n + 1 }, () => 0);

  const find = node => {
    const group = groups[node];

    return group === node ? node : find(group);
  };

  const union = (a, b) => {
    const x = find(a);
    const y = find(b);

    if (x === y) return;
    if (ranks[x] > ranks[y]) {
      groups[y] = x;
    } else if (ranks[y] > ranks[x]) {
      groups[x] = y;
    } else {
      groups[y] = x;
      ranks[x] += 1;
    }
  };

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
    union(a, b);
  }

  const getGroupSize = node => {
    const stepMap = new Map();
    let queue = [node];
    let step = 0;

    stepMap.set(node, 0);

    while (queue.length) {
      const nextQueue = [];

      for (const nextNode of queue) {
        for (const neighbor of graph[nextNode]) {
          if (stepMap.has(neighbor)) {
            if (stepMap.get(neighbor) === step) return -1;
          } else {
            nextQueue.push(neighbor);
            stepMap.set(neighbor, step + 1);
          }
        }
      }
      step += 1;
      queue = nextQueue;
    }
    return step;
  };

  const groupNodes = Array.from({ length: n + 1 }, () => []);
  let result = 0;

  for (let node = 1; node <= n; node++) {
    const group = find(node);

    groupNodes[group].push(node);
  }

  for (const nodes of groupNodes) {
    let maxGroupSize = 0;

    for (const node of nodes) {
      const groupSize = getGroupSize(node);

      if (groupSize === -1) return -1;

      maxGroupSize = Math.max(groupSize, maxGroupSize);
    }
    result += maxGroupSize;
  }
  return result;
};
