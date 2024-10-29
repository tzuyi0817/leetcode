/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
const minDifference = function (nums, queries) {
  const MAX_NUM = 100;
  const numIndices = Array.from({ length: MAX_NUM + 1 });
  const isWithinRange = (left, right, target) => {
    const indices = numIndices[target];
    if (!indices) return false;
    let start = 0;
    let end = indices.length - 1;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);

      if (indices[mid] >= left && indices[mid] <= right) return true;
      indices[mid] > right ? (end = mid - 1) : (start = mid + 1);
    }
    return false;
  };

  nums.forEach((num, index) => {
    const indices = numIndices[num] ?? [];

    numIndices[num] = indices;
    indices.push(index);
  });

  return queries.map(([left, right]) => {
    let minimum = MAX_NUM + 1;
    let previous = 0;

    for (let num = 1; num <= MAX_NUM; num++) {
      if (!isWithinRange(left, right, num)) continue;
      if (previous) minimum = Math.min(num - previous, minimum);
      previous = num;
    }
    return minimum > MAX_NUM ? -1 : minimum;
  });
};
