/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
const kIncreasing = function (arr, k) {
  const n = arr.length;
  let result = 0;

  const findFirstGreater = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      nums[mid] > target ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  const getOperationCount = nums => {
    const tails = [];

    for (const num of nums) {
      if (tails.length && tails.at(-1) <= num) {
        tails.push(num);
      } else {
        const index = findFirstGreater(tails, num);

        tails[index] = num;
      }
    }

    return nums.length - tails.length;
  };

  for (let start = 0; start < k; start++) {
    const nums = [];

    for (let index = start; index < n; index += k) {
      nums.push(arr[index]);
    }

    result += getOperationCount(nums);
  }

  return result;
};
