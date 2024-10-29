/**
 * @param {number[][]} books
 * @param {number} shelfWidth
 * @return {number}
 */
const minHeightShelves = function (books, shelfWidth) {
  const n = books.length;
  const dp = new Array(n).fill(Number.MAX_SAFE_INTEGER);

  dp[-1] = 0;

  for (let index = 0; index < n; index++) {
    let currentThickness = (currentHeight = 0);

    for (let book = index; book >= 0; book--) {
      const [thickness, height] = books[book];

      currentThickness += thickness;
      if (currentThickness > shelfWidth) break;
      currentHeight = Math.max(height, currentHeight);
      dp[index] = Math.min(dp[book - 1] + currentHeight, dp[index]);
    }
  }
  return dp[n - 1];
};
