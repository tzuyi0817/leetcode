/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
const longestSubsequenceRepeatedK = function (s, k) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const counts = Array.from({ length: 26 }, () => 0);
  const possibleChars = [];
  const queue = [''];
  let result = '';

  for (const char of s) {
    const code = char.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;
  }

  for (let index = 0; index < 26; index++) {
    if (counts[index] < k) continue;
    const char = String.fromCharCode(index + BASE_CODE);

    possibleChars.push(char);
  }

  const isValidSubseq = (subseq, times) => {
    let index = 0;

    for (const char of s) {
      if (subseq[index] === char) {
        index += 1;
      }

      if (index === subseq.length) {
        times -= 1;
        index = 0;
      }

      if (times === 0) return true;
    }

    return false;
  };

  while (queue.length) {
    const currentSubseq = queue.shift();

    for (const char of possibleChars) {
      const nextSubSeq = `${currentSubseq}${char}`;

      if (isValidSubseq(nextSubSeq, k)) {
        queue.push(nextSubSeq);
        result = nextSubSeq;
      }
    }
  }

  return result;
};
