/**
 * @param {number[]} arr
 * @return {number}
 */
const maxChunksToSorted = function (arr) {
  const n = arr.length;
  let maxNum = Number.MIN_SAFE_INTEGER;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = arr[index];

    maxNum = Math.max(num, maxNum);
    if (maxNum === index) result += 1;
  }
  return result;
};
