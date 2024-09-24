/**
 * @param {string} s
 * @param {string} part
 * @return {string}
 */
const removeOccurrences = function (s, part) {
  const size = part.length;
  const result = [];
  const isMatch = end => {
    if (end < size) return false;
    let current = 0;

    for (let index = end - size; index < end; index++) {
      if (result[index] !== part[current]) return false;
      current += 1;
    }
    return true;
  };
  let current = 0;

  for (let index = 0; index < s.length; index++) {
    result[current++] = s[index];

    if (!isMatch(current)) continue;
    current -= size;
  }
  return result.slice(0, current).join('');
};
