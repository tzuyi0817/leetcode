/**
 * @param {string} s
 * @return {number}
 */
const longestBalanced = function (s) {
  const n = s.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  let result = 0;

  const isBalance = counts => {
    let targetCount = 0;

    for (const count of counts) {
      if (!count) continue;

      if (!targetCount) {
        targetCount = count;
      }

      if (count !== targetCount) return false;
    }

    return true;
  };

  for (let a = 0; a < n; a++) {
    const counts = new Array(26).fill(0);

    for (let b = a; b < n; b++) {
      const code = s[b].charCodeAt(0) - BASE_CODE;

      counts[code] += 1;

      if (isBalance(counts)) {
        const len = b - a + 1;

        result = Math.max(len, result);
      }
    }
  }

  return result;
};
