/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
const closestToTarget = function (arr, target) {
  let prevValueSet = new Set();
  let result = Number.MAX_SAFE_INTEGER;

  for (const num of arr) {
    const valueSet = new Set();

    valueSet.add(num);

    for (const value of prevValueSet) {
      valueSet.add(num & value);
    }

    for (const value of valueSet) {
      const difference = Math.abs(target - value);

      result = Math.min(difference, result);
    }

    prevValueSet = valueSet;
  }

  return result;
};
