/**
 * @param {number[]} nums
 * @return {number}
 */
const sumOfPower = function (nums) {
  const MODULO = BigInt(10 ** 9 + 7);
  let sum = 0n;
  let result = 0n;

  nums.sort((a, b) => a - b);

  for (const num of nums) {
    const value = BigInt(num);
    const power = value * value;
    const sumPower = ((value + sum) * power) % MODULO;

    result = (result + sumPower) % MODULO;
    sum = (sum * 2n + value) % MODULO;
  }

  return Number(result);
};
