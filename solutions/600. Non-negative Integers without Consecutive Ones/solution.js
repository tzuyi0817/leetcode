/**
 * @param {number} n
 * @return {number}
 */
const findIntegers = function (n) {
  const bits = n.toString(2);
  const size = bits.length;
  const zeros = new Array(size).fill(0);
  const ones = new Array(size).fill(0);

  zeros[0] = ones[0] = 1;

  for (let index = 1; index < size; index++) {
    zeros[index] = zeros[index - 1] + ones[index - 1];
    ones[index] = zeros[index - 1];
  }
  let result = zeros[size - 1] + ones[size - 1];

  for (let index = 1; index < size; index++) {
    const current = bits[index];
    const previous = bits[index - 1];

    if (current === '1' && previous === '1') return result;
    if (current === '0' && previous === '0') {
      result -= ones[size - index - 1];
    }
  }
  return result;
};
