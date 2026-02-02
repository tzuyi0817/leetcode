/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} dist
 * @return {number}
 */
const minimumCost = function (nums, k, dist) {
  const n = nums.length;
  const usedHeap = new MaxPriorityQueue(({ num }) => num);
  const unusedHeap = new MinPriorityQueue(({ num }) => num);
  const usedSet = new Set();
  let sum = 0;
  let result = Number.MAX_SAFE_INTEGER;

  for (let index = 1; index < n; index++) {
    const num = nums[index];
    const left = index - dist - 1;

    if (left > 0 && usedSet.has(left)) {
      usedSet.delete(left);
      sum -= nums[left];

      while (unusedHeap.size() && unusedHeap.front().index < left) {
        unusedHeap.dequeue();
      }

      if (unusedHeap.size()) {
        const element = unusedHeap.dequeue();

        usedSet.add(element.index);
        usedHeap.enqueue(element);
        sum += element.num;
      }
    }

    if (usedSet.size < k - 1) {
      usedSet.add(index);
      usedHeap.enqueue({ index, num });
      sum += num;
    } else {
      while (usedHeap.size() && !usedSet.has(usedHeap.front().index)) {
        usedHeap.dequeue();
      }

      if (usedHeap.size() && usedHeap.front().num > num) {
        const element = usedHeap.dequeue();

        usedSet.delete(element.index);
        unusedHeap.enqueue(element);
        usedSet.add(index);
        usedHeap.enqueue({ index, num });
        sum += num - element.num;
      } else {
        unusedHeap.enqueue({ index, num });
      }
    }

    if (left >= 0) {
      result = Math.min(sum, result);
    }
  }

  return nums[0] + result;
};
