/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
const minimumScore = function (s, t) {
  const m = s.length;
  const n = t.length;
  const prefixSum = Array.from({ length: m }, () => 0);
  const suffixSum = Array.from({ length: m }, () => 0);
  let j = 0;

  for (let index = 0; index < m; index++) {
    if (s[index] === t[j]) {
      prefixSum[index] += 1;
      j += 1;
    }

    prefixSum[index] += prefixSum[index - 1] ?? 0;
  }

  j = n - 1;

  for (let index = m - 1; index >= 0; index--) {
    if (s[index] === t[j]) {
      suffixSum[index] += 1;
      j -= 1;
    }

    suffixSum[index] += suffixSum[index + 1] ?? 0;
  }

  let result = n - Math.max(prefixSum[m - 1], suffixSum[0]);

  for (let index = 0; index < m - 1; index++) {
    const score = n - prefixSum[index] - suffixSum[index + 1];

    result = Math.min(score, result);
  }

  return Math.max(result, 0);
};
