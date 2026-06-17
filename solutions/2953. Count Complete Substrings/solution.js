/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
const countCompleteSubstrings = function (word, k) {
  const n = word.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const uniqueChars = new Set(word).size;
  let result = 0;

  const getCode = char => char.charCodeAt(0) - BASE_CODE;

  for (let len = k; len <= n && len <= uniqueChars * k; len += k) {
    const counts = new Array(26).fill(0);
    let chars = 0;

    for (let index = 0; index < n; index++) {
      const code = getCode(word[index]);
      const prevCode = index ? getCode(word[index - 1]) : code;

      if (Math.abs(code - prevCode) > 2) {
        counts.fill(0);
        chars = 0;
      }

      counts[code] += 1;
      chars += 1;

      if (chars > len) {
        const firstCode = getCode(word[index - len]);

        counts[firstCode] -= 1;
        chars -= 1;
      }

      if (chars === len && counts.every(count => count === k || !count)) {
        result += 1;
      }
    }
  }

  return result;
};
