/**
 * @param {number[]} arr
 * @param {number} k
 * @return {boolean}
 */
const canArrange = function (arr, k) {
  const remainderMap = new Map();

  for (const num of arr) {
    const remainder = ((num % k) + k) % k;
    const count = remainderMap.get(remainder) ?? 0;

    remainderMap.set(remainder, count + 1);
  }

  if (remainderMap.get(0) % 2) return false;

  for (let num = 1; num <= k / 2; num++) {
    const count = remainderMap.get(num);
    const pair = k - num;

    if (count !== remainderMap.get(pair)) return false;
  }
  return true;
};
