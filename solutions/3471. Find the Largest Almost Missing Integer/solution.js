/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const largestInteger = function (nums, k) {
  const n = nums.length;

  if (k === n) return Math.max(...nums);

  const countMap = new Map();

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const count = countMap.get(num) ?? 0;

    countMap.set(num, count + 1);
  }

  if (k === 1) {
    let result = -1;

    for (const [num, count] of countMap) {
      if (count > 1) continue;

      result = Math.max(num, result);
    }

    return result;
  }

  const firstNum = nums[0];
  const lastNum = nums[n - 1];
  const firstCount = countMap.get(firstNum);
  const lastCount = countMap.get(lastNum);

  if (firstCount > 1 && lastCount > 1) return -1;

  if (firstCount > 1) return lastNum;

  if (lastCount > 1) return firstNum;

  return Math.max(firstNum, lastNum);
};
