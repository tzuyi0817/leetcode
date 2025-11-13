/**
 * @param {string} s
 * @return {number}
 */
const maxOperations = function (s) {
  const n = s.length;
  let ones = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const char = s[index];

    if (char === '1') {
      ones += 1;
    } else if (s[index + 1] !== '0') {
      result += ones;
    }
  }

  return result;
};
