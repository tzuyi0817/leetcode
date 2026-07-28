/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const sumOfPowers = function (nums, k) {
  const n = nums.length;
  const MODULO = 10 ** 9 + 7;
  const dp = Array.from({ length: k + 1 }, () => {
    return new Array((n + 1) ** 3).fill(-1);
  });

  nums.sort((a, b) => a - b);

  const getHash = (a, b, c) => {
    return (a + 1) * (n + 1) ** 2 + (b + 1) * (n + 1) + (c + 1);
  };

  const getPowerSum = (index, prev1, prev2, lastPick, len) => {
    if (!len) return nums[prev2] - nums[prev1];

    if (index >= n) return 0;

    const hash = getHash(prev1, prev2, lastPick);

    if (dp[len][hash] !== -1) return dp[len][hash];

    const num = nums[index];
    let nextPrev1 = prev1;
    let nextPrev2 = prev2;

    if (prev1 === -1) {
      nextPrev1 = index;
    } else if (prev2 === -1) {
      nextPrev2 = index;
    } else if (nums[prev2] - nums[prev1] > num - nums[lastPick]) {
      nextPrev1 = lastPick;
      nextPrev2 = index;
    }

    const skip = getPowerSum(index + 1, prev1, prev2, lastPick, len);
    const pick = getPowerSum(index + 1, nextPrev1, nextPrev2, index, len - 1);
    const result = (skip + pick) % MODULO;

    dp[len][hash] = result;

    return result;
  };

  return getPowerSum(0, -1, -1, -1, k);
};
