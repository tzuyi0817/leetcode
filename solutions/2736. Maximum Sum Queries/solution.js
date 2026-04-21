/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[][]} queries
 * @return {number[]}
 */
const maximumSumQueries = function (nums1, nums2, queries) {
  const n = nums1.length;
  const m = queries.length;
  const pairs = nums1.map((num, index) => ({ x: num, y: nums2[index] }));
  const indexedQueries = queries.map(([x, y], index) => {
    return { index, minX: x, minY: y };
  });

  const stack = [];
  const result = Array.from({ length: m }, () => -1);
  let pairIndex = 0;

  pairs.sort((a, b) => b.x - a.x);
  indexedQueries.sort((a, b) => b.minX - a.minX);

  const findFirstGreaterEqual = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      nums[mid].y >= target ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  for (const { index, minX, minY } of indexedQueries) {
    while (pairIndex < n && pairs[pairIndex].x >= minX) {
      const { x, y } = pairs[pairIndex];
      const sum = x + y;

      while (stack.length && sum >= stack.at(-1).sum) {
        stack.pop();
      }

      if (!stack.length || y > stack.at(-1).y) {
        stack.push({ y, sum });
      }

      pairIndex += 1;
    }

    const pos = findFirstGreaterEqual(stack, minY);

    result[index] = pos === stack.length ? -1 : stack[pos].sum;
  }

  return result;
};
