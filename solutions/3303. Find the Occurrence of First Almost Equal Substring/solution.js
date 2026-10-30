/**
 * @param {string} s
 * @param {string} pattern
 * @return {number}
 */
const minStartingIndex = function (s, pattern) {
  const n = s.length;
  const m = pattern.length;
  const z = zFunction(`${pattern}${s}`);
  const reversedPattern = [...pattern].toReversed().join('');
  const reversedS = [...s].toReversed().join('');
  const reversedZ = zFunction(`${reversedPattern}${reversedS}`);

  for (let index = 0; index <= n - m; index++) {
    const len = z[m + index] + reversedZ[n - index];

    if (len + 1 >= m) return index;
  }

  return -1;
};

function zFunction(s) {
  const n = s.length;
  const z = Array.from({ length: n }, () => 0);
  let left = 0;
  let right = 0;

  for (let index = 1; index < n; index++) {
    if (index < right) {
      z[index] = Math.min(z[index - left], right - index);
    }

    while (index + z[index] < n && s[z[index]] === s[index + z[index]]) {
      z[index] += 1;
    }

    if (index + z[index] > right) {
      left = index;
      right = index + z[index];
    }
  }

  return z;
}
