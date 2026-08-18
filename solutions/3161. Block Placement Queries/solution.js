/**
 * @param {number[][]} queries
 * @return {boolean[]}
 */
const getResults = function (queries) {
  const n = queries.length;
  const maxNum = Math.min(50000, n * 3);
  const result = [];
  const tree = new BIT(maxNum);
  const obstacles = new OrderedSet();

  obstacles.insert(0);
  obstacles.insert(maxNum);

  for (const [type, x] of queries) {
    if (type === 1) {
      obstacles.insert(x);
    }
  }

  for (let index = 1; index < obstacles.arr.length; index++) {
    const prev = obstacles.arr[index - 1];
    const current = obstacles.arr[index];

    tree.maximize(current, current - prev);
  }

  for (let index = n - 1; index >= 0; index--) {
    const [type, x, sz] = queries[index];

    if (type === 1) {
      const obstacle = obstacles.findIndex(x);

      if (obstacle !== -1 && obstacle + 1 < obstacles.arr.length) {
        const prevX = obstacles.arr[obstacle - 1];
        const nextX = obstacles.arr[obstacle + 1];

        tree.maximize(nextX, nextX - prevX);
      }

      obstacles.erase(x);
    } else {
      const upper = obstacles.upperBoundIndex(x);
      const prev = obstacles.arr[upper - 1];
      const isPlacement = x - prev >= sz || tree.query(prev) >= sz;

      result.push(isPlacement);
    }
  }

  return result.toReversed();
};

class BIT {
  constructor(n) {
    this.bit = Array.from({ length: n + 2 }, () => 0);
  }

  maximize(x, delta) {
    while (x < this.bit.length) {
      this.bit[x] = Math.max(this.bit[x], delta);
      x += x & -x;
    }
  }

  query(x) {
    let result = 0;

    while (x) {
      result = Math.max(this.bit[x], result);
      x -= x & -x;
    }

    return result;
  }
}

class OrderedSet {
  arr = [];

  upperBoundIndex(val) {
    let left = 0;
    let right = this.arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      this.arr[mid] > val ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  }

  insert(val) {
    const index = this.upperBoundIndex(val);

    if (index > 0 && this.arr[index - 1] === val) return;

    this.arr.splice(index, 0, val);
  }

  erase(val) {
    const index = this.upperBoundIndex(val) - 1;

    if (index >= 0 && this.arr[index] === val) {
      this.arr.splice(index, 1);
    }
  }

  findIndex(val) {
    const index = this.upperBoundIndex(val) - 1;

    return index >= 0 && this.arr[index] === val ? index : -1;
  }
}
