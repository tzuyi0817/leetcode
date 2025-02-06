/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const constrainedSubsetSum = function (nums, k) {
  const n = nums.length;
  const dp = [...nums];
  const deque = [];
  let result = Number.MIN_SAFE_INTEGER;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (deque.length && index - deque[0] > k) {
      deque.shift();
    }

    if (deque.length) {
      dp[index] = Math.max(dp[index], dp[deque[0]] + num);
    }

    result = Math.max(dp[index], result);

    while (deque.length && dp[deque.at(-1)] < dp[index]) {
      deque.pop();
    }

    deque.push(index);
  }

  return result;
};
