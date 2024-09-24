/**
 * @param {number[]} nums
 * @return {number}
 */
const subsetXORSum = function (nums) {
  const n = nums.length;
  let result = 0;

  const sumSubset = (start, current) => {
    for (let index = start; index < n; index++) {
      const next = current ^ nums[index];

      result += next;
      sumSubset(index + 1, next);
    }
  };

  sumSubset(0, 0);
  return result;
};
