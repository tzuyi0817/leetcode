/**
 * @param {number[][]} properties
 * @return {number}
 */
const numberOfWeakCharacters = function (properties) {
  let maxDefense = 0;
  let result = 0;

  properties.sort((a, b) => b[0] - a[0] || a[1] - b[1]);

  for (const property of properties) {
    const defense = property[1];

    if (defense < maxDefense) result += 1;
    maxDefense = Math.max(defense, maxDefense);
  }
  return result;
};
