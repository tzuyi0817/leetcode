/**
 * @param {number[]} target
 * @param {number[]} arr
 * @return {number}
 */
const minOperations = function (target, arr) {
  const m = target.length;
  const n = arr.length;
  const targetMap = new Map();
  const indices = [];

  for (let index = 0; index < m; index++) {
    const num = target[index];

    targetMap.set(num, index);
  }

  for (let index = 0; index < n; index++) {
    const num = arr[index];

    if (!targetMap.has(num)) continue;

    indices.push(targetMap.get(num));
  }

  const findFirstGreaterEqual = (nums, current) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      nums[mid] >= current ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  const lengthOfLIS = nums => {
    const tails = [];

    for (const num of nums) {
      if (!tails.length || num > tails.at(-1)) {
        tails.push(num);
      } else {
        const index = findFirstGreaterEqual(tails, num);

        tails[index] = num;
      }
    }

    return tails.length;
  };

  return m - lengthOfLIS(indices);
};
