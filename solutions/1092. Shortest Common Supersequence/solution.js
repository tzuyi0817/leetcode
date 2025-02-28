/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
const shortestCommonSupersequence = function (str1, str2) {
  const m = str1.length;
  const n = str2.length;
  let lcs = Array.from({ length: n + 1 }, () => '');

  for (const letter of str1) {
    const nextLcs = new Array(n + 1).fill('');

    for (let index = 1; index <= n; index++) {
      const prevSub = lcs[index];
      const currentSub = nextLcs[index - 1];

      if (letter === str2[index - 1]) {
        nextLcs[index] = lcs[index - 1] + letter;
      } else {
        nextLcs[index] = prevSub.length > currentSub.length ? prevSub : currentSub;
      }
    }

    lcs = nextLcs;
  }

  let a = 0;
  let b = 0;
  let commonSubseq = '';

  for (const letter of lcs[n]) {
    while (a < m && str1[a] !== letter) {
      commonSubseq += str1[a];
      a += 1;
    }

    while (b < n && str2[b] !== letter) {
      commonSubseq += str2[b];
      b += 1;
    }

    commonSubseq += letter;
    a += 1;
    b += 1;
  }

  return `${commonSubseq}${str1.slice(a)}${str2.slice(b)}`;
};
