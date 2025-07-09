/**
 * @param {number[]} nums
 * @return {number}
 */
const sumOfFlooredPairs = function (nums) {
  const MODULO = 10 ** 9 + 7;
  const maxNum = Math.max(...nums);
  const prefixCounts = Array.from({ length: maxNum + 1 }, () => 0);
  let result = 0;

  for (const num of nums) {
    prefixCounts[num] += 1;
  }

  for (let num = 1; num <= maxNum; num++) {
    prefixCounts[num] += prefixCounts[num - 1];
  }

  for (let denominator = 1; denominator <= maxNum; denominator++) {
    const count = prefixCounts[denominator] - prefixCounts[denominator - 1];

    if (!count) continue;

    let sum = 0;

    for (let floored = 1; floored * denominator <= maxNum; floored++) {
      const low = floored * denominator;
      const high = Math.min(maxNum, (floored + 1) * denominator - 1);
      const totalCount = prefixCounts[high] - prefixCounts[low - 1];

      sum = (sum + totalCount * floored) % MODULO;
    }

    result = (result + sum * count) % MODULO;
  }

  return result;
};
