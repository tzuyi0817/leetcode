/**
 * @param {number[]} nums
 * @return {number[]}
 */
const countSmaller = function (nums) {
  const n = nums.length;
  const max = Math.max(...nums);
  const min = Math.min(...nums);
  const BIT = Array(max - min + 2).fill(0);
  const result = Array(n);
  const updateBIT = num => {
    while (num < BIT.length) {
      BIT[num] += 1;
      num += num & -num;
    }
  };
  const searchBIT = num => {
    let count = 0;

    while (num > 0) {
      count += BIT[num];
      num -= num & -num;
    }
    return count;
  };

  for (let index = n - 1; index >= 0; index--) {
    const num = nums[index] - min + 1;

    result[index] = searchBIT(num);
    updateBIT(num + 1);
  }
  return result;
};
