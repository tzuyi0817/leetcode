/**
 * @param {string} s
 * @return {number}
 */
const countPalindromicSubsequences = function (s) {
  const MODULO = 10 ** 9 + 7;
  const BASE_CODE = 'a'.charCodeAt(0);
  const CHARS_COUNT = 4;
  const n = s.length;
  const chars = Array(CHARS_COUNT)
    .fill('')
    .map(_ => []);
  const memo = Array(n)
    .fill('')
    .map(_ => Array(n).fill(0));

  for (let index = 0; index < n; index++) {
    const code = s[index].charCodeAt(0) - BASE_CODE;

    chars[code].push(index);
  }

  const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      arr[mid] >= target ? (right = mid) : (left = mid + 1);
    }
    return left;
  };

  const countPalindromic = (left, right) => {
    if (left > right) return 0;
    if (memo[left][right]) return memo[left][right];

    let result = 0;

    for (let index = 0; index < CHARS_COUNT; index++) {
      const charIndices = chars[index];

      if (!charIndices.length) continue;
      const charLeft = binarySearch(charIndices, left);

      if (charLeft === charIndices.length) continue;
      if (charIndices[charLeft] > right) continue;
      const charRight = binarySearch(charIndices, right + 1) - 1;

      result += charLeft === charRight ? 1 : 2;
      result += countPalindromic(charIndices[charLeft] + 1, charIndices[charRight] - 1);
      result %= MODULO;
    }
    return (memo[left][right] = result);
  };

  return countPalindromic(0, n - 1);
};
