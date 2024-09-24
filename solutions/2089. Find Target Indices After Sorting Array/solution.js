/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const targetIndices = function (nums, target) {
  const result = [];
  let start = (count = 0);

  for (const num of nums) {
    if (num > target) continue;
    num === target ? (count += 1) : (start += 1);
  }
  for (let index = start; index < start + count; index++) {
    result.push(index);
  }
  return result;
};
