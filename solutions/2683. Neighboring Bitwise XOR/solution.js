/**
 * @param {number[]} derived
 * @return {boolean}
 */
const doesValidArrayExist = function (derived) {
  const xor = derived.reduce((result, value) => result ^ value, 0);

  return xor === 0;
};
