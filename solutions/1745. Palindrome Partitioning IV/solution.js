/**
 * @param {string} s
 * @return {boolean}
 */
const checkPartitioning = function (s) {
  const n = s.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(null));

  const isPalindrome = (a, b) => {
    if (a >= b) return true;
    if (dp[a][b] !== null) return dp[a][b];
    const result = s[a] === s[b] && isPalindrome(a + 1, b - 1);

    dp[a][b] = result;

    return result;
  };

  for (let a = 0; a < n - 2; a++) {
    const segment1 = isPalindrome(0, a);

    if (!segment1) continue;

    for (let b = a + 1; b < n - 1; b++) {
      const segment2 = isPalindrome(a + 1, b);

      if (!segment2) continue;
      const segment3 = isPalindrome(b + 1, n - 1);

      if (segment3) return true;
    }
  }

  return false;
};
