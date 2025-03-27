/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumIndex = function (nums) {
  const n = nums.length;
  const countMap = new Map();
  let dominant = -1;
  let maxCount = 0;

  for (const num of nums) {
    const count = countMap.get(num) ?? 0;

    countMap.set(num, count + 1);
  }

  for (const [num, count] of countMap) {
    if (count <= maxCount) continue;

    dominant = num;
    maxCount = count;
  }
  let count = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (num === dominant) count += 1;
    if (count * 2 > index + 1 && (maxCount - count) * 2 > n - index - 1) {
      return index;
    }
  }

  return -1;
};
