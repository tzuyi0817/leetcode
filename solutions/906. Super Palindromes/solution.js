/**
 * @param {string} left
 * @param {string} right
 * @return {number}
 */
const superpalindromesInRange = function (left, right) {
  const MAX_LENGTH = Math.ceil(right.length / 2);
  let result = 0;

  const isPalindrome = num => {
    let left = 0;
    let right = num.length - 1;

    while (left < right) {
      if (num[left] !== num[right]) return false;
      left += 1;
      right -= 1;
    }
    return true;
  };

  const createPalindrome = current => {
    if (current.length > MAX_LENGTH) return;
    if (current && current[0] !== '0') {
      const num = BigInt(current) ** 2n;

      if (num > BigInt(right)) return;
      if (num >= BigInt(left) && isPalindrome(`${num}`)) result += 1;
    }

    for (let num = 0; num <= 9; num++) {
      createPalindrome(`${num}${current}${num}`);
    }
  };

  createPalindrome('');

  for (let num = 0; num <= 9; num++) {
    createPalindrome(`${num}`);
  }
  return result;
};
