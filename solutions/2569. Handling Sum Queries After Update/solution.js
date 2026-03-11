/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[][]} queries
 * @return {number[]}
 */
const handleQuery = function (nums1, nums2, queries) {
  const tree = new SegmentTree(nums1);
  const result = [];
  let sum = nums2.reduce((total, num) => total + num);

  for (const [type, l, r] of queries) {
    if (type === 1) {
      tree.updateRange(l, r);
    } else if (type === 2) {
      sum += l * tree.getSum();
    } else {
      result.push(sum);
    }
  }

  return result;
};

class SegmentTree {
  constructor(nums) {
    const n = nums.length;

    this.n = n;
    this.nums = nums;
    this.tree = Array.from({ length: 4 * n }, () => 0);
    this.lazy = Array.from({ length: 4 * n }, () => false);
    this.build(0, 0, n - 1);
  }

  build(index, start, end) {
    if (start === end) {
      this.tree[index] = this.nums[start];
      return;
    }

    const mid = Math.floor((start + end) / 2);

    this.build(index * 2 + 1, start, mid);
    this.build(index * 2 + 2, mid + 1, end);
    this.tree[index] = this.tree[index * 2 + 1] + this.tree[index * 2 + 2];
  }

  updateRange(l, r) {
    return this.#updateRange(0, 0, this.n - 1, l, r);
  }

  #updateRange(index, start, end, l, r) {
    if (this.lazy[index]) {
      this.flip(index, start, end);
      this.lazy[index] = false;
    }

    if (start > r || end < l) return;

    if (start >= l && end <= r) {
      this.flip(index, start, end);
      return;
    }

    const mid = Math.floor((start + end) / 2);

    this.#updateRange(index * 2 + 1, start, mid, l, r);
    this.#updateRange(index * 2 + 2, mid + 1, end, l, r);
    this.tree[index] = this.tree[index * 2 + 1] + this.tree[index * 2 + 2];
  }

  flip(index, start, end) {
    this.tree[index] = end - start + 1 - this.tree[index];

    if (start < end) {
      this.lazy[index * 2 + 1] = !this.lazy[index * 2 + 1];
      this.lazy[index * 2 + 2] = !this.lazy[index * 2 + 2];
    }
  }

  getSum() {
    return this.tree[0];
  }
}
