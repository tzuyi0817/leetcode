/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const findKthNumber = function (n, k) {
  let current = 1;

  const getGap = num => {
    let start = num;
    let end = num + 1;
    let gap = 0;

    while (start <= n) {
      gap += Math.min(n + 1, end) - start;
      start *= 10;
      end *= 10;
    }

    return gap;
  };

  k -= 1;

  while (k) {
    const gap = getGap(current);

    if (gap <= k) {
      current += 1;
      k -= gap;
    } else {
      current *= 10;
      k -= 1;
    }
  }

  return current;
};
