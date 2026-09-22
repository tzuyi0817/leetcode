/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number[][]} queries
 * @return {number[]}
 */
const resultArray = function (nums, k, queries) {
  const tree = new SegmentTree(nums, k);

  return queries.map(([index, val, start, x]) => {
    tree.update(index, val);

    const { remain } = tree.query(start);

    return remain[x];
  });
};

class Node {
  constructor(k) {
    this.remain = new Array(k).fill(0);
  }
  product = 1;
}

class SegmentTree {
  constructor(nums, k) {
    this.k = k;
    this.n = nums.length;
    this.tree = Array.from({ length: 4 * this.n }, () => new Node(k));
    this.#build(nums, 0, 0, this.n - 1);
  }

  #build(nums, index, l, r) {
    if (l === r) {
      const x = nums[l] % this.k;

      this.tree[index].remain[x] = 1;
      this.tree[index].product = x;

      return;
    }

    const mid = Math.floor((l + r) / 2);

    this.#build(nums, index * 2 + 1, l, mid);
    this.#build(nums, index * 2 + 2, mid + 1, r);

    const leftNode = this.tree[index * 2 + 1];
    const rightNode = this.tree[index * 2 + 2];

    this.tree[index] = this.#merge(this.tree[index], leftNode, rightNode);
  }

  #merge(node, leftNode, rightNode) {
    node.product = (leftNode.product * rightNode.product) % this.k;

    for (let x = 0; x < this.k; x++) {
      node.remain[x] = leftNode.remain[x];
    }

    for (let x = 0; x < this.k; x++) {
      const mod = (x * leftNode.product) % this.k;

      node.remain[mod] += rightNode.remain[x];
    }

    return node;
  }

  update(index, val) {
    this.#update(0, 0, this.n - 1, index, val);
  }

  #update(index, l, r, target, val) {
    if (l === r) {
      const x = val % this.k;

      this.tree[index] = new Node(this.k);
      this.tree[index].remain[x] = 1;
      this.tree[index].product = x;

      return;
    }

    const mid = Math.floor((l + r) / 2);

    if (target <= mid) {
      this.#update(index * 2 + 1, l, mid, target, val);
    } else {
      this.#update(index * 2 + 2, mid + 1, r, target, val);
    }

    const leftNode = this.tree[index * 2 + 1];
    const rightNode = this.tree[index * 2 + 2];

    this.tree[index] = this.#merge(this.tree[index], leftNode, rightNode);
  }

  query(start) {
    return this.#query(0, 0, this.n - 1, start);
  }

  #query(index, l, r, start) {
    if (start <= l) {
      return this.tree[index];
    }

    const mid = Math.floor((l + r) / 2);

    if (start <= mid) {
      const leftNode = this.#query(index * 2 + 1, l, mid, start);
      const rightNode = this.tree[index * 2 + 2];

      return this.#merge(new Node(this.k), leftNode, rightNode);
    }

    return this.#query(index * 2 + 2, mid + 1, r, start);
  }
}
