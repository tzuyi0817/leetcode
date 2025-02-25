/**
 * @param {number[]} arr
 * @return {number}
 */
const numOfSubarrays = function (arr) {
  const MODULO = 10 ** 9 + 7;
  let odd = 0;
  let even = 0;
  let currentSum = 0;

  for (const num of arr) {
    currentSum += num;
    currentSum % 2 ? (odd += 1) : (even += 1);
  }

  return (odd * even + odd) % MODULO;
};
