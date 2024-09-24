/**
 * @param {string} s
 * @param {number} minJump
 * @param {number} maxJump
 * @return {boolean}
 */
const canReach = function (s, minJump, maxJump) {
  const size = s.length;

  if (s[size - 1] !== '0') return false;
  const dp = Array(size).fill(0);
  let count = 0;

  dp[minJump] += 1;
  dp[maxJump + 1] -= 1;

  for (let index = 1; index < size; index++) {
    const value = s[index];

    count += dp[index];
    if (count <= 0 || value === '1') continue;
    if (index + minJump < size) dp[index + minJump] += 1;
    if (index + maxJump + 1 < size) dp[index + maxJump + 1] -= 1;
  }
  return count > 0;
};
