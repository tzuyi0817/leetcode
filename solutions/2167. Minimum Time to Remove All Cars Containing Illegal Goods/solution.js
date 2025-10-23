/**
 * @param {string} s
 * @return {number}
 */
const minimumTime = function (s) {
  const n = s.length;
  let left = 0;
  let result = n;

  for (let index = 0; index < n; index++) {
    const time = Math.min(left + s[index] * 2, index + 1);

    left = time;
    result = Math.min(left + n - index - 1, result);
  }

  return result;
};
