/**
 * @param {number[]} nums
 * @param {number} maxOperations
 * @return {number}
 */
const minimumSize = function (nums, maxOperations) {
  let left = 1;
  let right = 10 ** 9;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const operation = nums.reduce((sum, num) => {
      return sum + Math.floor((num - 1) / mid);
    }, 0);

    operation > maxOperations ? (left = mid + 1) : (right = mid);
  }
  return left;
};
