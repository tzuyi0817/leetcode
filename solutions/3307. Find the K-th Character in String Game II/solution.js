/**
 * @param {number} k
 * @param {number[]} operations
 * @return {character}
 */
const kthCharacter = function (k, operations) {
  let n = 1;
  let index = -1;
  let changes = 0;

  while (n < k) {
    n *= 2;
    index += 1;
  }

  while (n > 1) {
    if (k > n / 2) {
      changes = (changes + operations[index]) % 26;
      k -= n / 2;
    }

    n /= 2;
    index -= 1;
  }

  return String.fromCharCode(changes + 'a'.charCodeAt(0));
};
