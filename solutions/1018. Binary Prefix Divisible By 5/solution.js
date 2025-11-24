/**
 * @param {number[]} nums
 * @return {boolean[]}
 */
const prefixesDivBy5 = function (nums) {
  let current = 0;

  return nums.map(num => {
    current = (current * 2 + num) % 5;

    return current === 0;
  });
};
