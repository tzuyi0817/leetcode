/**
 * @param {number[]} nums
 * @return {number}
 */
const smallestIndex = function (nums) {
  const n = nums.length;

  const isEqualIndex = (num, index) => {
    let sum = 0;

    while (num) {
      sum += num % 10;

      if (sum > index) return false;

      num = Math.floor(num / 10);
    }

    return sum === index;
  };

  for (let index = 0; index < n; index++) {
    if (isEqualIndex(nums[index], index)) {
      return index;
    }
  }

  return -1;
};
