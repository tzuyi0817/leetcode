/**
 * @param {number[]} usageLimits
 * @return {number}
 */
const maxIncreasingGroups = function (usageLimits) {
  let groups = 1;
  let totalLimits = 0;

  usageLimits.sort((a, b) => a - b);

  for (const limit of usageLimits) {
    totalLimits += limit;

    if (totalLimits >= (groups * (groups + 1)) / 2) {
      groups += 1;
    }
  }

  return groups - 1;
};
