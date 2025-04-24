/**
 * @param {number[]} height
 * @return {number}
 */
const trap = function (height) {
  let left = 0;
  let result = 0;
  let maxHeight = 0;
  let right = height.length - 1;

  while (left < right) {
    const minHeight = Math.min(height[left], height[right]);

    maxHeight = Math.max(minHeight, maxHeight);
    result += maxHeight - minHeight;
    minHeight === height[left] ? (left += 1) : (right -= 1);
  }
  return result;
};
