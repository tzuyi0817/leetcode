/**
 * @param {number} n
 * @return {number}
 */
const largestPalindrome = function (n) {
  const MODULO = 1337n;
  const maximum = BigInt(10 ** n - 1);
  const minimum = BigInt(10 ** (n - 1));

  for (let num = maximum; num >= minimum; num -= 1n) {
    const str = `${num}`;
    let palindrome = str;

    for (let index = str.length - 1; index >= 0; index--) {
      palindrome += str[index];
    }
    palindrome = BigInt(palindrome);

    for (let current = maximum; current ** 2n > palindrome; current -= 1n) {
      if (palindrome % current) continue;
      return palindrome % MODULO;
    }
  }
  return 9;
};
