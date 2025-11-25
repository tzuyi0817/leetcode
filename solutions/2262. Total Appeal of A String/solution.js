/**
 * @param {string} s
 * @return {number}
 */
const appealSum = function (s) {
  const n = s.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const lastSeen = Array.from({ length: 26 }, () => -1);
  let dp = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const code = s[index].charCodeAt(0) - BASE_CODE;

    dp += index - lastSeen[code];
    result += dp;
    lastSeen[code] = index;
  }

  return result;
};
