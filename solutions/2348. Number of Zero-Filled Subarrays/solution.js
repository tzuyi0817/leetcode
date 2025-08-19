/**
 * @param {number[]} nums
 * @return {number}
 */
const zeroFilledSubarray = function (nums) {
  let contiguousZero = 0;
  let result = 0;

  for (const num of nums) {
    contiguousZero = num ? 0 : contiguousZero + 1;
    result += contiguousZero;
  }

  return result;
};
