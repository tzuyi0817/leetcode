/**
 * @param {string} colors
 * @return {boolean}
 */
const winnerOfGame = function (colors) {
  if (colors.length < 3) return false;
  let alice = (bob = 0);

  for (let index = 1; index < colors.length - 1; index++) {
    const piece = colors[index];
    const previous = colors[index - 1];
    const next = colors[index + 1];

    if (previous !== piece || next !== piece) continue;
    piece === 'A' ? (alice += 1) : (bob += 1);
  }
  return alice > bob;
};
