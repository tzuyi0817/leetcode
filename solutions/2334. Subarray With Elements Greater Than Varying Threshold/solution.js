/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
const validSubarraySize = function (nums, threshold) {
  const n = nums.length;
  const stack = [];
  const prev = Array.from({ length: n }, () => -1);
  const next = Array.from({ length: n }, () => n);

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    while (stack.length && nums[stack.at(-1)] > num) {
      const pos = stack.pop();

      next[pos] = index;
    }

    if (stack.length) {
      prev[index] = stack.at(-1);
    }

    stack.push(index);
  }

  for (let index = 0; index < n; index++) {
    const k = index - prev[index] + (next[index] - index) - 1;

    if (nums[index] > threshold / k) return k;
  }

  return -1;
};
