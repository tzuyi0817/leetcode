/**
 * @param {number[]} fruits
 * @param {number[]} baskets
 * @return {number}
 */
const numOfUnplacedFruits = function (fruits, baskets) {
  const st = new SegmentTree(baskets);
  let result = 0;

  for (const quantity of fruits) {
    const index = st.query(quantity);

    if (index === -1) {
      result += 1;
    } else {
      st.update(index, 0);
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

  build(nums, index, left, right) {
    if (left === right) {
      this.tree[index] = nums[left];
      return;
    }
    const mid = Math.floor((left + right) / 2);

    this.build(nums, index * 2 + 1, left, mid);
    this.build(nums, index * 2 + 2, mid + 1, right);
    this.merge(index);
  }

  merge(index) {
    const a = this.tree[index * 2 + 1];
    const b = this.tree[index * 2 + 2];

    this.tree[index] = Math.max(a, b);
  }

  update(index, val) {
    this.#update(0, 0, this.n - 1, index, val);
  }

  #update(index, left, right, target, val) {
    if (left === right) {
      this.tree[index] = val;
      return;
    }
    const mid = Math.floor((left + right) / 2);

    if (mid >= target) {
      this.#update(index * 2 + 1, left, mid, target, val);
    } else {
      this.#update(index * 2 + 2, mid + 1, right, target, val);
    }

    this.merge(index);
  }

  query(target) {
    return this.#query(0, 0, this.n - 1, target);
  }

  #query(index, left, right, target) {
    if (this.tree[index] < target) return -1;
    if (left === right) return left;
    const mid = Math.floor((left + right) / 2);

    if (this.tree[index * 2 + 1] >= target) {
      return this.#query(index * 2 + 1, left, mid, target);
    } else {
      return this.#query(index * 2 + 2, mid + 1, right, target);
    }
  }
}
