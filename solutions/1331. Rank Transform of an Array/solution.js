/**
 * @param {number[]} arr
 * @return {number[]}
 */
const arrayRankTransform = function (arr) {
  const n = arr.length;
  const sortedArr = arr.map((num, index) => ({ num, index })).toSorted((a, b) => a.num - b.num);
  const result = new Array(n);
  let rank = 0;
  let previous = Number.MIN_SAFE_INTEGER;

  for (const { num, index } of sortedArr) {
    if (previous !== num) rank += 1;

    result[index] = rank;
    previous = num;
  }
  return result;
};
