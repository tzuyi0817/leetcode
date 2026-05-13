/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
const minMoves = function (nums, limit) {
  const n = nums.length;
  const difference = Array.from({ length: limit * 2 + 2 }, () => 0);
  let currentMoves = 0;
  let result = n;

  for (let index = 0; index < n / 2; index++) {
    const a = nums[index];
    const b = nums[n - index - 1];
    const minNum = Math.min(a, b);
    const maxNum = Math.max(a, b);
    const sum = a + b;

    difference[2] += 2;
    difference[minNum + 1] -= 1;
    difference[sum] -= 1;
    difference[sum + 1] += 1;
    difference[maxNum + limit + 1] += 1;
  }

  for (let num = 2; num < limit * 2 + 2; num++) {
    currentMoves += difference[num];
    result = Math.min(currentMoves, result);
  }

  return result;
};
