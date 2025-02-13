/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minOperations = function (nums, k) {
  const stack = [];
  let a = 0;
  let b = 0;
  let result = 0;

  nums.sort((a, b) => a - b);

  const getValue = (values, index) => values[index] ?? Number.MAX_SAFE_INTEGER;

  while (getValue(nums, a) < k || getValue(stack, b) < k) {
    const x = Math.min(getValue(nums, a), getValue(stack, b));

    x === getValue(nums, a) ? (a += 1) : (b += 1);
    const y = Math.min(getValue(nums, a), getValue(stack, b));

    y === getValue(nums, a) ? (a += 1) : (b += 1);
    stack.push(x * 2 + y);
    result += 1;
  }

  return result;
};
