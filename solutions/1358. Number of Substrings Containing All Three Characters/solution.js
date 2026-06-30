/**
 * @param {string} s
 * @return {number}
 */
const numberOfSubstrings = function (s) {
  const n = s.length;
  const charMap = new Map();
  let left = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const char = s[index];
    const count = charMap.get(char) ?? 0;

    charMap.set(char, count + 1);

    if (charMap.size < 3) continue;

    while (charMap.get(s[left]) > 1) {
      const leftCount = charMap.get(s[left]);

      charMap.set(s[left], leftCount - 1);
      left += 1;
    }

    result += left + 1;
  }

  return result;
};
