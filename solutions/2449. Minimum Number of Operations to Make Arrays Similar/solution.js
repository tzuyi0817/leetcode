/**
 * @param {number[]} nums
 * @param {number[]} target
 * @return {number}
 */
const makeSimilar = function (nums, target) {
  const odds = [];
  const evens = [];
  let odd = 0;
  let even = 0;
  let result = 0;

  for (const num of nums) {
    num % 2 ? odds.push(num) : evens.push(num);
  }

  odds.sort((a, b) => a - b);
  evens.sort((a, b) => a - b);
  target.sort((a, b) => a - b);

  for (const num of target) {
    if (num % 2) {
      const current = odds[odd];

      result += Math.max((num - current) / 2, 0);
      odd += 1;
    } else {
      const current = evens[even];

      result += Math.max((num - current) / 2, 0);
      even += 1;
    }
  }

  return result;
};
