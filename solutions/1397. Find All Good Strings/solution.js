const findGoodStrings = function (n, s1, s2, evil) {
  const MODULO = 10 ** 9 + 7;
  const BASE_CODE = 'a'.charCodeAt(0);
  const evilLPS = getLPS(evil);
  const nextMatchedCount = Array.from({ length: evil.length }, () => new Array(26).fill(-1));
  const dp = Array.from({ length: n }, () => {
    return Array.from({ length: evil.length }, () => [
      [-1, -1],
      [-1, -1],
    ]);
  });

  const getCode = letter => letter.charCodeAt(0) - BASE_CODE;

  const getNextMatchedEvilCount = (code, matchCount) => {
    if (nextMatchedCount[matchCount][code] !== -1) {
      return nextMatchedCount[matchCount][code];
    }
    const letter = String.fromCharCode(code + BASE_CODE);

    while (matchCount && evil[matchCount] !== letter) {
      matchCount = evilLPS[matchCount - 1];
    }
    nextMatchedCount[matchCount][code] = evil[matchCount] === letter ? matchCount + 1 : matchCount;

    return nextMatchedCount[matchCount][code];
  };

  const findGoodCount = (index, matchedEvilCount, isPrefix1, isPrefix2) => {
    if (matchedEvilCount === evil.length) return 0;
    if (index === n) return 1;
    if (dp[index][matchedEvilCount][+isPrefix1][+isPrefix2] !== -1) {
      return dp[index][matchedEvilCount][+isPrefix1][+isPrefix2];
    }
    const code1 = getCode(s1[index]);
    const code2 = getCode(s2[index]);
    const minCode = isPrefix1 ? code1 : 0;
    const maxCode = isPrefix2 ? code2 : 25;
    let result = 0;

    for (let code = minCode; code <= maxCode; code++) {
      const nextMatchedEvilCount = getNextMatchedEvilCount(code, matchedEvilCount);
      const nextIsPrefix1 = isPrefix1 && code === code1;
      const nextIsPrefix2 = isPrefix2 && code === code2;

      result += findGoodCount(index + 1, nextMatchedEvilCount, nextIsPrefix1, nextIsPrefix2);
      result %= MODULO;
    }
    dp[index][matchedEvilCount][+isPrefix1][+isPrefix2] = result;

    return result;
  };

  return findGoodCount(0, 0, true, true);
};

function getLPS(pattern) {
  const n = pattern.length;
  const lps = Array.from({ length: n }, () => 0);
  let length = 0;

  for (let index = 1; index < n; index++) {
    while (length && pattern[index] !== pattern[length]) {
      length = lps[length - 1];
    }
    if (pattern[index] === pattern[length]) {
      length += 1;
    }
    lps[index] = length;
  }
  return lps;
}
