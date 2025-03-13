/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
const minZeroArray = function (nums, queries) {
  if (nums.every(num => !num)) return 0;
  const n = nums.length;
  let left = 1;
  let right = queries.length;
  let result = -1;

  const transformToZeroArray = k => {
    const decrements = new Array(n + 1).fill(0);

    for (let index = 0; index < k; index++) {
      const [l, r, val] = queries[index];

      decrements[l] += val;
      decrements[r + 1] -= val;
    }

    for (let index = 1; index <= n; index++) {
      const num = nums[index - 1];

      if (num > decrements[index - 1]) return false;

      decrements[index] += decrements[index - 1];
    }

    return true;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const isZeroArray = transformToZeroArray(mid);

    if (isZeroArray) {
      result = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
};
