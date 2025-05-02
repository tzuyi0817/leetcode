/**
 * @param {string} dominoes
 * @return {string}
 */
const pushDominoes = function (dominoes) {
  const n = dominoes.length;
  const forcesR = Array.from({ length: n }, () => n);
  const forcesL = Array.from({ length: n }, () => n);
  const result = dominoes.split('');

  for (let index = 1; index < n; index++) {
    const value = dominoes[index];

    if (value === 'L') continue;
    if (dominoes[index - 1] === 'R' && value === '.') {
      forcesR[index] = 1;
      continue;
    }
    if (forcesR[index - 1] === n) continue;

    forcesR[index] = forcesR[index - 1] + 1;
  }

  for (let index = n - 2; index >= 0; index--) {
    const value = dominoes[index];

    if (value === 'R') continue;
    if (dominoes[index + 1] === 'L' && value === '.') {
      forcesL[index] = 1;
      continue;
    }
    if (forcesL[index + 1] === n) continue;

    forcesL[index] = forcesL[index + 1] + 1;
  }

  for (let index = 0; index < n; index++) {
    if (forcesR[index] === forcesL[index]) continue;

    result[index] = forcesR[index] > forcesL[index] ? 'L' : 'R';
  }

  return result.join('');
};
