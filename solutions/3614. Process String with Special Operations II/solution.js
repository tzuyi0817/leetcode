/**
 * @param {string} s
 * @param {number} k
 * @return {character}
 */
const processStr = function (s, k) {
  const n = s.length;
  const REMOVE = '*';
  const DUPLICATE = '#';
  const REVERSE = '%';
  let len = 0;

  for (const char of s) {
    if (char === REVERSE) continue;

    if (char === REMOVE) {
      len = Math.max(0, len - 1);
    } else if (char === DUPLICATE) {
      len *= 2;
    } else {
      len += 1;
    }
  }

  if (k >= len) return '.';

  for (let index = n - 1; index >= 0; index--) {
    const char = s[index];

    switch (char) {
      case REMOVE: {
        len += 1;

        break;
      }
      case DUPLICATE: {
        len = len / 2;

        if (k + 1 > len) {
          k -= len;
        }

        break;
      }
      case REVERSE: {
        k = len - k - 1;

        break;
      }
      default: {
        if (k + 1 === len) return char;

        len -= 1;
      }
    }
  }

  return '.';
};
