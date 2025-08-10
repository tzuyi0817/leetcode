/**
 * @param {number} n
 * @return {boolean}
 */
const reorderedPowerOf2 = function (n) {
  const counter = num => {
    let result = 0;

    while (num) {
      result += Math.pow(10, num % 10);
      num = Math.floor(num / 10);
    }

    return result;
  };

  const count = counter(n);

  for (let index = 0; index < 30; index++) {
    const num = 1 << index;

    if (counter(num) === count) return true;
  }

  return false;
};
