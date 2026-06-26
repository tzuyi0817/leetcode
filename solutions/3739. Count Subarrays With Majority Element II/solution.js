/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const countMajoritySubarrays = function (nums, target) {
  const n = nums.length;
  const prefix = Array.from({ length: n * 2 + 1 }, () => 0);
  let balance = n;
  let preSum = 0;
  let result = 0;

  prefix[balance] = 1;

  for (const num of nums) {
    if (num === target) {
      preSum += prefix[balance];
      balance += 1;
    } else {
      preSum -= prefix[balance - 1];
      balance -= 1;
    }

    prefix[balance] += 1;
    result += preSum;
  }

  return result;
};
