/**
 * @param {string} s
 * @param {number} minJump
 * @param {number} maxJump
 * @return {boolean}
 */
const canReach = function (s, minJump, maxJump) {
  const n = s.length;

  if (s[n - 1] === '1') return false;

  const dp = Array.from({ length: n }, () => 0);
  let validJump = 0;

  dp[minJump] += 1;
  dp[maxJump + 1] -= 1;

  for (let index = 1; index < n; index++) {
    validJump += dp[index];

    if (!validJump || s[index] === '1') continue;

    dp[index + minJump] += 1;
    dp[index + maxJump + 1] -= 1;
  }

  return validJump > 0;
};
