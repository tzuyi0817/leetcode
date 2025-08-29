/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
const flowerGame = function (n, m) {
  const countEvenN = Math.floor(n / 2);
  const countOddN = n - countEvenN;
  const countEvenM = Math.floor(m / 2);
  const countOddM = m - countEvenM;

  return countOddN * countEvenM + countEvenN * countOddM;
};
