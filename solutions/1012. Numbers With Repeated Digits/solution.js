/**
 * @param {number} n
 * @return {number}
 */
const numDupDigitsAtMostN = function (n) {
  const nums = `${n + 1}`.split('').map(Number);
  let result = 0;

  const specialCount = (count, digits) => {
    if (digits === 0) return 1;

    return specialCount(count, digits - 1) * (count - digits + 1);
  };

  for (let digits = 1; digits < nums.length; digits++) {
    result += 9 * specialCount(9, digits - 1);
  }

  const seen = new Set();

  for (let index = 0; index < nums.length; index++) {
    for (let num = index > 0 ? 0 : 1; num < nums[index]; num++) {
      if (seen.has(num)) continue;

      result += specialCount(9 - index, nums.length - index - 1);
    }

    if (seen.has(nums[index])) break;
    seen.add(nums[index]);
  }

  return n - result;
};
