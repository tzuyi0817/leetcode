/**
 * @param {number} k
 * @return {character}
 */
const kthCharacter = function (k) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const codes = [0];

  while (codes.length < k) {
    const n = codes.length;

    for (let index = 0; index < n; index++) {
      const code = codes[index];

      codes.push((code + 1) % 26);

      if (codes.length >= k) break;
    }
  }

  return String.fromCharCode(codes[k - 1] + BASE_CODE);
};
