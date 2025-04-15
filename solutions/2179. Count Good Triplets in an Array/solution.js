/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const goodTriplets = function (nums1, nums2) {
  const n = nums1.length;
  const num1Indexed = Array.from({ length: n }, () => -1);
  const leftTree = new BinaryIndexedTree(n);
  const rightTree = new BinaryIndexedTree(n);
  const leftCounts = Array.from({ length: n + 1 }, () => 0);
  const rightCounts = Array.from({ length: n + 1 }, () => 0);

  for (let index = 0; index < n; index++) {
    const num = nums1[index];

    num1Indexed[num] = index;
  }

  for (let index = 0; index < n; index++) {
    const num = nums2[index];
    const num1Index = num1Indexed[num];

    leftCounts[index] = leftTree.get(num1Index);
    leftTree.add(num1Index + 1, 1);
  }

  for (let index = n - 1; index >= 0; index--) {
    const num = nums2[index];
    const num1Index = num1Indexed[num];

    rightCounts[index] = rightTree.get(n) - rightTree.get(num1Index);
    rightTree.add(num1Index + 1, 1);
  }

  return leftCounts.reduce((result, count, index) => result + count * rightCounts[index], 0);
};

class BinaryIndexedTree {
  constructor(n) {
    this.sums = Array.from({ length: n + 1 }, () => 0);
  }

  add(index, delta) {
    while (index < this.sums.length) {
      this.sums[index] += delta;
      index += index & -index;
    }
  }

  get(index) {
    let sum = 0;

    while (index > 0) {
      sum += this.sums[index];
      index -= index & -index;
    }

    return sum;
  }
}
