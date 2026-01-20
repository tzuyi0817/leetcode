/**
 * @param {number[]} nums
 * @return {number[]}
 */
const minBitwiseArray = function (nums) {
  return nums.map(num => {
    let leadingOne = 1;

    while (num & leadingOne) {
      leadingOne <<= 1;
    }

    leadingOne >>= 1;

    if (!leadingOne) return -1;

    return num - leadingOne;
  });
};
