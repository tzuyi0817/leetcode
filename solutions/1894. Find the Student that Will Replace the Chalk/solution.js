/**
 * @param {number[]} chalk
 * @param {number} k
 * @return {number}
 */
const chalkReplacer = function (chalk, k) {
  const roundOfChalk = chalk.reduce((total, count) => total + count);
  let remainChalk = k % roundOfChalk;

  if (remainChalk === 0) return 0;

  for (const [index, element] of chalk.entries()) {
    remainChalk -= element;

    if (remainChalk >= 0) continue;
    return index;
  }
  return 0;
};
