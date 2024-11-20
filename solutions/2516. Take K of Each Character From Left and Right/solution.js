/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var takeCharacters = function (s, k) {
  if (k === 0) return 0;
  const n = s.length;
  const countMap = { a: 0, b: 0, c: 0 };
  let right = 0;
  let result = n;

  for (const letter of s) {
    countMap[letter] += 1;
  }
  if (countMap.a < k || countMap.b < k || countMap.c < k) return -1;

  for (let index = 0; index < n; index++) {
    const letter = s[index];

    while (right < n && countMap[s[right]] > k) {
      countMap[s[right]] -= 1;
      right += 1;
    }
    result = Math.min(index + n - right, result);
    countMap[letter] += 1;
  }
  return result;
};
