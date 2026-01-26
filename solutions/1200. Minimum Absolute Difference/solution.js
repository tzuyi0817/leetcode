/**
 * @param {number[]} arr
 * @return {number[][]}
 */
const minimumAbsDifference = function (arr) {
  const n = arr.length;
  const result = [];
  let minDiff = Number.MAX_SAFE_INTEGER;

  arr.sort((a, b) => a - b);

  for (let index = 1; index < n; index++) {
    const diff = arr[index] - arr[index - 1];

    minDiff = Math.min(diff, minDiff);
  }

  for (let index = 1; index < n; index++) {
    const a = arr[index - 1];
    const b = arr[index];

    if (b - a === minDiff) {
      result.push([a, b]);
    }
  }

  return result;
};
