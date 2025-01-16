/**
 * @param {number[]} digits
 * @return {string}
 */
const largestMultipleOfThree = function (digits) {
  const mod1 = [1, 4, 7, 2, 5, 8];
  const mod2 = [2, 5, 8, 1, 4, 7];
  const counts = Array.from({ length: 10 }, () => 0);
  let sum = digits.reduce((result, digit) => result + digit);

  for (const digit of digits) {
    counts[digit] += 1;
  }

  while (sum % 3) {
    const mod = sum % 3 === 1 ? mod1 : mod2;
    const removeDigit = mod.find(digit => counts[digit]);

    counts[removeDigit] -= 1;
    sum -= removeDigit;
  }
  let result = '';

  for (let digit = 9; digit >= 0; digit--) {
    result += `${digit}`.repeat(counts[digit]);
  }

  return result[0] === '0' ? '0' : result;
};
