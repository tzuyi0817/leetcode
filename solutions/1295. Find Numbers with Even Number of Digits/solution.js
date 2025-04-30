/**
 * @param {number[]} nums
 * @return {number}
 */
const findNumbers = function (nums) {
  const isEvenDigitsNumber = num => {
    let digitsNumber = 0;

    while (num) {
      num = Math.floor(num / 10);
      digitsNumber += 1;
    }

    return digitsNumber % 2 === 0;
  };

  return nums.reduce((result, num) => {
    return result + (isEvenDigitsNumber(num) ? 1 : 0);
  }, 0);
};
