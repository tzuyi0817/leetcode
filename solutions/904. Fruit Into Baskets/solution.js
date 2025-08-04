/**
 * @param {number[]} fruits
 * @return {number}
 */
const totalFruit = function (fruits) {
  const n = fruits.length;
  const basketMap = new Map();
  let left = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const fruit = fruits[index];
    const count = basketMap.get(fruit) ?? 0;

    basketMap.set(fruit, count + 1);

    while (basketMap.size > 2) {
      const leftFruit = fruits[left];
      const leftCount = basketMap.get(leftFruit);

      if (leftCount > 1) {
        basketMap.set(leftFruit, leftCount - 1);
      } else {
        basketMap.delete(leftFruit);
      }

      left += 1;
    }

    result = Math.max(index - left + 1, result);
  }

  return result;
};
