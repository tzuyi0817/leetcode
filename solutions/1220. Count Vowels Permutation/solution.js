/**
 * @param {number} n
 * @return {number}
 */
const countVowelPermutation = function (n) {
  const MODULO = 10 ** 9 + 7;
  const VOWELS_COUNT = 5;
  const vowelsMap = { a: 0, e: 1, i: 2, o: 3, u: 4 };
  const followedMap = {
    [vowelsMap.a]: [vowelsMap.e, vowelsMap.u, vowelsMap.i],
    [vowelsMap.e]: [vowelsMap.a, vowelsMap.i],
    [vowelsMap.i]: [vowelsMap.e, vowelsMap.o],
    [vowelsMap.o]: [vowelsMap.i],
    [vowelsMap.u]: [vowelsMap.o, vowelsMap.i],
  };
  let dp = Array.from({ length: VOWELS_COUNT }, () => 1);

  for (let index = 2; index <= n; index++) {
    const nextDp = Array.from({ length: VOWELS_COUNT }, () => 0);

    for (let vowels = 0; vowels < VOWELS_COUNT; vowels++) {
      for (const followed of followedMap[vowels]) {
        nextDp[vowels] = (nextDp[vowels] + dp[followed]) % MODULO;
      }
    }
    dp = nextDp;
  }
  return dp.reduce((result, count) => (result + count) % MODULO);
};
