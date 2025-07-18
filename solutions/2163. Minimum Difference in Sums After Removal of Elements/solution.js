/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumDifference = function (nums) {
  const n = nums.length / 3;
  const leftHeap = new MaxPriorityQueue();
  const rightHeap = new MinPriorityQueue();
  const minLeftSum = Array.from({ length: n * 3 }, () => null);
  let leftSum = 0;
  let rightSum = 0;
  let result = Number.MAX_SAFE_INTEGER;

  for (let index = 0; index < 2 * n; index++) {
    const num = nums[index];

    leftSum += num;
    leftHeap.enqueue(num);

    if (leftHeap.size() === n + 1) {
      const maxNum = leftHeap.dequeue();

      leftSum -= maxNum;
    }

    if (leftHeap.size() === n) {
      minLeftSum[index] = leftSum;
    }
  }

  for (let index = n * 3 - 1; index >= n; index--) {
    const num = nums[index];

    rightSum += num;
    rightHeap.enqueue(num);

    if (rightHeap.size() === n + 1) {
      const minNum = rightHeap.dequeue();

      rightSum -= minNum;
    }

    if (rightHeap.size() === n) {
      const difference = minLeftSum[index - 1] - rightSum;

      result = Math.min(difference, result);
    }
  }

  return result;
};
