/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
const successfulPairs = function (spells, potions, success) {
  const m = potions.length;

  potions.sort((a, b) => a - b);

  const findGreaterEqual = spell => {
    let left = 0;
    let right = m - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const product = spell * potions[mid];

      product >= success ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  return spells.map(spell => {
    const index = findGreaterEqual(spell);

    return m - index;
  });
};
