/**
 * @param {string} s
 * @param {string} t
 * @param {number} k
 * @return {boolean}
 */
const canConvertString = function (s, t, k) {
  if (s.length !== t.length) return false;
  const convertMap = new Map();

  for (let index = 0; index < s.length; index++) {
    if (t[index] === s[index]) continue;
    const move = (t.charCodeAt(index) - s.charCodeAt(index) + 26) % 26;
    const count = convertMap.get(move) ?? 0;

    if (move + count * 26 > k) return false;
    convertMap.set(move, count + 1);
  }
  return true;
};
