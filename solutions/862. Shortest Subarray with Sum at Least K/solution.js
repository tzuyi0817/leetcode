/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const shortestSubarray = function (nums, k) {
  const n = nums.length;
  const prefixSum = new Array(n).fill(0);
  const monotonicQueue = [-1];
  let result = n + 1;

  prefixSum[-1] = 0;

  for (let index = 0; index < n; index++) {
    prefixSum[index] = nums[index] + prefixSum[index - 1];
  }
  for (let index = 0; index < n; index++) {
    const sum = prefixSum[index];

    while (monotonicQueue.length && sum - prefixSum[monotonicQueue[0]] >= k) {
      result = Math.min(index - monotonicQueue[0], result);
      monotonicQueue.shift();
    }
    while (monotonicQueue.length && sum <= prefixSum[monotonicQueue.at(-1)]) {
      monotonicQueue.pop();
    }
    monotonicQueue.push(index);
  }
  return result === n + 1 ? -1 : result;
};
