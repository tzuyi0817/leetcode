/**
 * @param {number[][]} hats
 * @return {number}
 */
const numberWays = function (hats) {
  const MODULO = 10 ** 9 + 7;
  const HAT_TYPES = 40;
  const n = hats.length;
  const hatsWithWearPersons = Array.from({ length: HAT_TYPES + 1 }, () => []);
  const dp = Array.from({ length: HAT_TYPES + 1 }, () => new Array(1 << n).fill(-1));

  for (let person = 0; person < n; person++) {
    const wearHats = hats[person];

    for (const hat of wearHats) {
      hatsWithWearPersons[hat].push(person);
    }
  }

  const wearHat = (hat, mask) => {
    if (mask === (1 << n) - 1) return 1;
    if (hat > HAT_TYPES) return 0;
    if (dp[hat][mask] !== -1) return dp[hat][mask];
    let result = wearHat(hat + 1, mask);

    for (const person of hatsWithWearPersons[hat]) {
      const personMask = 1 << person;

      if (mask & personMask) continue;

      result = (result + wearHat(hat + 1, mask | personMask)) % MODULO;
    }

    dp[hat][mask] = result;

    return result;
  };

  return wearHat(1, 0);
};
