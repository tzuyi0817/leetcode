/**
 * @param {string} binary
 * @return {string}
 */
const maximumBinaryString = function (binary) {
  const splitBinary = binary.split('');
  let zero = 0;
  let start = 0;

  for (const [index, str] of binary.entries()) {
    if (str === '0') zero += 1;
    if (!zero && str === '1') start += 1;
    splitBinary[index] = '1';
  }
  if (zero) splitBinary[start + zero - 1] = '0';

  return splitBinary.join('');
};
