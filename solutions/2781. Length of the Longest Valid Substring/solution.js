/**
 * @param {string} word
 * @param {string[]} forbidden
 * @return {number}
 */
const longestValidSubstring = function (word, forbidden) {
  const n = word.length;
  const forbiddenSet = new Set(forbidden);
  const maxSubLen = Math.max(...forbidden.map(text => text.length));
  let end = n - 1;
  let result = 0;

  for (let l = n - 1; l >= 0; l--) {
    const limit = Math.min(l + maxSubLen, end + 1);

    for (let index = l; index < limit; index++) {
      const substr = word.slice(l, index + 1);

      if (forbiddenSet.has(substr)) {
        end = index - 1;
        break;
      }
    }

    const len = end - l + 1;

    result = Math.max(len, result);
  }

  return result;
};
