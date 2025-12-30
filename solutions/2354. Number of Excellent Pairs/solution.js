/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const countExcellentPairs = function (nums, k) {
  const maxNum = Math.max(...nums);
  const maxBit = Math.ceil(Math.log2(maxNum));
  const counts = Array.from({ length: maxBit + 1 }, () => 0);
  const numSet = new Set(nums);
  let result = 0;

  const popcount = x => {
    let count = 0;

    while (x) {
      x &= x - 1;
      count += 1;
    }

    return count;
  };

  for (const num of numSet) {
    const count = popcount(num);

    counts[count] += 1;
  }

  for (let a = 0; a <= maxBit; a++) {
    for (let b = 0; b <= maxBit; b++) {
      if (a + b < k) continue;

      result += counts[a] * counts[b];
    }
  }

  return result;
};
