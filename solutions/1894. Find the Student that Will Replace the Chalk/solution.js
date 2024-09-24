/**
 * @param {number[]} chalk
 * @param {number} k
 * @return {number}
 */
const chalkReplacer = function (chalk, k) {
  const roundOfChalk = chalk.reduce((total, count) => total + count);
  let remainChalk = k % roundOfChalk;

  if (remainChalk === 0) return 0;

  for (let index = 0; index < chalk.length; index++) {
    remainChalk -= chalk[index];

    if (remainChalk >= 0) continue;
    return index;
  }
  return 0;
};
