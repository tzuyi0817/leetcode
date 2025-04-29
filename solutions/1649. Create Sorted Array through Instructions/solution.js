/**
 * @param {number[]} instructions
 * @return {number}
 */
const createSortedArray = function (instructions) {
  const n = instructions.length;
  const MODULO = BigInt(10 ** 9 + 7);
  const minNum = Math.min(...instructions);
  const maxNum = Math.max(...instructions);
  const tree = new BinaryIndexedTree(maxNum - minNum + 1);

  let result = 0n;

  for (let index = 0; index < n; index++) {
    const num = instructions[index] - minNum + 1;
    const lessCount = tree.get(num - 1);
    const greaterCount = index - tree.get(num);
    const cost = BigInt(Math.min(lessCount, greaterCount));

    result = (result + cost) % MODULO;
    tree.add(num, 1);
  }

  return Number(result);
};

class BinaryIndexedTree {
  constructor(n) {
    this.tree = Array.from({ length: n + 1 }, () => 0);
  }

  add(index, delta) {
    const n = this.tree.length;

    while (index < n) {
      this.tree[index] += delta;
      index += index & -index;
    }
  }

  get(index) {
    let sum = 0;

    while (index > 0) {
      sum += this.tree[index];
      index -= index & -index;
    }

    return sum;
  }
}
