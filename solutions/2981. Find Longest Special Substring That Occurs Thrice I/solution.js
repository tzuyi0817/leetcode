/**
 * @param {string} s
 * @return {number}
 */
const maximumLength = function (s) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = s.length;
  const counts = Array.from({ length: 26 }, () => Array.from({ length: n + 1 }, () => 0));
  let length = 0;
  let result = -1;

  for (let index = 0; index < n; index++) {
    const letter = s[index];
    const code = letter.charCodeAt(0) - BASE_CODE;

    length = letter === s[index - 1] ? length + 1 : 1;
    counts[code][length] += 1;
  }

  const getLongestLength = code => {
    const count = counts[code];
    let times = 0;

    for (let length = n; length > 0; length--) {
      times += count[length];

      if (times >= 3) return length;
    }
    return -1;
  };

  for (let code = 0; code < 26; code++) {
    result = Math.max(getLongestLength(code), result);
  }
  return result;
};
