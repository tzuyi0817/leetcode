/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
const findLeastNumOfUniqueInts = function (arr, k) {
  const countMap = arr.reduce((map, num) => {
    const count = map.get(num) ?? 0;

    return map.set(num, count + 1);
  }, new Map());
  const counts = [...countMap.values()];
  const size = counts.length;

  counts.sort((a, b) => a - b);

  for (let index = 0; index < size; index++) {
    k -= counts[index];
    if (k === 0) return size - index - 1;
    if (k < 0) return size - index;
  }
};
