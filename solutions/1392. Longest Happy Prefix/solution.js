/**
 * @param {string} s
 * @return {string}
 */
const longestPrefix = function (s) {
  const n = s.length;
  const lps = Array.from({ length: n }, () => 0);
  let length = 0;

  for (let index = 1; index < n; index++) {
    while (length && s[index] !== s[length]) {
      length = lps[length - 1];
    }
    if (s[index] === s[length]) {
      length += 1;
    }
    lps[index] = length;
  }
  return s.slice(0, lps[n - 1]);
};
