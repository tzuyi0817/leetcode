/**
 * @param {string} source
 * @param {string} target
 * @param {character[]} original
 * @param {character[]} changed
 * @param {number[]} cost
 * @return {number}
 */
const minimumCost = function (source, target, original, changed, cost) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = source.length;
  const m = cost.length;
  const dist = Array.from({ length: 26 }, () => {
    return new Array(26).fill(Number.MAX_SAFE_INTEGER);
  });
  let result = 0;

  for (let index = 0; index < m; index++) {
    const a = original[index].charCodeAt(0) - BASE_CODE;
    const b = changed[index].charCodeAt(0) - BASE_CODE;

    dist[a][b] = Math.min(cost[index], dist[a][b]);
  }

  for (let k = 0; k < 26; k++) {
    for (let a = 0; a < 26; a++) {
      if (dist[a][k] === Number.MAX_SAFE_INTEGER) continue;

      for (let b = 0; b < 26; b++) {
        if (dist[k][b] === Number.MAX_SAFE_INTEGER) continue;

        dist[a][b] = Math.min(dist[a][k] + dist[k][b], dist[a][b]);
      }
    }
  }

  for (let index = 0; index < n; index++) {
    if (source[index] === target[index]) continue;

    const a = source[index].charCodeAt(0) - BASE_CODE;
    const b = target[index].charCodeAt(0) - BASE_CODE;

    if (dist[a][b] === Number.MAX_SAFE_INTEGER) return -1;

    result += dist[a][b];
  }

  return result;
};
