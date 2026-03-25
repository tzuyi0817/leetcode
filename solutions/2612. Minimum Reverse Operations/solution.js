/**
 * @param {number} n
 * @param {number} p
 * @param {number[]} banned
 * @param {number} k
 * @return {number[]}
 */
const minReverseOperations = function (n, p, banned, k) {
  const distances = Array.from({ length: n }, () => -1);
  const jumpDist = k - 1;

  for (const pos of banned) {
    distances[pos] = -2;
  }

  let queue = [p];

  distances[p] = 0;

  while (queue.length) {
    const nextQueue = [];
    const nextDist = distances[queue[0]] + 1;
    let minCovered = -1;
    let maxCovered = -1;

    for (const pos of queue) {
      let low = pos - jumpDist;
      let high = pos + jumpDist;

      if (low < 0) {
        low = jumpDist - pos;
      }

      if (high >= n) {
        high = 2 * (n - 1) - pos - jumpDist;
      }

      let index = low;

      while (index <= high) {
        if (index >= minCovered && index <= maxCovered) {
          index = maxCovered;
        } else if (distances[index] === -1) {
          distances[index] = nextDist;
          nextQueue.push(index);
        }

        index += 2;
      }

      if (high < minCovered || low > maxCovered) {
        minCovered = low;
        maxCovered = high;
      } else {
        minCovered = Math.min(low, minCovered);
        maxCovered = Math.max(high, maxCovered);
      }
    }

    queue = nextQueue.toSorted((a, b) => a - b);
  }

  return distances.map(dist => Math.max(dist, -1));
};
