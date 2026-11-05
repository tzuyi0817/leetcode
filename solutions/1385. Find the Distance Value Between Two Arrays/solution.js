/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} d
 * @return {number}
 */
const findTheDistanceValue = function (arr1, arr2, d) {
  const m = arr2.length;
  let result = 0;

  arr2.sort((a, b) => a - b);

  const findFirstGreaterEqual = target => {
    let left = 0;
    let right = m - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      arr2[mid] >= target ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  for (const num of arr1) {
    const index = findFirstGreaterEqual(num);

    if (index < m && arr2[index] - num <= d) continue;

    if (index - 1 >= 0 && index - 1 < m && num - arr2[index - 1] <= d) {
      continue;
    }

    result += 1;
  }

  return result;
};
