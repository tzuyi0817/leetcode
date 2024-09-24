/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
const minSubarray = function (nums, p) {
  const sum = nums.reduce((result, num) => result + num);
  const remainder = sum % p;

  if (remainder === 0) return 0;
  const prefixSumMap = new Map([[0, -1]]);
  const size = nums.length;
  let currentSum = 0;
  let result = size;

  for (let index = 0; index < size; index++) {
    currentSum = (currentSum + nums[index]) % p;
    prefixSumMap.set(currentSum, index);

    const currentRemainder = (currentSum - remainder + p) % p;

    if (!prefixSumMap.has(currentRemainder)) continue;
    result = Math.min(result, index - prefixSumMap.get(currentRemainder));
  }
  return result === size ? -1 : result;
};
