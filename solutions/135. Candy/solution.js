/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy = function (ratings) {
  const n = ratings.length;
  const allocates = Array.from({ length: n }, () => 1);

  for (let index = 1; index < n; index++) {
    if (ratings[index] > ratings[index - 1]) {
      allocates[index] = allocates[index - 1] + 1;
    }
  }

  for (let index = n - 2; index >= 0; index--) {
    if (ratings[index] <= ratings[index + 1]) continue;
    if (allocates[index] > allocates[index + 1]) continue;

    allocates[index] = allocates[index + 1] + 1;
  }

  return allocates.reduce((result, allocate) => result + allocate);
};
