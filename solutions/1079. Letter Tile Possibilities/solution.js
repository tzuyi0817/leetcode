/**
 * @param {string} tiles
 * @return {number}
 */
const numTilePossibilities = function (tiles) {
  const BASE_CODE = 'A'.charCodeAt(0);
  const n = tiles.length;
  const letters = Array.from({ length: 26 }, () => 0);

  for (const letter of tiles) {
    const code = letter.charCodeAt(0) - BASE_CODE;

    letters[code] += 1;
  }

  const getPossibilities = () => {
    let result = 0;

    for (let code = 0; code < 26; code++) {
      if (!letters[code]) continue;

      letters[code] -= 1;
      result += 1 + getPossibilities();
      letters[code] += 1;
    }

    return result;
  };

  return getPossibilities();
};
