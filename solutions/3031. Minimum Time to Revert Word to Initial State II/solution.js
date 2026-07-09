/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
const minimumTimeToInitialState = function (word, k) {
  const n = word.length;
  const z = zFunction(word);
  const maxOperations = Math.ceil(n / k);

  for (let count = 1; count < maxOperations; count++) {
    const len = count * k;

    if (z[len] >= n - len) return count;
  }

  return maxOperations;
};

function zFunction(s) {
  const n = s.length;
  const z = Array.from({ length: n }, () => 0);
  let l = 0;
  let r = 0;

  for (let index = 1; index < n; index++) {
    if (index < r) {
      z[index] = Math.min(r - index, z[index - l]);
    }

    while (index + z[index] < n && s[z[index]] === s[index + z[index]]) {
      z[index] += 1;
    }

    if (index + z[index] > r) {
      l = index;
      r = index + z[index];
    }
  }

  return z;
}
