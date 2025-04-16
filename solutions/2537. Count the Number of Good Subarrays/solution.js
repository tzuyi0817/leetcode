/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const countGood = function (nums, k) {
  const n = nums.length;
  const numMap = new Map();
  let left = 0;
  let pairs = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const count = numMap.get(num) ?? 0;

    pairs += count;
    numMap.set(num, count + 1);

    while (left < index && pairs >= k) {
      const leftNum = nums[left];
      const leftCount = numMap.get(leftNum);

      result += n - index;
      numMap.set(leftNum, leftCount - 1);
      pairs -= leftCount - 1;
      left += 1;
    }
  }

  return result;
};
