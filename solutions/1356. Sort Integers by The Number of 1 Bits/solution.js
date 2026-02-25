/**
 * @param {number[]} arr
 * @return {number[]}
 */
const sortByBits = function (arr) {
  const popcount = x => {
    let count = 0;

    while (x) {
      x &= x - 1;
      count += 1;
    }

    return count;
  };

  return arr.toSorted((a, b) => {
    return popcount(a) - popcount(b) || a - b;
  });
};
