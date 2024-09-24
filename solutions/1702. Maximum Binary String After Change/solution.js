/**
 * @param {string} binary
 * @return {string}
 */
const maximumBinaryString = function (binary) {
  const splitBinary = binary.split('');
  let zero = (start = 0);

  for (let index = 0; index < binary.length; index++) {
    const str = binary[index];

    if (str === '0') zero += 1;
    if (!zero && str === '1') start += 1;
    splitBinary[index] = '1';
  }
  if (zero) splitBinary[start + zero - 1] = '0';

  return splitBinary.join('');
};
