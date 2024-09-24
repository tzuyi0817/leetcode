/**
 * @param {string[]} nums
 * @return {string}
 */
const findDifferentBinaryString = function (nums) {
  const size = nums[0].length;
  const backtracking = (current = '') => {
    if (current.length === size) {
      if (nums.includes(current)) return '';
      return current;
    }
    const result = backtracking(`${current}0`);

    if (result) return result;
    return backtracking(`${current}1`);
  };

  return backtracking();
};
