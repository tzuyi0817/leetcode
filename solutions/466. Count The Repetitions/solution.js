/**
 * @param {string} s1
 * @param {number} n1
 * @param {string} s2
 * @param {number} n2
 * @return {number}
 */
const getMaxRepetitions = function (s1, n1, s2, n2) {
  const n = s1.length;
  const m = s2.length;
  let current = (repeatS1 = repeatS2 = 0);

  while (repeatS1 < n1) {
    for (let index = 0; index < n; index++) {
      if (s2[current] !== s1[index]) continue;
      current += 1;
      if (current !== m) continue;
      current = 0;
      repeatS2 += 1;
    }
    repeatS1 += 1;
    if (!current) break;
  }
  return Math.floor(((repeatS2 / n2) * n1) / repeatS1);
};
