/**
 * @param {number[][]} groups
 * @param {number[]} nums
 * @return {boolean}
 */
const canChoose = function (groups, nums) {
  let current = 0;
  let index = 0;

  while (index < nums.length) {
    const group = groups[current];
    const size = group.length;
    const start = index;
    const isMatch = group.every((num, position) => {
      return num === nums[start + position];
    });

    if (isMatch) {
      current += 1;
      index += size;
    } else {
      index += 1;
    }

    if (current >= groups.length) return true;
  }

  return false;
};
