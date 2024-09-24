/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const findKthNumber = function (m, n, k) {
  let left = 1;
  let right = m * n;

  const getSmallerCount = target => {
    let count = 0;

    for (let row = 1; row <= m; row++) {
      count += target >= row * n ? n : Math.floor(target / row);
    }
    return count;
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const count = getSmallerCount(mid);

    count >= k ? (right = mid) : (left = mid + 1);
  }
  return left;
};
