/**
 * @param {string} s
 * @param {string} a
 * @param {string} b
 * @param {number} k
 * @return {number[]}
 */
const beautifulIndices = function (s, a, b, k) {
  const beautifulA = createKMP(s, a);
  const beautifulB = createKMP(s, b);
  const m = beautifulB.length;
  const result = [];
  let left = 0;

  for (const index of beautifulA) {
    while (left < m && beautifulB[left] - index < -k) {
      left += 1;
    }

    if (beautifulB[left] - index <= k) {
      result.push(index);
    }
  }

  return result;
};

function createKMP(s, target) {
  const n = s.length;
  const m = target.length;
  const lps = getLPS(target);
  const result = [];
  let a = 0;
  let b = 0;

  while (a < n) {
    if (s[a] === target[b]) {
      a += 1;
      b += 1;

      if (b === m) {
        result.push(a - m);
        b = lps[b - 1];
      }
    } else if (b > 0) {
      b = lps[b - 1];
    } else {
      a += 1;
    }
  }

  return result;
}

function getLPS(pattern) {
  const n = pattern.length;
  const lps = Array.from({ length: n }, () => 0);
  let left = 0;

  for (let index = 1; index < n; index++) {
    while (left && pattern[index] !== pattern[left]) {
      left = lps[left - 1];
    }

    if (pattern[index] === pattern[left]) {
      lps[index] = left + 1;
      left += 1;
    }
  }

  return lps;
}
