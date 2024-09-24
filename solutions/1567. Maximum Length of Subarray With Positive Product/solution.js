/**
 * @param {number[]} nums
 * @return {number}
 */
const getMaxLen = function (nums) {
  let result = (positive = negative = 0);

  for (const num of nums) {
    if (num === 0) positive = negative = 0;
    else if (num > 0) {
      positive += 1;
      negative && (negative += 1);
    } else {
      const current = positive;

      positive = negative ? negative + 1 : 0;
      negative = current + 1;
    }
    result = Math.max(result, positive);
  }
  return result;
};
