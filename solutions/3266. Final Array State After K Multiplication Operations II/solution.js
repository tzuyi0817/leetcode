/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} multiplier
 * @return {number[]}
 */
const getFinalState = function (nums, k, multiplier) {
  if (multiplier === 1) return nums;

  const n = nums.length;
  const MODULO = BigInt(10 ** 9 + 7);
  const maxNum = BigInt(Math.max(...nums));
  const mult = BigInt(multiplier);
  const minHeap = new Heap((a, b) => {
    return a.num - b.num || a.index - b.index;
  });

  for (let index = 0; index < n; index++) {
    const num = BigInt(nums[index]);

    minHeap.push({ num, index });
  }

  while (k && minHeap.top().num * mult <= maxNum) {
    const element = minHeap.pop();
    const num = element.num * mult;

    minHeap.push({ ...element, num });
    k -= 1;
  }

  const rounds = BigInt(Math.floor(k / n));
  const modK = k % n;
  const factor = modPow(mult, rounds, MODULO);

  if (rounds) {
    for (let index = 0; index < n; index++) {
      const element = minHeap.pop();
      const num = element.num * factor;

      minHeap.push({ ...element, num });
    }
  }

  for (let index = 0; index < modK; index++) {
    const element = minHeap.pop();
    const num = element.num * mult;

    minHeap.push({ ...element, num });
  }

  const result = [];

  while (minHeap.size()) {
    const { index, num } = minHeap.pop();

    result[index] = Number(num % MODULO);
  }

  return result;
};

function modPow(base, exp, mod) {
  let result = 1n;

  while (exp) {
    if (exp % 2n) {
      result = (result * base) % mod;
    }

    base = (base * base) % mod;
    exp /= 2n;
  }

  return result;
}
