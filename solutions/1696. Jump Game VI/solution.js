/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxResult = function (nums, k) {
  const dp = [...nums];
  const queue = [];
  const size = nums.length;

  for (let index = 1; index < size; index++) {
    const previous = dp[index - 1];

    while (queue.length && queue.at(-1) < previous) queue.pop();
    queue.push(previous);
    if (index - k - 1 >= 0 && queue[0] === dp[index - k - 1]) queue.shift();
    dp[index] += queue[0];
  }
  return dp[size - 1];
};
