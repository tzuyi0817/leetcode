/**
 * @param {number[]} nums
 * @return {number}
 */
const minElement = function (nums) {
  let result = Number.MAX_SAFE_INTEGER;

  const getSumDigits = num => {
    let sum = 0;

    while (num) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }

    return sum;
  };

  for (const num of nums) {
    const sum = getSumDigits(num);

    result = Math.min(sum, result);
  }

  return result;
};
