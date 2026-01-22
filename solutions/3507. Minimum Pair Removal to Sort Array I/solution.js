/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumPairRemoval = function (nums) {
  const current = [...nums];
  let result = 0;

  const isNonDecreasing = arr => {
    const n = arr.length;

    for (let index = 1; index < n; index++) {
      if (arr[index] < arr[index - 1]) return false;
    }

    return true;
  };

  while (!isNonDecreasing(current)) {
    const n = current.length;
    let minSum = Number.MAX_SAFE_INTEGER;
    let pair = -1;

    for (let index = 1; index < n; index++) {
      const sum = current[index] + current[index - 1];

      if (sum < minSum) {
        minSum = sum;
        pair = index - 1;
      }
    }

    current.splice(pair, 2, minSum);
    result += 1;
  }

  return result;
};
