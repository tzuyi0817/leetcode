/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
const maximumSumSubsequence = function (nums, queries) {
  const MODULO = 10 ** 9 + 7;
  const tree = new SegmentTree(nums);
  let result = 0;

  for (const [pos, x] of queries) {
    tree.update(pos, x);
    result = (result + tree.query()) % MODULO;
  }

  return result;
};

class SegmentTree {
  constructor(nums) {
    this.n = nums.length;
    this.nums = nums;
    this.tree = Array.from({ length: 4 * this.n }, () => {
      return [
        [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
        [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
      ];
    });
    this.#build(0, 0, this.n - 1);
  }

  #build(index, l, r) {
    if (l === r) {
      this.tree[index][0][0] = 0;
      this.tree[index][1][1] = this.nums[l];

      return;
    }

    const mid = Math.floor((l + r) / 2);
    const a = index * 2 + 1;
    const b = index * 2 + 2;

    this.#build(a, l, mid);
    this.#build(b, mid + 1, r);
    this.#merge(index, this.tree[a], this.tree[b]);
  }

  #merge(index, a, b) {
    for (let l = 0; l < 2; l++) {
      for (let r = 0; r < 2; r++) {
        const sum1 = a[l][0] + b[0][r];
        const sum2 = a[l][0] + b[1][r];
        const sum3 = a[l][1] + b[0][r];

        this.tree[index][l][r] = Math.max(sum1, sum2, sum3);
      }
    }
  }

  update(pos, x) {
    this.#update(0, 0, this.n - 1, pos, x);
  }

  #update(index, l, r, pos, x) {
    if (l === r) {
      this.tree[index][1][1] = x;

      return;
    }

    const mid = Math.floor((l + r) / 2);
    const a = index * 2 + 1;
    const b = index * 2 + 2;

    if (pos <= mid) {
      this.#update(a, l, mid, pos, x);
    } else {
      this.#update(b, mid + 1, r, pos, x);
    }

    this.#merge(index, this.tree[a], this.tree[b]);
  }

  query() {
    const result = this.tree[0];
    const sum1 = result[0][0];
    const sum2 = result[0][1];
    const sum3 = result[1][0];
    const sum4 = result[1][1];

    return Math.max(sum1, sum2, sum3, sum4);
  }
}
