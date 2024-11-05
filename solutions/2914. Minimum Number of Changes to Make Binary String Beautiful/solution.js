/**
 * @param {string} s
 * @return {number}
 */
const minChanges = function (s) {
  const n = s.length;
  let result = 0;

  for (let index = 1; index < n; index += 2) {
    if (s[index] !== s[index - 1]) result += 1;
  }
  return result;
};
