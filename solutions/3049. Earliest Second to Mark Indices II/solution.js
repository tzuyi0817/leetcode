/**
 * @param {number[]} nums
 * @param {number[]} changeIndices
 * @return {number}
 */
const earliestSecondToMarkIndices = function (nums, changeIndices) {
  const n = nums.length;
  const m = changeIndices.length;
  const sum = nums.reduce((total, num) => total + num);
  const marked = new Set();
  const secondToIndexMap = new Map();
  let left = 0;
  let right = m;

  for (let second = 0; second < m; second++) {
    const index = changeIndices[second] - 1;
    const num = nums[index];

    if (num && !marked.has(index)) {
      secondToIndexMap.set(second, index);
      marked.add(index);
    }
  }

  const getHeapSum = heap => {
    let heapSum = 0;

    while (heap.size()) {
      heapSum += heap.pop();
    }

    return heapSum;
  };

  const isValidSecond = maxSecond => {
    const minHeap = new MinHeap();
    let marks = 0;

    for (let second = maxSecond - 1; second >= 0; second--) {
      if (secondToIndexMap.has(second)) {
        const index = secondToIndexMap.get(second);
        const num = nums[index];

        minHeap.push(num);

        if (marks) {
          marks -= 1;
        } else {
          minHeap.pop();
          marks += 1;
        }
      } else {
        marks += 1;
      }
    }

    const heapSize = minHeap.size();
    const cost = sum - getHeapSum(minHeap) + heapSize + n;

    return cost <= maxSecond;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    isValidSecond(mid) ? (right = mid - 1) : (left = mid + 1);
  }

  return left <= m ? left : -1;
};
