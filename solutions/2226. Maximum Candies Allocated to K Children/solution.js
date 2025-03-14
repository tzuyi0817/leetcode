/**
 * @param {number[]} candies
 * @param {number} k
 * @return {number}
 */
const maximumCandies = function (candies, k) {
  let left = 0;
  let right = Math.max(...candies);

  const isAllocated = count => {
    let allocated = 0;

    for (const candy of candies) {
      const child = Math.floor(candy / count);

      allocated += child;

      if (allocated >= k) return true;
    }

    return false;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    isAllocated(mid) ? (left = mid + 1) : (right = mid - 1);
  }

  return right;
};
