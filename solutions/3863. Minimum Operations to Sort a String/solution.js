/**
 * @param {string} s
 * @return {number}
 */
const minOperations = function (s) {
  const n = s.length;
  const isValidOrder = [...s].every((char, index) => {
    const prev = s[index - 1] ?? char;

    return prev <= char;
  });

  if (isValidOrder) return 0;

  if (n === 2) return -1;

  const countMap = new Map();
  let minChar = s[0];
  let maxChar = s[0];

  countMap.set(s[0], 1);

  for (let index = 1; index < n; index++) {
    const char = s[index];
    const count = countMap.get(char) ?? 0;

    countMap.set(char, count + 1);

    if (char < minChar) {
      minChar = char;
    }

    if (char > maxChar) {
      maxChar = char;
    }
  }

  const minCharCount = countMap.get(minChar);
  const maxCharCount = countMap.get(maxChar);

  if (minCharCount === 1 && maxCharCount === 1 && minChar === s[n - 1] && maxChar === s[0]) return 3;

  if (minChar === s[0] || maxChar === s[n - 1]) return 1;

  return 2;
};
