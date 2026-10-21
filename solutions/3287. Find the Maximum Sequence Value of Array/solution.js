/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxValue = function (nums, k) {
  const n = nums.length;
  const maxNum = Math.max(...nums);
  const maxBit = 32 - Math.clz32(maxNum);
  const maxXor = (1 << maxBit) - 1;

  const getPossibleORs = arr => {
    const dp = Array.from({ length: n }, () => {
      return new Array(k + 1).fill('').map(() => new Array(maxXor + 1).fill(false));
    });

    dp[0][1][arr[0]] = true;

    for (let index = 0; index < n; index++) {
      dp[index][0][0] = true;
    }

    for (let index = 1; index < n; index++) {
      for (let count = 1; count <= k; count++) {
        for (let num = 0; num <= maxXor; num++) {
          if (dp[index - 1][count][num]) {
            dp[index][count][num] = true;
          }

          if (dp[index - 1][count - 1][num]) {
            const nextNum = num | arr[index];

            dp[index][count][nextNum] = true;
          }
        }
      }
    }

    return dp;
  };

  const lefts = getPossibleORs(nums);
  const rights = getPossibleORs(nums.toReversed()).toReversed();
  let result = 0;

  for (let index = k - 1; index + k < n; index++) {
    for (let a = 0; a <= maxXor; a++) {
      for (let b = 0; b <= maxXor; b++) {
        if (lefts[index][k][a] && rights[index + 1][k][b]) {
          result = Math.max(a ^ b, result);
        }
      }
    }
  }

  return result;
};
