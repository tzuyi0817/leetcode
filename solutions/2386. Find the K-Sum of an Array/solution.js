/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const kSum = function (nums, k) {
  const n = nums.length;
  const absNums = nums.map(Math.abs);
  const maxHeap = new MaxPriorityQueue(({ sum }) => sum);
  let maxSum = 0;

  for (const num of nums) {
    if (num > 0) {
      maxSum += num;
    }
  }

  let result = maxSum;

  absNums.sort((a, b) => a - b);
  maxHeap.enqueue({ sum: maxSum - absNums[0], index: 0 });

  while (k > 1) {
    const { sum, index } = maxHeap.dequeue();

    result = sum;

    if (index + 1 < n) {
      const nextIndex = index + 1;
      const nextSum = sum - absNums[nextIndex];

      maxHeap.enqueue({ sum: nextSum, index: nextIndex });
      maxHeap.enqueue({ sum: nextSum + absNums[index], index: nextIndex });
    }

    k -= 1;
  }

  return result;
};
