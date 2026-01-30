/**
 * @param {string} source
 * @param {string} target
 * @param {string[]} original
 * @param {string[]} changed
 * @param {number[]} cost
 * @return {number}
 */
const minimumCost = function (source, target, original, changed, cost) {
  const substrMap = new Map();
  const subLengthSet = new Set();

  for (const substr of original) {
    if (substrMap.has(substr)) continue;

    substrMap.set(substr, substrMap.size);
    subLengthSet.add(substr.length);
  }

  for (const substr of changed) {
    if (substrMap.has(substr)) continue;

    substrMap.set(substr, substrMap.size);
    subLengthSet.add(substr.length);
  }

  const n = source.length;
  const m = original.length;
  const subCount = substrMap.size;
  const dist = Array.from({ length: subCount }, () => {
    return new Array(subCount).fill(Number.MAX_SAFE_INTEGER);
  });

  for (let index = 0; index < m; index++) {
    const a = substrMap.get(original[index]);
    const b = substrMap.get(changed[index]);

    dist[a][b] = Math.min(cost[index], dist[a][b]);
  }

  for (let k = 0; k < subCount; k++) {
    for (let a = 0; a < subCount; a++) {
      if (dist[a][k] === Number.MAX_SAFE_INTEGER) continue;

      for (let b = 0; b < subCount; b++) {
        if (dist[k][b] === Number.MAX_SAFE_INTEGER) continue;

        dist[a][b] = Math.min(dist[a][k] + dist[k][b], dist[a][b]);
      }
    }
  }

  const dp = Array.from({ length: n + 1 }, () => Number.MAX_SAFE_INTEGER);

  dp[0] = 0;

  for (let index = 0; index < n; index++) {
    if (dp[index] === Number.MAX_SAFE_INTEGER) continue;

    if (source[index] === target[index]) {
      dp[index + 1] = Math.min(dp[index + 1], dp[index]);
    }

    for (const len of subLengthSet) {
      if (index + len > n) continue;

      const subA = source.slice(index, index + len);
      const subB = target.slice(index, index + len);

      if (!substrMap.has(subA) || !substrMap.has(subB)) continue;

      const a = substrMap.get(subA);
      const b = substrMap.get(subB);

      dp[index + len] = Math.min(dp[index] + dist[a][b], dp[index + len]);
    }
  }

  return dp[n] === Number.MAX_SAFE_INTEGER ? -1 : dp[n];
};
