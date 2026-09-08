/**
 * @param {number[]} rewardValues
 * @return {number}
 */
const maxTotalReward = function (rewardValues) {
  rewardValues.sort((a, b) => a - b);

  const rewardValueSet = new Set(rewardValues);
  let dp = 1n;

  for (const value of rewardValueSet) {
    const offset = BigInt(value);
    const mask = (1n << offset) - 1n;
    const validMask = dp & mask;

    dp |= validMask << offset;
  }

  const bitStr = dp.toString(2);

  return bitStr.length - 1;
};
