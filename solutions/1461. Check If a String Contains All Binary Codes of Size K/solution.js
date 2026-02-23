/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
const hasAllCodes = function (s, k) {
  const n = s.length;
  const codes = new Set();
  const MAX_CODE = 1 << k;
  let current = 0;

  for (let index = 0; index < n; index++) {
    current <<= 1;
    current |= Number(s[index]);

    if (index < k - 1) continue;

    current &= MAX_CODE - 1;
    codes.add(current);

    if (codes.size === MAX_CODE) return true;
  }

  return false;
};
