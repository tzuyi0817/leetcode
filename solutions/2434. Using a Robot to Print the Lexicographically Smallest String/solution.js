/**
 * @param {string} s
 * @return {string}
 */
const robotWithString = function (s) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const counts = Array.from({ length: 26 }, () => 0);
  const stack = [];
  const result = [];
  let smallestCode = 0;

  const getCode = letter => letter.charCodeAt(0) - BASE_CODE;

  for (const letter of s) {
    const code = getCode(letter);

    counts[code] += 1;
  }

  for (const letter of s) {
    const code = getCode(letter);

    counts[code] -= 1;
    stack.push(letter);

    while (smallestCode < 26 && !counts[smallestCode]) {
      smallestCode += 1;
    }

    while (stack.length && getCode(stack.at(-1)) <= smallestCode) {
      const current = stack.pop();

      result.push(current);
    }
  }

  return result.join('');
};
