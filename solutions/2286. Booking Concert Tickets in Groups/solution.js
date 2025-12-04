class Node {
  constructor(low, high, left, right, seat, sum) {
    this.low = low;
    this.high = high;
    this.left = left;
    this.right = right;
    this.maxSeats = seat;
    this.sum = sum;
  }
}

class SegmentTree {
  constructor(n, m) {
    this.m = m;
    this.root = this.build(0, n - 1);
  }

  build(low, high) {
    if (low === high) {
      return new Node(low, high, null, null, this.m, this.m);
    }

    const mid = Math.floor((low + high) / 2);
    const left = this.build(low, mid);
    const right = this.build(mid + 1, high);
    const maxSeats = Math.max(left.maxSeats, right.maxSeats);
    const sum = left.sum + right.sum;

    return new Node(low, high, left, right, maxSeats, sum);
  }

  minRow(row, k) {
    return this.#minRow(this.root, row, k);
  }

  #minRow(node, row, k) {
    if (node.low === node.high) {
      if (node.sum < k || node.low > row) return null;

      return [node.low, this.m - node.sum];
    }

    if (node.left.maxSeats >= k) {
      return this.#minRow(node.left, row, k);
    } else {
      return this.#minRow(node.right, row, k);
    }
  }

  sumSeats(row) {
    return this.#sumSeats(this.root, 0, row);
  }

  #sumSeats(node, minRow, maxRow) {
    if (node.low === minRow && node.high === maxRow) {
      return node.sum;
    }

    const mid = Math.floor((node.low + node.high) / 2);

    if (minRow > mid) {
      return this.#sumSeats(node.right, minRow, maxRow);
    }

    if (maxRow <= mid) {
      return this.#sumSeats(node.left, minRow, maxRow);
    }

    return this.#sumSeats(node.left, minRow, mid) + this.#sumSeats(node.right, mid + 1, maxRow);
  }

  subtract(row, k) {
    this.#subtract(this.root, row, k);
  }

  #subtract(node, row, k) {
    if (!node) return;
    if (node.low === node.high) {
      node.maxSeats -= k;
      node.sum -= k;
      return;
    }

    const mid = Math.floor((node.low + node.high) / 2);

    if (row > mid) {
      this.#subtract(node.right, row, k);
    } else {
      this.#subtract(node.left, row, k);
    }

    node.maxSeats = Math.max(node.left.maxSeats, node.right.maxSeats);
    node.sum = node.left.sum + node.right.sum;
  }
}

/**
 * @param {number} n
 * @param {number} m
 */
const BookMyShow = function (n, m) {
  this.tree = new SegmentTree(n, m);
  this.seats = Array.from({ length: n }, () => m);
  this.row = 0;
};

/**
 * @param {number} k
 * @param {number} maxRow
 * @return {number[]}
 */
BookMyShow.prototype.gather = function (k, maxRow) {
  const result = this.tree.minRow(maxRow, k);

  if (!result) return [];

  const row = result[0];

  this.tree.subtract(row, k);
  this.seats[row] -= k;

  return result;
};

/**
 * @param {number} k
 * @param {number} maxRow
 * @return {boolean}
 */
BookMyShow.prototype.scatter = function (k, maxRow) {
  if (this.tree.sumSeats(maxRow) < k) return false;

  while (k) {
    if (this.seats[this.row] >= k) {
      this.tree.subtract(this.row, k);
      this.seats[this.row] -= k;
      k = 0;
    } else {
      const remainSeats = this.seats[this.row];

      this.tree.subtract(this.row, remainSeats);
      this.seats[this.row] -= remainSeats;
      k -= remainSeats;
      this.row += 1;
    }
  }

  return true;
};

/**
 * Your BookMyShow object will be instantiated and called as such:
 * var obj = new BookMyShow(n, m)
 * var param_1 = obj.gather(k,maxRow)
 * var param_2 = obj.scatter(k,maxRow)
 */
