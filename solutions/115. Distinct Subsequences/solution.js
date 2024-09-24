/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
const numDistinct = function (s, t) {
  const memo = new Map();
  const dp = (a, b) => {
    if (b === t.length) return 1;
    if (a === s.length || s.length - a < t.length - b) return 0;
    const key = `${a},${b}`;

    if (memo.has(key)) return memo.get(key);
    let result = dp(a + 1, b);

    if (s[a] === t[b]) {
      result += dp(a + 1, b + 1);
    }
    memo.set(key, result);
    return result;
  };

  return dp(0, 0);
};
