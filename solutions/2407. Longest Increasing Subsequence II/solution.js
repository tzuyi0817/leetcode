/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const lengthOfLIS = function (nums, k) {
  const maxNum = Math.max(...nums);
  const tree = new SegmentTree(maxNum + 1);
  let result = 0;

  for (const num of nums) {
    const min = Math.max(0, num - k);
    const max = num - 1;
    const longestSubseq = tree.query(min, max) + 1;

    tree.update(num, longestSubseq);
    result = Math.max(longestSubseq, result);
  }

  return result;
};

class SegmentTree {
  constructor(n) {
    this.n = n;
    this.longestSubseq = Array.from({ length: this.n * 4 }, () => 0);
  }

  update(num, len) {
    this.#update(0, 0, this.n - 1, num, len);
  }

  #update(index, low, high, num, len) {
    if (num < low || num > high) return;

    if (low === high) {
      this.longestSubseq[index] = Math.max(len, this.longestSubseq[index]);
      return;
    }

    const mid = Math.floor((low + high) / 2);

    if (num <= mid) {
      this.#update(index * 2 + 1, low, mid, num, len);
    } else {
      this.#update(index * 2 + 2, mid + 1, high, num, len);
    }

    this.longestSubseq[index] = Math.max(this.longestSubseq[index * 2 + 1], this.longestSubseq[index * 2 + 2]);
  }

  query(left, right) {
    return this.#query(0, 0, this.n - 1, left, right);
  }

  #query(index, low, high, left, right) {
    if (left > high || right < low) return 0;

    if (low >= left && high <= right) {
      return this.longestSubseq[index];
    }

    const mid = Math.floor((low + high) / 2);
    const leftQuery = this.#query(index * 2 + 1, low, mid, left, right);
    const rightQuery = this.#query(index * 2 + 2, mid + 1, high, left, right);

    return Math.max(leftQuery, rightQuery);
  }
}
