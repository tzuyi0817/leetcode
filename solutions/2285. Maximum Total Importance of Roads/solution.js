/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
const maximumImportance = function (n, roads) {
  const connectRoads = Array(n).fill(0);

  for (const [a, b] of roads) {
    connectRoads[a] += 1;
    connectRoads[b] += 1;
  }

  connectRoads.sort((a, b) => a - b);

  return connectRoads.reduce((result, count, index) => {
    return result + count * (index + 1);
  }, 0);
};
