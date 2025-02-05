/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const areAlmostEqual = function (s1, s2) {
  const n = s1.length;
  let different = -1;
  let isSwap = false;

  for (let index = 0; index < n; index++) {
    if (s1[index] === s2[index]) continue;
    if (isSwap) return false;

    if (different !== -1) {
      if (s1[different] !== s2[index] || s1[index] !== s2[different]) {
        return false;
      }
      isSwap = true;
    }
    different = index;
  }
  return isSwap || different === -1;
};
