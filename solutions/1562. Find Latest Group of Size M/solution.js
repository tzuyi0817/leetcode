/**
 * @param {number[]} arr
 * @param {number} m
 * @return {number}
 */
const findLatestStep = function (arr, m) {
  const size = arr.length;
  const sizes = Array(size + 2).fill(0);
  const counts = Array(size + 2).fill(0);

  return arr.reduce((result, position, index) => {
    const left = sizes[position - 1];
    const right = sizes[position + 1];
    const length = right + left + 1;

    sizes[position] = sizes[position - left] = sizes[position + right] = length;
    counts[left] -= 1;
    counts[right] -= 1;
    counts[length] += 1;
    return counts[m] ? index + 1 : result;
  }, -1);
};
