/**
 * @param {number[]} fruits
 * @param {number[]} baskets
 * @return {number}
 */
const numOfUnplacedFruits = function (fruits, baskets) {
  const st = new SegmentTree(baskets);
  let result = 0;

  for (const quantity of fruits) {
    if (st.query(quantity) === -1) {
      result += 1;
    }
  }

  return result;
};

class SegmentTree {
  constructor(nums) {
    this.n = nums.length;
    this.tree = Array.from({ length: this.n * 4 }, () => 0);
    this.build(nums, 0, 0, this.n - 1);
  }

  build(nums, index, low, high) {
    if (low === high) {
      this.tree[index] = nums[low];
      return;
    }
    const mid = Math.floor((low + high) / 2);

    this.build(nums, index * 2 + 1, low, mid);
    this.build(nums, index * 2 + 2, mid + 1, high);
    this.merge(index);
  }

  update(target, val) {
    this._update(0, 0, this.n - 1, target, val);
  }

  _update(index, low, high, target, val) {
    if (low === high) {
      this.tree[index] = val;
      return;
    }
    const mid = Math.floor((low + high) / 2);

    if (target <= mid) {
      this._update(index * 2 + 1, low, mid, target, val);
    } else {
      this._update(index * 2 + 2, mid + 1, high, target, val);
    }

    this.merge(index);
  }

  query(target) {
    return this._query(0, 0, this.n - 1, target);
  }

  _query(index, low, high, target) {
    if (this.tree[index] < target) return -1;
    if (low === high) {
      this.update(low, -1);
      return low;
    }
    const mid = Math.floor((low + high) / 2);

    if (this.tree[index * 2 + 1] >= target) {
      return this._query(index * 2 + 1, low, mid, target);
    } else {
      return this._query(index * 2 + 2, mid + 1, high, target);
    }
  }

  merge(index) {
    this.tree[index] = Math.max(this.tree[index * 2 + 1], this.tree[index * 2 + 2]);
  }
}
