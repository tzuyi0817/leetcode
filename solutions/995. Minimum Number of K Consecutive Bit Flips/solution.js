/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minKBitFlips = function (nums, k) {
  const n = nums.length;
  let result = (currentFlips = 0);

  for (let index = 0; index < n; index++) {
    const value = nums[index];

    if (index >= k && nums[index - k] === 'flip') {
      currentFlips -= 1;
    }
    if (currentFlips % 2 !== value) continue;
    if (index + k > n) return -1;
    nums[index] = 'flip';
    result += 1;
    currentFlips += 1;
  }
  return result;
};
