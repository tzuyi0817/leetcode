/**
 * @param {number[]} arr
 * @return {number}
 */
const maximumElementAfterDecrementingAndRearranging = function (arr) {
  const size = arr.length;

  arr.sort((a, b) => a - b);
  arr[0] = 1;

  for (let index = 1; index < size; index++) {
    if (arr[index] - arr[index - 1] <= 1) continue;
    arr[index] = arr[index - 1] + 1;
  }
  return arr[size - 1];
};
