/**
 * @param {number} n
 * @param {number} firstPlayer
 * @param {number} secondPlayer
 * @return {number[]}
 */
const earliestAndLatest = function (n, firstPlayer, secondPlayer) {
  const dp = Array.from({ length: n + 1 }, () => {
    return new Array(n + 1).fill('').map(_ => new Array(n + 1).fill(null));
  });

  const getRounds = (left, right, players) => {
    if (left === right) return [1, 1];
    if (left > right) return getRounds(right, left, players);
    if (dp[left][right][players]) return dp[left][right][players];
    const nextRoundPlayers = Math.ceil(players / 2);
    const loserPlayers = players - nextRoundPlayers;
    const minRequiredWinners = left + right - loserPlayers;
    let minRound = Number.MAX_SAFE_INTEGER;
    let maxRound = Number.MIN_SAFE_INTEGER;

    for (let leftWin = 1; leftWin <= left; leftWin++) {
      for (let rightWin = left - leftWin + 1; rightWin <= right - leftWin; rightWin++) {
        const totalWinners = leftWin + rightWin;

        if (totalWinners > nextRoundPlayers || totalWinners < minRequiredWinners) continue;
        const [earliest, latest] = getRounds(leftWin, rightWin, nextRoundPlayers);

        minRound = Math.min(minRound, earliest + 1);
        maxRound = Math.max(maxRound, latest + 1);
      }
    }

    const result = [minRound, maxRound];

    dp[left][right][players] = result;

    return result;
  };

  return getRounds(firstPlayer, n - secondPlayer + 1, n);
};
