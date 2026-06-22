/**
 * @param {string} text
 * @return {number}
 */
const maxNumberOfBalloons = function (text) {
  const balloonSet = new Set('balloon');
  const balloonMap = new Map();
  let result = text.length;

  for (const char of text) {
    if (!balloonSet.has(char)) continue;

    const count = balloonMap.get(char) ?? 0;

    balloonMap.set(char, count + 1);
  }

  for (const char of balloonSet) {
    const count = balloonMap.get(char);

    if (!count) return 0;

    const freq = char === 'l' || char === 'o' ? Math.floor(count / 2) : count;

    result = Math.min(freq, result);
  }

  return result;
};
