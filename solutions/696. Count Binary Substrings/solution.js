/**
 * @param {string} s
 * @return {number}
 */
const countBinarySubstrings = function (s) {
  const n = s.length;
  let prev = 0;
  let current = 1;
  let result = 0;

  for (let index = 1; index < n; index++) {
    if (s[index] === s[index - 1]) {
      current += 1;
    } else {
      prev = current;
      current = 1;
    }

    if (prev >= current) {
      result += 1;
    }
  }

  return result;
};
