/**
 * @param {number[][]} grid
 * @return {number}
 */
const minimumVisitedCells = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const rows = Array.from({ length: m }, () => new SegmentTree(n));
  const cols = Array.from({ length: n }, () => new SegmentTree(m));

  rows[m - 1].update(n - 1, 1);
  cols[n - 1].update(m - 1, 1);

  for (let row = m - 1; row >= 0; row--) {
    for (let col = n - 1; col >= 0; col--) {
      const value = grid[row][col];

      if (!value) continue;

      const colK = Math.min(col + value, n - 1);
      const rowK = Math.min(row + value, m - 1);
      const moveRight = rows[row].query(col + 1, colK);
      const moveDown = cols[col].query(row + 1, rowK);
      const minMove = Math.min(moveRight, moveDown);

      if (minMove !== Number.MAX_SAFE_INTEGER) {
        const steps = minMove + 1;

        rows[row].update(col, steps);
        cols[col].update(row, steps);
      }
    }
  }

  const result = rows[0].query(0, 0);

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};

class SegmentTree {
  constructor(n) {
    this.n = n;
    this.tree = new Array(n * 4).fill(Number.MAX_SAFE_INTEGER);
  }

  update(index, val) {
    this.#update(0, 0, this.n - 1, index, val);
  }

  query(low, high) {
    return this.#query(0, 0, this.n - 1, low, high);
  }

  merge(index) {
    return Math.min(this.tree[index * 2 + 1], this.tree[index * 2 + 2]);
  }

  #update(index, left, right, target, val) {
    if (left === right) {
      this.tree[index] = val;
      return;
    }

    const mid = Math.floor((left + right) / 2);

    if (target <= mid) {
      this.#update(index * 2 + 1, left, mid, target, val);
    } else {
      this.#update(index * 2 + 2, mid + 1, right, target, val);
    }

    this.tree[index] = this.merge(index);
  }

  #query(index, left, right, low, high) {
    if (low <= left && high >= right) {
      return this.tree[index];
    }

    if (low > right || high < left) {
      return Number.MAX_SAFE_INTEGER;
    }

    const mid = Math.floor((left + right) / 2);
    const leftValue = this.#query(index * 2 + 1, left, mid, low, high);
    const rightValue = this.#query(index * 2 + 2, mid + 1, right, low, high);

    return Math.min(leftValue, rightValue);
  }
}
