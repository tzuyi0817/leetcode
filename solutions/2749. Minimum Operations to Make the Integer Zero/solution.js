/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
const makeTheIntegerZero = function (num1, num2) {
  const countBit = num => num.toString(2).replaceAll('0', '').length;

  for (let operations = 0; operations <= 60; operations++) {
    const target = num1 - operations * num2;

    if (operations <= target && countBit(target) <= operations) {
      return operations;
    }
  }

  return -1;
};
