/**
 * @param {number[][]} properties
 * @return {number}
 */
const numberOfWeakCharacters = function (properties) {
  let maxDefense = (result = 0);

  properties.sort((a, b) => b[0] - a[0] || a[1] - b[1]);

  for (let index = 0; index < properties.length; index++) {
    const defense = properties[index][1];

    if (defense < maxDefense) result += 1;
    maxDefense = Math.max(defense, maxDefense);
  }
  return result;
};
