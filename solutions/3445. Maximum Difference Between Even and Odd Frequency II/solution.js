/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const maxDifference = function (s, k) {
  const n = s.length;
  const permutations = [];
  let result = Number.MIN_SAFE_INTEGER;

  for (let a = 0; a < 5; a++) {
    for (let b = 0; b < 5; b++) {
      if (a === b) continue;

      permutations.push([a, b]);
    }
  }

  for (const [a, b] of permutations) {
    const prefixA = [0];
    const prefixB = [0];
    const minDiff = [
      [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
    ];
    let left = 0;

    for (let index = 0; index < n; index++) {
      const num = Number(s[index]);
      const countA = prefixA.at(-1) + (num === a ? 1 : 0);
      const countB = prefixB.at(-1) + (num === b ? 1 : 0);

      prefixA.push(countA);
      prefixB.push(countB);

      while (index - left + 1 >= k && countA > prefixA[left] && countB > prefixB[left]) {
        const modA = prefixA[left] % 2;
        const modB = prefixB[left] % 2;

        minDiff[modA][modB] = Math.min(prefixA[left] - prefixB[left], minDiff[modA][modB]);
        left += 1;
      }
      const modA = prefixA.at(-1) % 2;
      const modB = prefixB.at(-1) % 2;
      const diff = prefixA.at(-1) - prefixB.at(-1) - minDiff[1 - modA][modB];

      result = Math.max(diff, result);
    }
  }

  return result;
};
