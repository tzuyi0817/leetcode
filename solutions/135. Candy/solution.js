/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy = function (ratings) {
  const n = ratings.length;
  const candies = Array(n).fill(1);

  for (let index = 0; index < n - 1; index++) {
    if (ratings[index + 1] <= ratings[index]) continue;
    candies[index + 1] = candies[index] + 1;
  }
  for (let index = n - 1; index > 0; index--) {
    if (ratings[index - 1] <= ratings[index]) continue;
    if (candies[index - 1] > candies[index]) continue;
    candies[index - 1] = candies[index] + 1;
  }
  return candies.reduce((result, count) => result + count);
};
