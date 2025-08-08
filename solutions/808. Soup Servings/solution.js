/**
 * @param {number} n
 * @return {number}
 */
const soupServings = function (n) {
  if (n > 4800) return 1;
  const copies = Math.ceil(n / 25);
  const dp = Array.from({ length: copies + 1 }, () => new Array(copies + 1).fill(-1));

  const pourSoup = (a, b) => {
    if (a <= 0 && b <= 0) return 0.5;
    if (b <= 0) return 0;
    if (a <= 0) return 1;
    if (dp[a][b] !== -1) return dp[a][b];
    const method1 = pourSoup(a - 4, b);
    const method2 = pourSoup(a - 3, b - 1);
    const method3 = pourSoup(a - 2, b - 2);
    const method4 = pourSoup(a - 1, b - 3);
    const result = 0.25 * (method1 + method2 + method3 + method4);

    dp[a][b] = result;

    return result;
  };

  return pourSoup(copies, copies);
};
