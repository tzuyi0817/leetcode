/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let left = result = maxHeight = 0;
    let right = height.length - 1;

    while (left < right) {
        const minHeight = Math.min(height[left], height[right]);

        maxHeight = Math.max(minHeight, maxHeight);
        result += maxHeight - minHeight;
        minHeight === height[left] ? left += 1 : right -= 1;
    }
    return result;
};
