/**
 * @param {number[]} nums
 * @return {number[]}
 */
const minBitwiseArray = function (nums) {
  return nums.map(num => {
    let leadingOne = 1;
    let result = -1;

    while (num & leadingOne) {
      result = num - leadingOne;
      leadingOne <<= 1;
    }

    return result;
  });
};
