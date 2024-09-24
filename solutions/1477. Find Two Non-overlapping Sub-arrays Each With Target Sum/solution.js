/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
const minSumOfLengths = function (arr, target) {
  const minSumLength = [];
  let left = (currentSum = 0);
  let result = (minSize = Number.MAX_SAFE_INTEGER);

  for (let index = 0; index < arr.length; index++) {
    currentSum += arr[index];

    while (currentSum > target) {
      currentSum -= arr[left];
      left += 1;
    }
    if (currentSum === target) {
      const size = index - left + 1;

      if (minSumLength[left - 1]) {
        result = Math.min(result, size + minSumLength[left - 1]);
      }
      minSize = Math.min(size, minSize);
    }
    minSumLength[index] = minSize;
  }
  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
