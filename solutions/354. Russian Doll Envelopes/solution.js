/**
 * @param {number[][]} envelopes
 * @return {number}
 */
const maxEnvelopes = function (envelopes) {
  const dp = [];

  envelopes.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  for (const envelope of envelopes) {
    const height = envelope[1];
    let left = 0;
    let right = dp.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      dp[mid] >= height ? (right = mid) : (left = mid + 1);
    }
    left >= dp.length ? dp.push(height) : (dp[left] = height);
  }
  return dp.length;
};
