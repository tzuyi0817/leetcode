/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
const shortestCommonSupersequence = function (str1, str2) {
  const m = str1.length;
  const n = str2.length;

  const lcs = () => {
    let dp = new Array(n + 1).fill('');

    for (const letter of str1) {
      const nextDp = new Array(n + 1).fill('');

      for (let index = 0; index < n; index++) {
        const previousSub = dp[index + 1];
        const currentSub = nextDp[index];

        nextDp[index + 1] =
          letter === str2[index]
            ? dp[index] + letter
            : previousSub.length > currentSub.length
              ? previousSub
              : currentSub;
      }
      dp = nextDp;
    }
    return dp[n];
  };

  let a = 0;
  let b = 0;
  let result = '';

  for (const letter of lcs()) {
    while (a < m && str1[a] !== letter) {
      result += str1[a];
      a += 1;
    }

    while (b < n && str2[b] !== letter) {
      result += str2[b];
      b += 1;
    }
    a += 1;
    b += 1;
    result += letter;
  }
  return `${result}${str1.slice(a)}${str2.slice(b)}`;
};
