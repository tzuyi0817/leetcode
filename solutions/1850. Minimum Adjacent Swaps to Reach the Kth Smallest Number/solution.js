/**
 * @param {string} num
 * @param {number} k
 * @return {number}
 */
const getMinSwaps = function (num, k) {
  const size = num.length;
  const digits = [...num];
  const swapDigit = (a, b) => ([digits[a], digits[b]] = [digits[b], digits[a]]);
  const reverseDigit = (start, end = size - 1) => {
    while (start < end) swapDigit(start++, end--);
  };
  const nextPermutation = () => {
    let start = size - 2;
    let end = size - 1;

    while (digits[start] >= digits[start + 1]) start -= 1;
    while (digits[end] <= digits[start]) end -= 1;
    swapDigit(start, end);
    reverseDigit(start + 1);
  };
  let result = 0;

  for (let index = 1; index <= k; index++) nextPermutation();
  for (let index = 0; index < size; index++) {
    let target = index;

    while (num[index] !== digits[target]) target += 1;
    while (index < target) {
      swapDigit(target, target - 1);
      target -= 1;
      result += 1;
    }
  }
  return result;
};
