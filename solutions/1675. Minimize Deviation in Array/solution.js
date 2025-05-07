/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumDeviation = function (nums) {
  const maxHeap = new MaxPriorityQueue();
  let result = Number.MAX_SAFE_INTEGER;

  for (const num of nums) {
    if (num % 2 === 0) {
      maxHeap.enqueue(num);
    } else {
      maxHeap.enqueue(num * 2);
    }
  }

  while (maxHeap.front() % 2 === 0) {
    const num = maxHeap.dequeue();

    maxHeap.enqueue(num / 2);
    const deviation = maxHeap.front() - maxHeap.back();

    result = Math.min(deviation, result);
  }

  return result;
};
