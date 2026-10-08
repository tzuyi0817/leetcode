/**
 * @param {string} s
 * @return {string}
 */
const removeOuterParentheses = function (s) {
  const result = [];
  let diff = 0;

  for (const char of s) {
    const current = char === '(' ? diff++ : --diff;

    if (current) {
      result.push(char);
    }
  }

  return result.join('');
};
