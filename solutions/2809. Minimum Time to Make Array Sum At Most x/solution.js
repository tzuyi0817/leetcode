/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} x
 * @return {number}
 */
const minimumTime = function (nums1, nums2, x) {
  const n = nums1.length;
  const sum1 = nums1.reduce((sum, num) => sum + num);
  const sum2 = nums2.reduce((sum, num) => sum + num);
  const dp = Array.from({ length: n + 1 }, () => 0);
  const pairs = nums2.map((num, index) => {
    return { num1: nums1[index], num2: num };
  });

  pairs.sort((a, b) => a.num2 - b.num2);

  for (let a = 1; a <= n; a++) {
    const { num1, num2 } = pairs[a - 1];

    for (let b = a; b > 0; b--) {
      const reduceSum = dp[b - 1] + num1 + num2 * b;

      dp[b] = Math.max(reduceSum, dp[b]);
    }
  }

  for (let operation = 0; operation <= n; operation++) {
    const sum = sum1 + sum2 * operation;

    if (sum - dp[operation] <= x) {
      return operation;
    }
  }

  return -1;
};
