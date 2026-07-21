/**
 * @param {string} s
 * @return {number}
 */
const maxActiveSectionsAfterTrade = function (s) {
  const n = s.length;
  const continuesZeroGroups = [];
  let countOnes = 0;

  for (let index = 0; index < n; index++) {
    if (s[index] === '1') {
      countOnes += 1;

      continue;
    }

    if (s[index - 1] === '0') {
      const last = continuesZeroGroups.length - 1;

      continuesZeroGroups[last] += 1;
    } else {
      continuesZeroGroups.push(1);
    }
  }

  const groups = continuesZeroGroups.length;

  if (groups < 2) return countOnes;

  let maxMerge = 0;

  for (let index = 1; index < groups; index++) {
    const a = continuesZeroGroups[index - 1];
    const b = continuesZeroGroups[index];

    maxMerge = Math.max(a + b, maxMerge);
  }

  return countOnes + maxMerge;
};
