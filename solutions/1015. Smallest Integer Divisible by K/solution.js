/**
 * @param {number} k
 * @return {number}
 */
const smallestRepunitDivByK = function (k) {
  if (k % 2 === 0 || k % 5 === 0) return -1;

  const seenSet = new Set();
  let current = 0;

  for (let length = 1; length <= k; length++) {
    current = (current * 10 + 1) % k;

    if (current === 0) return length;
    if (seenSet.has(current)) return -1;

    seenSet.add(current);
  }

  return -1;
};
