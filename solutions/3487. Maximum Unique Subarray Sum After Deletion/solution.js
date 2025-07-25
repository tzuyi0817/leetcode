/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSum = function (nums) {
  const numSet = new Set();
  let result = 0;

  for (const num of nums) {
    if (num <= 0 || numSet.has(num)) continue;

    result += num;
    numSet.add(num);
  }

  return numSet.size ? result : Math.max(...nums);
};
