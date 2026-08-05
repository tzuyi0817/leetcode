/**
 * @param {number[]} nums
 * @return {number}
 */
const medianOfUniquenessArray = function (nums) {
  const n = nums.length;
  const subarrayCount = (n * (n + 1)) / 2;
  const midianCount = Math.floor((subarrayCount + 1) / 2);

  const getMostKDistinctSubarrayCount = k => {
    const numMap = new Map();
    let distinct = 0;
    let left = 0;
    let result = 0;

    for (let index = 0; index < n; index++) {
      const num = nums[index];
      const count = numMap.get(num) ?? 0;

      if (!count) {
        distinct += 1;
      }

      numMap.set(num, count + 1);

      while (distinct > k) {
        const leftNum = nums[left];
        const leftCount = numMap.get(leftNum);

        if (leftCount === 1) {
          numMap.delete(leftNum);
          distinct -= 1;
        } else {
          numMap.set(leftNum, leftCount - 1);
        }

        left += 1;
      }

      result += index - left + 1;
    }

    return result;
  };

  let left = 1;
  let right = n;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (getMostKDistinctSubarrayCount(mid) >= midianCount) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
};
