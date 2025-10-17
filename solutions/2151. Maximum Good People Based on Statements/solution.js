/**
 * @param {number[][]} statements
 * @return {number}
 */
const maximumGood = function (statements) {
  const n = statements.length;
  const maxMask = 1 << n;
  let result = 0;

  const isValid = mask => {
    for (let a = 0; a < n; a++) {
      if (((mask >> a) & 1) === 0) continue;

      for (let b = 0; b < n; b++) {
        const state = statements[a][b];

        if (state === 2) continue;
        if (state !== ((mask >> b) & 1)) return false;
      }
    }

    return true;
  };

  for (let mask = 0; mask < maxMask; mask++) {
    if (isValid(mask)) {
      result = Math.max(popcount(mask), result);
    }
  }

  return result;
};

function popcount(x) {
  let count = 0;

  while (x) {
    x &= x - 1;
    count += 1;
  }

  return count;
}
