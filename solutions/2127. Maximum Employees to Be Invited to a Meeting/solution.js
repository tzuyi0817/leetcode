/**
 * @param {number[]} favorite
 * @return {number}
 */
const maximumInvitations = function (favorite) {
  const n = favorite.length;
  const indegree = Array.from({ length: n }, () => 0);
  const maxChain = Array.from({ length: n }, () => 1);
  const seen = Array.from({ length: n }, () => false);
  const parent = Array.from({ length: n }, () => -1);
  const state = Array.from({ length: n }, () => '');
  let queue = [];
  let sumBilateral = 0;
  let maxCycle = 0;

  for (const employee of favorite) {
    indegree[employee] += 1;
  }

  for (let index = 0; index < n; index++) {
    if (!indegree[index]) {
      queue.push(index);
    }
  }

  while (queue.length) {
    const nextQueue = [];

    for (const employee of queue) {
      const target = favorite[employee];

      indegree[target] -= 1;

      if (!indegree[target]) {
        nextQueue.push(target);
      }

      maxChain[target] = Math.max(maxChain[employee] + 1, maxChain[target]);
    }

    queue = nextQueue;
  }

  for (let a = 0; a < n; a++) {
    const b = favorite[a];

    if (a === favorite[b] && a < b) {
      sumBilateral += maxChain[a] + maxChain[b];
    }
  }

  const findCycle = a => {
    const b = favorite[a];

    seen[a] = true;
    state[a] = 'visiting';

    if (state[b] === 'visiting') {
      let current = a;
      let len = 1;

      while (current !== b) {
        current = parent[current];
        len += 1;
      }

      maxCycle = Math.max(len, maxCycle);
    } else if (!seen[b]) {
      parent[b] = a;
      findCycle(b);
    }

    state[a] = 'visited';
  };

  for (let index = 0; index < n; index++) {
    if (!seen[index]) {
      findCycle(index);
    }
  }

  return Math.max(maxCycle, sumBilateral);
};
