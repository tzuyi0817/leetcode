/**
 * @param {number[][]} groups
 * @param {number[]} nums
 * @return {boolean}
 */
const canChoose = function (groups, nums) {
  let current = 0;

  for (let index = 0; index < nums.length; index++) {
    const group = groups[current];
    const size = group.length;
    const isMatch = group.every((num, position) => {
      return num === nums[index + position];
    });

    if (!isMatch) continue;
    current += 1;
    index += size - 1;
    if (current >= groups.length) return true;
  }
  return false;
};
