/**
 * @param {number[]} nums
 * @return {number}
 */
const countOperationsToEmptyArray = function (nums) {
  const n = nums.length;
  const numMap = new Map();
  let result = n;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    numMap.set(num, index);
  }

  nums.sort((a, b) => a - b);

  for (let index = 1; index < n; index++) {
    const prev = nums[index - 1];
    const current = nums[index];

    if (numMap.get(current) < numMap.get(prev)) {
      result += n - index;
    }
  }

  return result;
};
