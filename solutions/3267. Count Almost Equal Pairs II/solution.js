/**
 * @param {number[]} nums
 * @return {number}
 */
const countPairs = function (nums) {
  const maxNum = Math.max(...nums);
  const maxLen = String(maxNum).length;
  const countMap = new Map();
  let result = 0;

  for (const num of nums) {
    const digits = String(num).padStart(maxLen, '0');
    const swaps = getSwaps(digits);

    for (const swap of swaps) {
      result += countMap.get(swap) ?? 0;
    }

    const count = countMap.get(digits) ?? 0;

    countMap.set(digits, count + 1);
  }

  return result;
};

function getSwaps(digits) {
  const n = digits.length;
  const oneSwaps = new Set();

  for (let a = 0; a < n; a++) {
    for (let b = 0; b < a; b++) {
      const nextDigits = swapDigits(digits, a, b);

      oneSwaps.add(nextDigits);
    }
  }

  const result = new Set([digits, ...oneSwaps]);

  for (const swap of oneSwaps) {
    for (let a = 0; a < n; a++) {
      for (let b = 0; b < a; b++) {
        const nextDigits = swapDigits(swap, a, b);

        result.add(nextDigits);
      }
    }
  }

  return result;
}

function swapDigits(digits, a, b) {
  const nextDigits = digits.split('');

  [nextDigits[a], nextDigits[b]] = [nextDigits[b], nextDigits[a]];

  return nextDigits.join('');
}
