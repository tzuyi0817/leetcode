/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const minOperations = function (nums1, nums2) {
  const size1 = nums1.length;
  const size2 = nums2.length;
  if (size1 * 6 < size2 || size1 > size2 * 6) return -1;

  const sum1 = nums1.reduce((sum, num) => sum + num);
  const sum2 = nums2.reduce((sum, num) => sum + num);
  const operations = (a, b) => {
    let left = (result = 0);
    let right = b.nums.length - 1;

    while (a.sum < b.sum) {
      right < 0 || (left < a.nums.length && 6 - a.nums[left] > b.nums[right] - 1)
        ? (a.sum += 6 - a.nums[left++])
        : (b.sum -= b.nums[right--] - 1);

      result += 1;
    }
    return result;
  };

  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);
  return sum1 < sum2
    ? operations({ nums: nums1, sum: sum1 }, { nums: nums2, sum: sum2 })
    : operations({ nums: nums2, sum: sum2 }, { nums: nums1, sum: sum1 });
};
