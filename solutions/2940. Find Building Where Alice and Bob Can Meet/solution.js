/**
 * @param {number[]} heights
 * @param {number[][]} queries
 * @return {number[]}
 */
const leftmostBuildingQueries = function (heights, queries) {
  const n = heights.length;
  const indexdQueries = queries.map(([a, b], index) => {
    const min = Math.min(a, b);
    const max = Math.max(a, b);

    return { min, max, queryIndex: index };
  });
  const stack = [];
  const result = [];
  let index = n - 1;

  indexdQueries.sort((a, b) => b.max - a.max);

  const findFirstGreater = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const num = heights[nums[mid]];

      num > target ? (left = mid + 1) : (right = mid - 1);
    }

    return nums[right] ?? -1;
  };

  for (const { min, max, queryIndex } of indexdQueries) {
    if (min === max || heights[min] < heights[max]) {
      result[queryIndex] = max;

      continue;
    }

    while (index > max) {
      while (stack.length && heights[stack.at(-1)] <= heights[index]) {
        stack.pop();
      }

      stack.push(index);
      index -= 1;
    }

    const bestIndex = findFirstGreater(stack, heights[min]);

    result[queryIndex] = bestIndex;
  }

  return result;
};
