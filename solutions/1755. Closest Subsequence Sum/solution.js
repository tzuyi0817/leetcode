/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
const minAbsDifference = function (nums, goal) {
  const n = nums.length;
  const half = Math.floor(n / 2);
  const lNums = nums.slice(0, half);
  const rNums = nums.slice(half, n);
  let lSums = new Set();
  let rSums = new Set();
  let result = Number.MAX_SAFE_INTEGER;

  const getSums = (values, index, sum, sums) => {
    if (index >= values.length) {
      sums.add(sum);
      return;
    }
    const value = values[index];

    getSums(values, index + 1, sum, sums);
    getSums(values, index + 1, sum + value, sums);
  };

  getSums(lNums, 0, 0, lSums);
  getSums(rNums, 0, 0, rSums);
  lSums = [...lSums];
  rSums = [...rSums].toSorted((a, b) => a - b);

  const findFirstGreaterEqual = (sums, target) => {
    let left = 0;
    let right = sums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      sums[mid] >= target ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  for (const sum of lSums) {
    const index = findFirstGreaterEqual(rSums, goal - sum);

    if (index < rSums.length) {
      result = Math.min(Math.abs(goal - sum - rSums[index]), result);
    }

    if (index > 0) {
      result = Math.min(Math.abs(goal - sum - rSums[index - 1]), result);
    }
  }

  return result;
};
