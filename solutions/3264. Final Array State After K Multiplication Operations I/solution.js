/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} multiplier
 * @return {number[]}
 */
const getFinalState = function (nums, k, multiplier) {
  const n = nums.length;
  const queue = new MinPriorityQueue({ compare: (a, b) => a.num - b.num || a.index - b.index });
  const result = Array.from({ length: n });

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    queue.enqueue({ num, index });
  }

  for (let operation = 1; operation <= k; operation++) {
    const item = queue.dequeue();

    item.num *= multiplier;
    queue.enqueue(item);
  }

  while (queue.size()) {
    const { index, num } = queue.dequeue();

    result[index] = num;
  }
  return result;
};
