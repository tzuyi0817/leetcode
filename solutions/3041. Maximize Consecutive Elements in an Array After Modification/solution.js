/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSelectedElements = function (nums) {
  const n = nums.length;
  let original = 1;
  let increased = 1;
  let result = 1;

  nums.sort((a, b) => a - b);

  for (let index = 1; index < n; index++) {
    const diff = nums[index] - nums[index - 1];

    if (diff === 0) {
      increased = original + 1;
    } else if (diff === 1) {
      original += 1;
      increased += 1;
    } else if (diff === 2) {
      original = increased + 1;
      increased = 1;
    } else {
      original = 1;
      increased = 1;
    }

    result = Math.max(original, increased, result);
  }

  return result;
};
