/**
 * @param {string} s
 * @param {number} k
 * @param {character} letter
 * @param {number} repetition
 * @return {string}
 */
const smallestSubsequence = function (s, k, letter, repetition) {
  const n = s.length;
  const stack = [];
  let letterCount = 0;
  let required = repetition;

  for (const char of s) {
    if (char === letter) {
      letterCount += 1;
    }
  }

  for (let index = 0; index < n; index++) {
    const char = s[index];

    while (
      stack.length &&
      stack.at(-1) > char &&
      stack.length + n - index - 1 >= k &&
      (stack.at(-1) !== letter || letterCount > required)
    ) {
      const removeChar = stack.pop();

      if (removeChar === letter) {
        required += 1;
      }
    }

    if (char === letter) {
      letterCount -= 1;
    }

    if (stack.length >= k) continue;

    if (char === letter) {
      required -= 1;
      stack.push(char);
    } else if (k > stack.length + required) {
      stack.push(char);
    }
  }

  return stack.join('');
};
