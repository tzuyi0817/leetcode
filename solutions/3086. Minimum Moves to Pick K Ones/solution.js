/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} maxChanges
 * @return {number}
 */
const minimumMoves = function (nums, k, maxChanges) {
  const n = nums.length;
  const oneIndices = [];
  const prefixOneDis = [0];

  for (let index = 0; index < n; index++) {
    if (nums[index]) {
      oneIndices.push(index);
    }
  }

  for (const index of oneIndices) {
    const dis = prefixOneDis.at(-1) + index;

    prefixOneDis.push(dis);
  }

  const minOnesBySwap = Math.max(0, k - maxChanges);
  const maxOnesBySwap = Math.min(minOnesBySwap + 3, oneIndices.length, k);
  let result = Number.MAX_SAFE_INTEGER;

  for (let swap = minOnesBySwap; swap <= maxOnesBySwap; swap++) {
    for (let l = 0; l + swap < prefixOneDis.length; l++) {
      const r = l + swap;
      const changeCost = 2 * (k - swap);
      const rSum = prefixOneDis[r] - prefixOneDis[Math.floor((l + r) / 2)];
      const lSum = prefixOneDis[Math.floor((l + r + 1) / 2)] - prefixOneDis[l];
      const swapCost = rSum - lSum;

      result = Math.min(changeCost + swapCost, result);
    }
  }

  return result;
};
