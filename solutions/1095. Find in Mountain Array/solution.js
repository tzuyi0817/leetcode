/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * function MountainArray() {
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 *
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {number} target
 * @param {MountainArray} mountainArr
 * @return {number}
 */
const findInMountainArray = function (target, mountainArr) {
  const n = mountainArr.length();
  let left = 0;
  let right = n - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const current = mountainArr.get(mid);
    const next = mountainArr.get(mid + 1);

    current > next ? (right = mid) : (left = mid + 1);
  }
  const peak = left;

  if (mountainArr.get(peak) === target) return peak;

  const findTarget = (left, right, isAsc = true) => {
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      const current = mountainArr.get(mid);

      if (current === target) return mid;
      if (isAsc) {
        current > target ? (right = mid) : (left = mid + 1);
      } else {
        current < target ? (right = mid) : (left = mid + 1);
      }
    }
    return mountainArr.get(left) === target ? left : -1;
  };

  const index = findTarget(0, peak - 1);

  if (index !== -1) return index;

  return findTarget(peak + 1, n - 1, false);
};
