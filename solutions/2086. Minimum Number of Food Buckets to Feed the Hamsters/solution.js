/**
 * @param {string} hamsters
 * @return {number}
 */
const minimumBuckets = function (hamsters) {
  const isCanFeed = value => value === '.' || value === 'F';
  let result = 0;

  hamsters = hamsters.split('');

  for (let index = 0; index < hamsters.length; index++) {
    if (hamsters[index] !== 'H') continue;
    const previous = hamsters[index - 1];
    const next = hamsters[index + 1];

    if (!isCanFeed(previous) && !isCanFeed(next)) return -1;
    if (previous === 'F') continue;
    if (next === '.') hamsters[index + 1] = 'F';
    result += 1;
  }
  return result;
};
