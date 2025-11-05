/**
 * @param {string} floor
 * @param {number} numCarpets
 * @param {number} carpetLen
 * @return {number}
 */
const minimumWhiteTiles = function (floor, numCarpets, carpetLen) {
  const n = floor.length;
  const dp = Array.from({ length: n }, () => {
    return new Array(numCarpets + 1).fill(-1);
  });

  const getWhiteTiles = (index, carpets) => {
    if (index >= n) return 0;
    if (dp[index][carpets] !== -1) return dp[index][carpets];

    const isWhite = floor[index] === '1';
    let result = (isWhite ? 1 : 0) + getWhiteTiles(index + 1, carpets);

    if (carpets) {
      const coverCarpet = getWhiteTiles(index + carpetLen, carpets - 1);

      result = Math.min(coverCarpet, result);
    }

    dp[index][carpets] = result;

    return result;
  };

  return getWhiteTiles(0, numCarpets);
};
