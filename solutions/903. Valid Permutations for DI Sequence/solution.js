/**
 * @param {string} s
 * @return {number}
 */
const numPermsDISequence = function (s) {
  const MODULO = 10 ** 9 + 7;
  const n = s.length;
  let dp = new Array(n + 1).fill(1);

  const calculateDecPerms = remain => {
    const nexDp = new Array(n + 1).fill(0);
    let prefixSum = 0;

    for (let index = remain - 1; index >= 0; index--) {
      prefixSum = (prefixSum + dp[index + 1]) % MODULO;
      nexDp[index] = prefixSum;
    }
    return nexDp;
  };

  const calculateIncPerms = remain => {
    const nexDp = new Array(n + 1).fill(0);
    let prefixSum = 0;

    for (let index = 0; index < remain; index++) {
      prefixSum = (prefixSum + dp[index]) % MODULO;
      nexDp[index] = prefixSum;
    }
    return nexDp;
  };

  for (let index = 0; index < n; index++) {
    const isDec = s[index] === 'D';
    const remain = n - index;

    dp = isDec ? calculateDecPerms(remain) : calculateIncPerms(remain);
  }
  return dp[0];
};
