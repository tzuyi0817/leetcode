/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minChanges = function (nums, k) {
  const MAX_XOR = 1024;
  const n = nums.length;
  const counts = Array.from({ length: k }, () => new Map());
  const dp = Array.from({ length: k }, () => new Array(MAX_XOR).fill(n));

  const getGroupCount = index => Math.floor(n / k) + (n % k > index ? 1 : 0);

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const group = counts[index % k];
    const count = group.get(num) ?? 0;

    group.set(num, count + 1);
  }

  for (let xor = 0; xor < MAX_XOR; xor++) {
    const count = counts[k - 1].get(xor) ?? 0;

    dp[k - 1][xor] = getGroupCount(k - 1) - count;
  }

  for (let index = k - 2; index >= 0; index--) {
    const groupCount = getGroupCount(index);
    const nextMin = Math.min(...dp[index + 1]);

    for (let xor = 0; xor < MAX_XOR; xor++) {
      dp[index][xor] = groupCount + nextMin;

      for (const [num, count] of counts[index]) {
        const cost = groupCount - count;

        dp[index][xor] = Math.min(dp[index][xor], dp[index + 1][xor ^ num] + cost);
      }
    }
  }

  return dp[0][0];
};
