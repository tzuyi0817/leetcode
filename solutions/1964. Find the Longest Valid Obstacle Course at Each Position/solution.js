/**
 * @param {number[]} obstacles
 * @return {number[]}
 */
const longestObstacleCourseAtEachPosition = function (obstacles) {
  const tails = [];
  const result = [];

  const findFirstGreater = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      nums[mid] > target ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  for (const obstacle of obstacles) {
    if (tails.length && obstacle < tails.at(-1)) {
      const index = findFirstGreater(tails, obstacle);

      tails[index] = obstacle;
      result.push(index + 1);
    } else {
      tails.push(obstacle);
      result.push(tails.length);
    }
  }

  return result;
};
