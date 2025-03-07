/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
const minInteger = function (num, k) {
  const n = num.length;
  const tree = new BinaryIndexTree(n);
  const used = new Array(n + 1).fill(false);
  const numIndices = Array.from({ length: 10 }, () => []);
  let result = '';

  for (let index = 0; index < n; index++) {
    numIndices[Number(num[index])].push(index);
  }

  while (result.length < n && k) {
    for (let digit = 0; digit < 10; digit++) {
      if (!numIndices[digit].length) continue;
      const index = numIndices[digit][0];
      const cost = index - tree.get(index);

      if (cost > k) continue;

      k -= cost;
      result += digit;
      tree.add(index + 1, 1);
      used[index] = true;
      numIndices[digit].shift();
      break;
    }
  }

  for (let index = 0; index < n; index++) {
    if (used[index]) continue;

    result += num[index];
  }

  return result;
};

class BinaryIndexTree {
  constructor(n) {
    this.sums = new Array(n + 1).fill(0);
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
