/**
 * @param {string} s
 * @return {number}
 */
const countPalindromicSubsequence = function (s) {
  const BASE_CHAR_CODE = 'a'.charCodeAt(0);
  let result = 0;

  for (let code = 0; code < 26; code++) {
    const char = String.fromCharCode(BASE_CHAR_CODE + code);
    const start = s.indexOf(char);

    if (start === -1) continue;
    const end = s.lastIndexOf(char);

    if (start >= end) continue;
    const isVisited = Array.from({ length: 26 }).fill(false);
    let count = 0;

    for (let index = start + 1; index < end; index++) {
      const charCode = s.charCodeAt(index) - BASE_CHAR_CODE;

      if (isVisited[charCode]) continue;
      count += 1;
      isVisited[charCode] = true;
    }
    result += count;
  }
  return result;
};
