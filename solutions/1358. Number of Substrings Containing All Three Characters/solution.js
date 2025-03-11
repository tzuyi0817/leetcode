/**
 * @param {string} s
 * @return {number}
 */
const numberOfSubstrings = function (s) {
  const n = s.length;
  const countMap = { a: 0, b: 0, c: 0 };
  let left = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const char = s[index];

    countMap[char] += 1;

    while (countMap.a && countMap.b && countMap.c) {
      const current = s[left];

      countMap[current] -= 1;
      left += 1;
    }

    result += left;
  }

  return result;
};
