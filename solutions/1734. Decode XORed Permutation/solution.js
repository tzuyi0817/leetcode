/**
 * @param {number[]} encoded
 * @return {number[]}
 */
const decode = function (encoded) {
  const size = encoded.length + 1;
  const result = [1];

  for (let n = 2; n <= size; n++) {
    result[0] ^= n;
  }
  for (let index = 1; index < size - 1; index += 2) {
    result[0] ^= encoded[index];
  }
  for (let index = 1; index < size; index++) {
    result[index] = result[index - 1] ^ encoded[index - 1];
  }
  return result;
};
