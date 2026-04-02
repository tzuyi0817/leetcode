/**
 * @param {number[][]} coins
 * @return {number}
 */
const maximumAmount = function (coins) {
  const m = coins.length;
  const n = coins[0].length;
  const dp = Array.from({ length: m }, () => {
    return new Array(n).fill('').map(() => new Array(3).fill(null));
  });

  const earnMoney = (row, col, neutral) => {
    if (row < 0 || col < 0 || row >= m || col >= n) {
      return Number.MIN_SAFE_INTEGER;
    }

    if (dp[row][col][neutral] !== null) {
      return dp[row][col][neutral];
    }

    const coin = coins[row][col];

    if (row === m - 1 && col === n - 1) {
      return neutral && coin < 0 ? 0 : coin;
    }

    let result = Number.MIN_SAFE_INTEGER;

    if (coin < 0 && neutral) {
      const moveDownMoney = earnMoney(row + 1, col, neutral - 1);
      const moveRightMoney = earnMoney(row, col + 1, neutral - 1);

      result = Math.max(moveDownMoney, moveRightMoney, result);
    }

    const moveDownMoney = coin + earnMoney(row + 1, col, neutral);
    const moveRightMoney = coin + earnMoney(row, col + 1, neutral);

    result = Math.max(moveDownMoney, moveRightMoney, result);

    dp[row][col][neutral] = result;

    return result;
  };

  return earnMoney(0, 0, 2);
};
