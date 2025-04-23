/**
 * @param {number} n
 * @return {number}
 */
const countLargestGroup = function (n) {
  const sumMap = new Map();
  let largestSize = 0;
  let result = 0;

  const getDigitsSum = num => {
    let result = 0;

    while (num) {
      result += num % 10;
      num = Math.floor(num / 10);
    }

    return result;
  };

  for (let num = 1; num <= n; num++) {
    const sum = getDigitsSum(num);
    const size = sumMap.get(sum) ?? 0;

    sumMap.set(sum, size + 1);
    largestSize = Math.max(size + 1, largestSize);
  }

  for (const size of sumMap.values()) {
    if (size === largestSize) result += 1;
  }

  return result;
};
