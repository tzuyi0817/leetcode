/**
 * @param {number[]} nums
 * @return {number}
 */
const maximumCount = function (nums) {
  const n = nums.length;

  const posCount = () => {
    let left = 0;
    let right = n - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      nums[mid] > 0 ? (right = mid - 1) : (left = mid + 1);
    }

    return n - left;
  };

  const negCount = () => {
    let left = 0;
    let right = n - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      nums[mid] < 0 ? (left = mid + 1) : (right = mid - 1);
    }

    return left;
  };

  return Math.max(posCount(), negCount());
};
