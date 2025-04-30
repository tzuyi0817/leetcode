/**
 * @param {number[]} nums
 * @param {number[]} quantity
 * @return {boolean}
 */
const canDistribute = function (nums, quantity) {
  const m = quantity.length;
  const numMap = new Map();
  const memo = new Map();
  const totalMask = (1 << m) - 1;

  for (const num of nums) {
    const count = numMap.get(num) ?? 0;

    numMap.set(num, count + 1);
  }
  const counts = [...numMap.values()];
  const sums = Array.from({ length: 1 << m }, () => 0);

  for (let mask = 1; mask <= totalMask; mask++) {
    for (let index = 0; index < m; index++) {
      if (mask & (1 << index)) {
        sums[mask] += quantity[index];
      }
    }
  }

  const distributeInteger = (index, mask) => {
    if (mask === 0) return true;
    if (index >= counts.length) return false;
    const key = `${index},${mask}`;

    if (memo.has(key)) return memo.get(key);
    if (distributeInteger(index + 1, mask)) {
      memo.set(key, true);

      return true;
    }
    let subMask = mask;

    while (subMask) {
      if (sums[subMask] <= counts[index] && distributeInteger(index + 1, mask ^ subMask)) {
        memo.set(key, true);

        return true;
      }

      subMask = (subMask - 1) & mask;
    }

    memo.set(key, false);

    return false;
  };

  return distributeInteger(0, totalMask);
};
