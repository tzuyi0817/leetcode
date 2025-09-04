/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumDifference = function (nums) {
  const n = nums.length / 2;
  const sum = nums.reduce((result, num) => result + num);
  const goal = sum / 2;
  const leftNums = nums.slice(0, n);
  const rightNums = nums.slice(n);
  const leftSums = Array.from({ length: n + 1 }, () => []);
  const rightSums = Array.from({ length: n + 1 }, () => []);
  let result = Number.MAX_SAFE_INTEGER;

  const dfsSums = (nums, index, count, sum, sums) => {
    if (index >= n) {
      sums[count].push(sum);
      return;
    }

    const num = nums[index];

    dfsSums(nums, index + 1, count, sum, sums);
    dfsSums(nums, index + 1, count + 1, sum + num, sums);
  };

  dfsSums(leftNums, 0, 0, 0, leftSums);
  dfsSums(rightNums, 0, 0, 0, rightSums);

  const findFirstGreaterEqual = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      nums[mid] >= target ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  for (let leftCount = 0; leftCount <= n; leftCount++) {
    const lSums = leftSums[leftCount];
    const rSums = rightSums[n - leftCount];

    rSums.sort((a, b) => a - b);

    for (const leftSum of lSums) {
      const index = findFirstGreaterEqual(rSums, goal - leftSum);

      if (index < rSums.length) {
        const sum1 = leftSum + rSums[index];
        const sum2 = sum - sum1;

        result = Math.min(Math.abs(sum1 - sum2), result);
      }

      if (index > 0) {
        const sum1 = leftSum + rSums[index - 1];
        const sum2 = sum - sum1;

        result = Math.min(Math.abs(sum1 - sum2), result);
      }
    }
  }

  return result;
};
