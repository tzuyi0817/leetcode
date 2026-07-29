/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
const smallestPalindrome = function (s, k) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const counts = Array.from({ length: 26 }, () => 0);
  const halfCounts = Array.from({ length: 26 }, () => 0);
  let middleChar = '';

  for (const char of s) {
    const code = char.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;
  }

  for (let code = 0; code < 26; code++) {
    const count = counts[code];

    if (count % 2) {
      middleChar = String.fromCharCode(code + BASE_CODE);
    }

    halfCounts[code] = Math.floor(count / 2);
  }

  if (getCountArrangements(halfCounts, k + 1) < k) {
    return '';
  }

  const n = s.length;
  const left = [];
  let len = Math.floor(n / 2);

  while (len) {
    for (let code = 0; code < 26; code++) {
      if (!halfCounts[code]) continue;

      halfCounts[code] -= 1;

      const arrangements = getCountArrangements(halfCounts, k + 1);

      if (arrangements >= k) {
        const char = String.fromCharCode(code + BASE_CODE);

        left.push(char);
        break;
      }

      halfCounts[code] += 1;
      k -= arrangements;
    }

    len -= 1;
  }

  return `${left.join('')}${middleChar}${left.toReversed().join('')}`;
};

function getCountArrangements(counts, max) {
  let total = counts.reduce((sum, count) => sum + count);
  let result = 1;

  for (const count of counts) {
    if (!count) continue;

    result *= nCk(total, count, max);

    if (result >= max) {
      return max;
    }

    total -= count;
  }

  return result;
}

function nCk(n, k, max) {
  const limit = Math.min(k, n - k);
  let result = 1;

  for (let index = 1; index <= limit; index++) {
    result = Math.floor((result * (n - index + 1)) / index);

    if (result >= max) {
      return max;
    }
  }

  return result;
}
