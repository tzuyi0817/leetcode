/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
const minSumOfLengths = function (arr, target) {
  const n = arr.length;
  const prefix = Array.from({ length: n + 1 }, () => Number.MAX_SAFE_INTEGER);
  let left = 0;
  let sum = 0;
  let result = Number.MAX_SAFE_INTEGER;

  for (let index = 0; index < n; index++) {
    sum += arr[index];

    while (left < index && sum > target) {
      sum -= arr[left];
      left += 1;
    }

    if (sum === target) {
      const len = index - left + 1;
      const total = len + prefix[left];

      result = Math.min(total, result);
      prefix[index + 1] = Math.min(len, prefix[index]);
    } else {
      prefix[index + 1] = prefix[index];
    }
  }

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
