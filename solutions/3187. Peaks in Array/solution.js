/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
const countOfPeaks = function (nums, queries) {
  const n = nums.length;
  const peaks = Array.from({ length: n }, () => 0);
  const tree = new BIT(n);
  const result = [];

  const isPeak = index => {
    const prev = nums[index - 1];
    const current = nums[index];
    const next = nums[index + 1];

    return current > prev && current > next;
  };

  for (let index = 1; index < n - 1; index++) {
    peaks[index] = Number(isPeak(index));
  }

  for (let index = 0; index < n; index++) {
    tree.update(index + 1, peaks[index]);
  }

  const updatePeak = index => {
    if (index <= 0 || index >= n - 1) return;

    const originPeak = peaks[index];
    const currentPeak = Number(isPeak(index));

    if (originPeak !== currentPeak) {
      peaks[index] = currentPeak;
      tree.update(index + 1, currentPeak - originPeak);
    }
  };

  for (const query of queries) {
    const [type] = query;

    if (type === 1) {
      const l = query[1];
      const r = query[2];
      const count = r - l < 2 ? 0 : tree.query(r) - tree.query(l + 1);

      result.push(count);
    } else {
      const index = query[1];
      const val = query[2];

      nums[index] = val;
      updatePeak(index);
      updatePeak(index - 1);
      updatePeak(index + 1);
    }
  }

  return result;
};

class BIT {
  constructor(n) {
    this.n = n + 2;
    this.tree = Array.from({ length: this.n }, () => 0);
  }

  update(index, delta) {
    while (index < this.n) {
      this.tree[index] += delta;
      index += index & -index;
    }
  }

  query(index) {
    let result = 0;

    while (index) {
      result += this.tree[index];
      index -= index & -index;
    }

    return result;
  }
}
