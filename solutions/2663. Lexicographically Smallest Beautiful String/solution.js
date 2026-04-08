/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
const smallestBeautifulString = function (s, k) {
  const n = s.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const chars = [...s];

  const containsPalindrome = (index, char) => {
    return char === chars[index - 1] || char === chars[index - 2];
  };

  const changeSuffix = start => {
    for (let index = start; index < n; index++) {
      for (let code = 0; code < k; code++) {
        const char = String.fromCharCode(code + BASE_CODE);

        if (containsPalindrome(index, char)) continue;

        chars[index] = char;
        break;
      }
    }

    return chars.join('');
  };

  for (let index = n - 1; index >= 0; index--) {
    const code = chars[index].charCodeAt(0) - BASE_CODE;

    for (let nextCode = code + 1; nextCode < k; nextCode++) {
      const nextChar = String.fromCharCode(nextCode + BASE_CODE);

      if (containsPalindrome(index, nextChar)) continue;

      chars[index] = nextChar;

      return changeSuffix(index + 1);
    }
  }

  return '';
};
