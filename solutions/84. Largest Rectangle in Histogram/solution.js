/**
 * @param {number[]} heights
 * @return {number}
 */
const largestRectangleArea = function (heights) {
  const stack = [];
  let result = 0;

  for (let index = 0; index <= heights.length; index++) {
    const height = heights[index] ?? 0;

    while (stack.length && heights[stack.at(-1)] >= height) {
      const last = stack.pop();
      const area = heights[last] * (index - (stack.at(-1) ?? -1) - 1);

      result = Math.max(area, result);
    }
    stack.push(index);
  }
  return result;
};
