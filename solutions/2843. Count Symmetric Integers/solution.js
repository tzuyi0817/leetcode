/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
const countSymmetricIntegers = function (low, high) {
  let result = 0;

  const isSymmetric = num => {
    if (num < 10) return false;
    if (num < 100) return num % 10 === Math.floor(num / 10);
    if (num < 1000) return false;
    const left = Math.floor(num / 100);
    const right = num % 100;
    const leftSum = (left % 10) + Math.floor(left / 10);
    const rightSum = (right % 10) + Math.floor(right / 10);

    return leftSum === rightSum;
  };

  for (let num = low; num <= high; num++) {
    if (!isSymmetric(num)) continue;

    result += 1;
  }

  return result;
};
