/**
 * @param {number} n
 * @return {number}
 */
const countOrders = function (n) {
  const MODULO = 10 ** 9 + 7;
  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

  const releaseOrder = (pickup, delivery) => {
    if (pickup === n && delivery === n) return 1;
    if (dp[pickup][delivery]) return dp[pickup][delivery];

    let result = 0;

    if (pickup < n) {
      const count = releaseOrder(pickup + 1, delivery);

      result = (result + count * (n - pickup)) % MODULO;
    }
    if (pickup > delivery) {
      const count = releaseOrder(pickup, delivery + 1);

      result = (result + count * (pickup - delivery)) % MODULO;
    }
    dp[pickup][delivery] = result;

    return result;
  };

  return releaseOrder(0, 0);
};
