/**
 * @param {number[]} edges
 * @return {number}
 */
const longestCycle = function (edges) {
  const n = edges.length;
  const visitedTime = Array.from({ length: n }, () => 0);
  let time = 1;
  let result = -1;

  for (let index = 0; index < n; index++) {
    if (visitedTime[index]) continue;

    const startTime = time;
    let node = index;

    while (node !== -1 && !visitedTime[node]) {
      visitedTime[node] = time;
      node = edges[node];
      time += 1;
    }

    if (node !== -1 && visitedTime[node] >= startTime) {
      const len = time - visitedTime[node];

      result = Math.max(len, result);
    }
  }

  return result;
};
