/**
 * @param {number} n
 * @param {number[][]} paths
 * @return {number}
 */
const longestCommonSubpath = function (n, paths) {
  const kBase = 165131n;
  const kHash = 8417508174513n;
  let left = 0;
  let right = Math.min(...paths.map(path => path.length));

  const rollingHash = (path, mid) => {
    const m = path.length;
    const hashSet = new Set();
    let hash = 0n;
    let maxPower = 1n;

    for (let index = 0; index < mid; index++) {
      const country = BigInt(path[index]);

      hash = (hash * kBase + country) % kHash;

      if (index < mid - 1) {
        maxPower = (maxPower * kBase) % kHash;
      }
    }

    hashSet.add(hash);

    for (let index = mid; index < m; index++) {
      const country = BigInt(path[index]);
      const leftCountry = BigInt(path[index - mid]);

      hash = (hash - ((leftCountry * maxPower) % kHash) + kHash) % kHash;
      hash = (hash * kBase + country) % kHash;
      hashSet.add(hash);
    }

    return hashSet;
  };

  const commonSubpath = mid => {
    const hashSets = paths.map(path => rollingHash(path, mid));

    for (const hash of hashSets[0]) {
      if (hashSets.every(set => set.has(hash))) {
        return true;
      }
    }

    return false;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    commonSubpath(mid) ? (left = mid + 1) : (right = mid - 1);
  }

  return right;
};
