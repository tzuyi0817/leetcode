/**
 * @param {string} s
 * @param {string} target
 * @return {string}
 */
const lexPalindromicPermutation = function (s, target) {
  const n = s.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const counts = Array.from({ length: 26 }, () => 0);
  let middleChar = '';

  for (const char of s) {
    const code = char.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;
  }

  for (let code = 0; code < 26; code++) {
    const count = counts[code];

    if (count % 2 === 0) continue;

    if (middleChar) return '';

    middleChar = String.fromCharCode(code + BASE_CODE);
  }

  const half = Math.floor(n / 2);
  const halfCounts = counts.map(count => Math.floor(count / 2));
  const currentPrefix = [];
  let result = '';

  const findPalindromic = (index, isTight) => {
    if (result) return;

    if (index >= half) {
      const prefix = currentPrefix.join('');
      const suffix = currentPrefix.toReversed().join('');
      const palindromic = `${prefix}${middleChar}${suffix}`;

      if (palindromic > target) {
        result = palindromic;
      }

      return;
    }

    const targetCode = target[index].charCodeAt(0) - BASE_CODE;
    const start = isTight ? targetCode : 0;

    for (let code = start; code < 26; code++) {
      if (!halfCounts[code]) continue;

      const nextTight = isTight && code === targetCode;

      halfCounts[code] -= 1;
      currentPrefix.push(String.fromCharCode(code + BASE_CODE));
      findPalindromic(index + 1, nextTight);
      currentPrefix.pop();
      halfCounts[code] += 1;

      if (result) return;
    }
  };

  findPalindromic(0, true);

  return result;
};
