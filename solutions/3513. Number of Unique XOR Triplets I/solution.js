/**
 * @param {number[]} nums
 * @return {number}
 */
const uniqueXorTriplets = function (nums) {
  const n = nums.length;

  if (n <= 2) return n;

  const maxK = 32 - Math.clz32(n);

  return 2 ** maxK;
};
