/**
 * @param {number[]} nums
 * @return {number}
 */
const sumCounts = function (nums) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = nums.length;
  const tree = new BIT(n);
  const prevMap = new Map();
  let current = 0n;
  let result = 0n;

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const prev = prevMap.get(num) ?? -1;
    const start = prev + 1;
    const count = BigInt(tree.queryRange(start, index));

    current = (current + count * 2n + BigInt(index - start + 1)) % MODULO;
    result = (result + current) % MODULO;
    tree.updateRange(start, index, 1);
    prevMap.set(num, index);
  }

  return Number(result);
};

class BIT {
  constructor(n) {
    this.n = n + 2;
    this.tree1 = Array.from({ length: this.n }, () => 0);
    this.tree2 = Array.from({ length: this.n }, () => 0);
  }

  update(index, delta) {
    index += 1;

    const origin = index;

    while (index < this.n) {
      this.tree1[index] += delta;
      this.tree2[index] += origin * delta;
      index += index & -index;
    }
  }

  updateRange(a, b, delta) {
    this.update(a, delta);
    this.update(b + 1, -delta);
  }

  query(index) {
    index += 1;

    const origin = index + 1;
    let result = 0;

    while (index) {
      const sum = origin * this.tree1[index];

      result += sum - this.tree2[index];
      index -= index & -index;
    }

    return result;
  }

  queryRange(a, b) {
    return this.query(b) - this.query(a - 1);
  }
}
