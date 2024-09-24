/**
 * @param {number[]} nums
 * @param {number[]} l
 * @param {number[]} r
 * @return {boolean[]}
 */
const checkArithmeticSubarrays = function (nums, l, r) {
  return l.map((left, index) => {
    const subArray = nums.slice(left, r[index] + 1);

    subArray.sort((a, b) => a - b);
    const diff = subArray[1] - subArray[0];

    for (let j = 2; j < subArray.length; j++) {
      if (subArray[j] - subArray[j - 1] !== diff) return false;
    }
    return true;
  });
};
