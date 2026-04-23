/**
 * @param {number[]} nums
 * @return {number}
 */
const sumImbalanceNumbers = function (nums) {
  const n = nums.length;
  const left = Array.from({ length: n }, () => -1);
  const right = Array.from({ length: n }, () => n);
  const numToIndex = Array.from({ length: n + 2 }, () => -1);
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    left[index] = Math.max(numToIndex[num], numToIndex[num + 1]);
    numToIndex[num] = index;
  }

  numToIndex.fill(n);

  for (let index = n - 1; index >= 0; index--) {
    const num = nums[index];

    right[index] = numToIndex[num + 1];
    numToIndex[num] = index;
  }

  for (let index = 0; index < n; index++) {
    const count = (index - left[index]) * (right[index] - index);

    result += count;
  }

  return result - (n * (n + 1)) / 2;
};
