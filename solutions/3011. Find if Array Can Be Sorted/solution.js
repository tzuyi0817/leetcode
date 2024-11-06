/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canSortArray = function (nums) {
  const n = nums.length;
  const memo = new Map();
  let currentMin = nums[0];
  let currentMax = nums[0];
  let previousMax = 0;

  const getSetBitsCount = num => {
    if (memo.has(num)) return memo.get(num);
    let count = 0;

    while (num) {
      count += num & 1;
      num >>= 1;
    }
    memo.set(num, count);
    return count;
  };

  for (let index = 1; index < n; index++) {
    const previous = nums[index - 1];
    const current = nums[index];

    if (getSetBitsCount(current) === getSetBitsCount(previous)) {
      currentMax = Math.max(current, currentMax);
      currentMin = Math.min(current, currentMin);
    } else {
      previousMax = currentMax;
      currentMax = current;
      currentMin = current;
    }

    if (previousMax > currentMin) return false;
  }
  return previousMax < currentMin;
};
