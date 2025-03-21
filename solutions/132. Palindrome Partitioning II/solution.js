/**
 * @param {string} s
 * @return {number}
 */
const minCut = function (s) {
  const n = s.length;
  const cuts = new Array(n).fill(0);
  const isPalindrome = new Array(n).fill('').map(_ => new Array(n).fill(false));

  for (let a = 0; a < n; a++) {
    cuts[a] = a;

    for (let b = 0; b <= a; b++) {
      if (s[a] !== s[b]) continue;
      if (a - b > 1 && !isPalindrome[a - 1][b + 1]) continue;
      isPalindrome[a][b] = true;
      cuts[a] = b ? Math.min(cuts[a], cuts[b - 1] + 1) : 0;
    }
  }
  return cuts[n - 1];
};
