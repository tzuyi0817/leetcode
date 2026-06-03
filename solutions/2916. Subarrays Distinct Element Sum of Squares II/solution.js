/**
 * @param {number[]} nums
 * @return {number}
 */
const sumCounts = function (nums) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = nums.length;
  const lastSeenMap = new Map();
  const tree = new LazySegmentTree(n);
  let result = 0n;

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const prev = lastSeenMap.get(num) ?? -1;

    tree.updateRange(prev + 1, index);
    result += tree.getSquaredSum();
    result %= MODULO;
    lastSeenMap.set(num, index);
  }

  return Number(result);
};

class LazySegmentTree {
  constructor(n) {
    this.mod = BigInt(10 ** 9 + 7);
    this.n = n;
    this.lazy = Array.from({ length: 4 * n }, () => 0n);
    this.sums = Array.from({ length: 4 * n }, () => 0n);
    this.squareSums = Array.from({ length: 4 * n }, () => 0n);
  }

  updateRange(l, r) {
    this.#updateRange(0, 0, this.n - 1, l, r);
  }

  #updateRange(index, start, end, l, r) {
    this.#propagate(index, start, end);

    if (start > r || end < l) return;

    if (start >= l && end <= r) {
      this.lazy[index] = 1n;
      this.#propagate(index, start, end);

      return;
    }

    const mid = Math.floor((start + end) / 2);
    const a = index * 2 + 1;
    const b = index * 2 + 2;

    this.#updateRange(a, start, mid, l, r);
    this.#updateRange(b, mid + 1, end, l, r);
    this.sums[index] = (this.sums[a] + this.sums[b]) % this.mod;
    this.squareSums[index] = (this.squareSums[a] + this.squareSums[b]) % this.mod;
  }

  #propagate(index, start, end) {
    if (!this.lazy[index]) return;

    const lazyVal = this.lazy[index];
    const len = BigInt(end - start + 1);

    this.squareSums[index] += 2n * this.sums[index] * lazyVal + len * lazyVal * lazyVal;
    this.squareSums[index] %= this.mod;
    this.sums[index] += len * lazyVal;
    this.sums[index] %= this.mod;

    if (start < end) {
      this.lazy[index * 2 + 1] += lazyVal;
      this.lazy[index * 2 + 2] += lazyVal;
    }

    this.lazy[index] = 0n;
  }

  getSquaredSum() {
    return this.squareSums[0];
  }
}
