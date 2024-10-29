/**
 * @param {number} n
 * @param {number} goal
 * @param {number} k
 * @return {number}
 */
const numMusicPlaylists = function (n, goal, k) {
  const MODULO = 10 ** 9 + 7;
  let dp = new Array(n + 1).fill(0);

  dp[0] = 1;

  for (let index = 1; index <= goal; index++) {
    const nextDp = new Array(n + 1).fill(0);

    for (let song = 1; song <= n; song++) {
      const newSongs = (dp[song - 1] * (n - (song - 1))) % MODULO;
      const oldSongs = (dp[song] * Math.max(0, song - k)) % MODULO;

      nextDp[song] = (newSongs + oldSongs) % MODULO;
    }
    dp = nextDp;
  }
  return dp[n];
};
