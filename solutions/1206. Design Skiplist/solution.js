class Node {
  constructor(val, next = null, down = null) {
    this.val = val;
    this.next = next;
    this.down = down;
  }
}

const Skiplist = function () {
  this.head = new Node(-1);
};

/**
 * @param {number} target
 * @return {boolean}
 */
Skiplist.prototype.search = function (target) {
  let current = this.head;

  while (current) {
    while (current.next?.val < target) {
      current = current.next;
    }
    if (current.next?.val === target) return true;

    current = current.down;
  }
  return false;
};

/**
 * @param {number} num
 * @return {void}
 */
Skiplist.prototype.add = function (num) {
  const nodes = [];
  let current = this.head;
  let isInsert = true;
  let down = null;

  while (current) {
    while (current.next?.val < num) {
      current = current.next;
    }
    nodes.push(current);
    current = current.down;
  }

  while (nodes.length && isInsert) {
    const node = nodes.pop();

    node.next = new Node(num, node.next, down);
    down = node.next;
    isInsert = Math.random() > 0.5;
  }
  if (!isInsert) return;

  this.head = new Node(-1, null, this.head);
};

/**
 * @param {number} num
 * @return {boolean}
 */
Skiplist.prototype.erase = function (num) {
  let current = this.head;
  let result = false;

  while (current) {
    while (current.next?.val < num) {
      current = current.next;
    }
    if (current.next?.val === num) {
      current.next = current.next.next;
      result = true;
    }
    current = current.down;
  }
  return result;
};

/**
 * Your Skiplist object will be instantiated and called as such:
 * var obj = new Skiplist()
 * var param_1 = obj.search(target)
 * obj.add(num)
 * var param_3 = obj.erase(num)
 */
