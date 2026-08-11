/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findPermutation = function (nums) {
  const n = nums.length;
  const totalMask = 1 << n;
  const dp = Array.from({ length: n }, () => new Array(totalMask).fill(-1));
  const bestPick = Array.from({ length: n }, () => new Array(totalMask).fill(-1));

  const getScore = (last, mask) => {
    if (popcount(mask) === n) {
      return Math.abs(last - nums[0]);
    }

    if (dp[last][mask] !== -1) {
      return dp[last][mask];
    }

    let result = Number.MAX_SAFE_INTEGER;

    for (let index = 1; index < n; index++) {
      if ((mask >> index) & 1) continue;

      const nextMask = mask | (1 << index);
      const score = Math.abs(last - nums[index]) + getScore(index, nextMask);

      if (score < result) {
        result = score;
        bestPick[last][mask] = index;
      }
    }

    dp[last][mask] = result;

    return result;
  };

  const result = [];
  let last = 0;
  let mask = 1;

  getScore(0, 1);

  for (let index = 0; index < n; index++) {
    result.push(last);
    last = bestPick[last][mask];
    mask |= 1 << last;
  }

  return result;
};

function popcount(mask) {
  let count = 0;

  while (mask) {
    mask &= mask - 1;
    count += 1;
  }

  return count;
}
