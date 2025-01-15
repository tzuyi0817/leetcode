/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
const minimizeXor = function (num1, num2) {
  const getBits = binary => {
    let result = 0;

    for (const bit of binary) {
      if (bit === '1') result += 1;
    }
    return result;
  };

  const binary2 = num2.toString(2);
  const targetBits = getBits(binary2);
  let binary1 = num1.toString(2);
  let bits = getBits(binary1);

  if (targetBits === bits) return num1;
  const n = Math.max(binary1.length, binary2.length);

  binary1 = binary1.padStart(n, '0').split('');

  for (let index = n - 1; index >= 0; index--) {
    if (bits < targetBits && binary1[index] === '0') {
      binary1[index] = '1';
      bits += 1;
    }
    if (bits > targetBits && binary1[index] === '1') {
      binary1[index] = '0';
      bits -= 1;
    }
    if (bits === targetBits) return Number.parseInt(binary1.join(''), 2);
  }
  return -1;
};
