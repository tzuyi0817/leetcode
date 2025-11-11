/**
 * @param {string} s
 * @return {number}
 */
const sumScores = function (s) {
  const n = s.length;
  const z = Array.from({ length: n }, () => 0);
  let left = 0;
  let right = 0;

  for (let index = 1; index < n; index++) {
    if (index < right) {
      z[index] = Math.min(right - index, z[index - left]);
    }

    while (index + z[index] < n && s[z[index]] === s[index + z[index]]) {
      z[index] += 1;
    }

    if (index + z[index] > right) {
      left = index;
      right = index + z[index];
    }
  }

  return z.reduce((sum, len) => sum + len) + n;
};
