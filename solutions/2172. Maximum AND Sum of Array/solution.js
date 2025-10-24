/**
 * @param {number[]} nums
 * @param {number} numSlots
 * @return {number}
 */
const maximumANDSum = function (nums, numSlots) {
  const n = nums.length;
  const dp = Array.from({ length: 1 << (numSlots * 2) }, () => -1);

  const maxSum = (index, slotMask) => {
    if (index >= n) return 0;
    if (dp[slotMask] !== -1) return dp[slotMask];

    const num = nums[index];
    let result = 0;

    for (let slot = 0; slot < numSlots * 2; slot++) {
      const numSlot = Math.floor(slot / 2) + 1;

      if ((slotMask >> slot) & 1) continue;

      const nextSlotMask = slotMask | (1 << slot);
      const sum = (num & numSlot) + maxSum(index + 1, nextSlotMask);

      result = Math.max(sum, result);
    }

    dp[slotMask] = result;

    return result;
  };

  return maxSum(0, 0);
};
