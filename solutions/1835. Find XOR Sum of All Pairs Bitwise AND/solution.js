/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
const getXORSum = function (arr1, arr2) {
  const xor1 = arr1.reduce((xor, num) => xor ^ num);
  const xor2 = arr2.reduce((xor, num) => xor ^ num);

  return xor1 & xor2;
};
