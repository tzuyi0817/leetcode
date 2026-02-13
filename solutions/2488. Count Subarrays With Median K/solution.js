/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const countSubarrays = function (nums, k) {
  const n = nums.length;
  const balanceMap = new Map();
  const median = nums.indexOf(k);
  let balance = 0;
  let result = 0;

  for (let index = median; index >= 0; index--) {
    const num = nums[index];

    if (num > k) balance += 1;
    if (num < k) balance -= 1;

    const count = balanceMap.get(balance) ?? 0;

    balanceMap.set(balance, count + 1);
  }

  balance = 0;

  for (let index = median; index < n; index++) {
    const num = nums[index];

    if (num > k) balance += 1;
    if (num < k) balance -= 1;

    const count = balanceMap.get(-balance) ?? 0;
    const evenCount = balanceMap.get(1 - balance) ?? 0;

    result += count + evenCount;
  }

  return result;
};
