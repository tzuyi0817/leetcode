class Node {
  left = null;
  right = null;
  count = 0;
}

const CountIntervals = function () {
  this.root = new Node();
};

/**
 * @param {number} left
 * @param {number} right
 * @return {void}
 */
CountIntervals.prototype.add = function (left, right) {
  this.addInterval(this.root, 1, 10 ** 9, left, right);
};

CountIntervals.prototype.addInterval = function (node, left, right, intervalLeft, intervalRight) {
  if (left > intervalRight || right < intervalLeft) return node;

  if (!node) {
    node = new Node();
  }

  const interval = right - left + 1;

  if (node.count === interval) return node;

  if (left >= intervalLeft && right <= intervalRight) {
    node.count = interval;

    return node;
  }

  const mid = Math.floor((left + right) / 2);

  node.left = this.addInterval(node.left, left, mid, intervalLeft, intervalRight);
  node.right = this.addInterval(node.right, mid + 1, right, intervalLeft, intervalRight);
  node.count = (node.left?.count ?? 0) + (node.right?.count ?? 0);

  return node;
};

/**
 * @return {number}
 */
CountIntervals.prototype.count = function () {
  return this.root.count;
};

/**
 * Your CountIntervals object will be instantiated and called as such:
 * var obj = new CountIntervals()
 * obj.add(left,right)
 * var param_2 = obj.count()
 */
