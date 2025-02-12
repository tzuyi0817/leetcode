/**
 * @param {number[]} nums
 * @return {number}
 */
const maximumSum = function (nums) {
  const n = nums.length;
  const sumDigitsMap = new Map();
  let result = -1;

  const sumDigits = num => {
    let result = 0;

    while (num) {
      result += num % 10;
      num = Math.floor(num / 10);
    }
    return result;
  };

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const sum = sumDigits(num);

    if (sumDigitsMap.has(sum)) {
      const prevNum = nums[sumDigitsMap.get(sum)];

      if (num > prevNum) {
        sumDigitsMap.set(sum, index);
      }

      result = Math.max(num + prevNum, result);
    } else {
      sumDigitsMap.set(sum, index);
    }
  }

  return result;
};
