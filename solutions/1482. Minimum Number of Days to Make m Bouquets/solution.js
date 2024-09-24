/**
 * @param {number[]} bloomDay
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
const minDays = function (bloomDay, m, k) {
  const n = bloomDay.length;

  if (m * k > n) return -1;

  const getBouquets = day => {
    let result = (flowers = 0);

    for (const bloom of bloomDay) {
      if (bloom > day) {
        flowers = 0;
        continue;
      }
      flowers += 1;
      if (flowers !== k) continue;
      flowers = 0;
      result += 1;
    }
    return result;
  };

  let left = 1;
  let right = Math.max(...bloomDay);

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    getBouquets(mid) >= m ? (right = mid) : (left = mid + 1);
  }
  return left;
};
