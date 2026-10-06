/**
 * @param {string} s
 * @return {number}
 */
const minAddToMakeValid = function (s) {
  let diff = 0;
  let invalid = 0;

  for (const char of s) {
    if (char === '(') {
      diff += 1;

      continue;
    }

    if (diff <= 0) {
      invalid += 1;
    } else {
      diff -= 1;
    }
  }

  return invalid + diff;
};
