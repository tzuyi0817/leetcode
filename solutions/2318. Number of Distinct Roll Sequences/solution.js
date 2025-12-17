/**
 * @param {number} n
 * @return {number}
 */
const distinctSequences = function (n) {
  const MODULO = 10 ** 9 + 7;
  const nextRollMap = {
    0: [1, 2, 3, 4, 5, 6],
    1: [2, 3, 4, 5, 6],
    2: [1, 3, 5],
    3: [1, 2, 4, 5],
    4: [1, 3, 5],
    5: [1, 2, 3, 4, 6],
    6: [1, 5],
  };
  const dp = Array.from({ length: n }, () => {
    return new Array(7).fill('').map(() => new Array(7).fill(-1));
  });

  const rollDice = (index, prev1, prev2) => {
    if (index >= n) return 1;
    if (dp[index][prev1][prev2] !== -1) return dp[index][prev1][prev2];

    const sides = nextRollMap[prev1];
    let result = 0;

    for (const next of sides) {
      if (next === prev2) continue;

      result = (result + rollDice(index + 1, next, prev1)) % MODULO;
    }

    dp[index][prev1][prev2] = result;

    return result;
  };

  return rollDice(0, 0, 0);
};
