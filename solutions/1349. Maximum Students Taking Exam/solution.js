/**
 * @param {character[][]} seats
 * @return {number}
 */
const maxStudents = function (seats) {
  const BROKEN_SEAT = '#';
  const m = seats.length;
  const n = seats[0].length;
  const brokenMask = Array.from({ length: m }, () => 0);

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const seat = seats[row][col];

      if (seat !== BROKEN_SEAT) continue;
      brokenMask[row] |= 1 << col;
    }
  }
  const maxMask = 1 << n;
  const maskCount = Array.from({ length: maxMask }, () => 0);

  for (let mask = 0; mask < maxMask; mask++) {
    maskCount[mask] = maskCount[mask >> 1] + (mask & 1);
  }
  let dp = Array.from({ length: maxMask }, () => 0);

  for (let row = 0; row < m; row++) {
    const nextDp = Array.from({ length: maxMask }, () => 0);

    for (let mask = 0; mask < maxMask; mask++) {
      if (mask & (mask << 1)) continue;
      if (mask & brokenMask[row]) continue;

      for (let prevMask = 0; prevMask < maxMask; prevMask++) {
        const prev = (prevMask << 1) | (prevMask >> 1);

        if (mask & prev) continue;
        nextDp[mask] = Math.max(dp[prevMask] + maskCount[mask], nextDp[mask]);
      }
    }
    dp = nextDp;
  }
  return Math.max(...dp);
};
