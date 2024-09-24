/**
 * @param {number} buckets
 * @param {number} minutesToDie
 * @param {number} minutesToTest
 * @return {number}
 */
const poorPigs = function (buckets, minutesToDie, minutesToTest) {
  const times = Math.floor(minutesToTest / minutesToDie);
  let pigs = 0;
  let total = 1;

  while (total < buckets) {
    total *= times + 1;
    pigs += 1;
  }
  return pigs;
};
