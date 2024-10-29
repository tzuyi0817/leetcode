/**
 * @param {number} n
 * @return {number}
 */
const tribonacci = function (n) {
  const dp = new Array(n + 1);
  const fibonacci = n => {
    if (n === 0) return 0;
    if (n <= 2) return 1;
    if (dp[n]) return dp[n];

    dp[n] = fibonacci(n - 1) + fibonacci(n - 2) + fibonacci(n - 3);
    return dp[n];
  };

  return fibonacci(n);
};
