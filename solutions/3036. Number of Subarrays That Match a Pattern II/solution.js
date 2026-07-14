/**
 * @param {number[]} nums
 * @param {number[]} pattern
 * @return {number}
 */
const countMatchingSubarrays = function (nums, pattern) {
  const n = nums.length;
  const m = pattern.length;
  const lps = getLPS(pattern);
  const numsPattern = [];
  let a = 0;
  let b = 0;
  let result = 0;

  for (let index = 1; index < n; index++) {
    const prev = nums[index - 1];
    const num = nums[index];
    const value = Math.sign(num - prev);

    numsPattern.push(value);
  }

  while (a < n) {
    if (numsPattern[a] === pattern[b]) {
      a += 1;
      b += 1;

      if (b === m) {
        result += 1;
        b = lps[b - 1];
      }
    } else if (b) {
      b = lps[b - 1];
    } else {
      a += 1;
    }
  }

  return result;
};

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
