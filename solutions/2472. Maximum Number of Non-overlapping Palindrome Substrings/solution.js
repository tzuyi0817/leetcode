/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const maxPalindromes = function (s, k) {
  const n = s.length;
  const dp = Array.from({ length: n + 1 }, () => 0);

  const isPalindrome = (left, right) => {
    if (left < 0) return false;

    while (left < right) {
      if (s[left] !== s[right]) return false;

      left += 1;
      right -= 1;
    }

    return true;
  };

  for (let index = k; index <= n; index++) {
    dp[index] = dp[index - 1];

    if (isPalindrome(index - k, index - 1)) {
      const len = 1 + dp[index - k];

      dp[index] = Math.max(len, dp[index]);
    }

    if (isPalindrome(index - k - 1, index - 1)) {
      const len = 1 + dp[index - k - 1];

      dp[index] = Math.max(len, dp[index]);
    }
  }

  return dp[n];
};
