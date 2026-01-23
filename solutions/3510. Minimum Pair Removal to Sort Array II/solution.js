/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumPairRemoval = function (nums) {
  const n = nums.length;
  const list = new DoublyLinked();
  const merged = Array.from({ length: n }, () => false);
  const minHeap = new PriorityQueue((a, b) => {
    if (a.cost === b.cost) return a.first.left - b.first.left;

    return a.cost - b.cost;
  });
  let decreaseCount = 0;
  let count = 0;

  list.insertLast(new Node(nums[0], 0));

  for (let i = 1; i < nums.length; i++) {
    list.insertLast(new Node(nums[i], i));

    const curr = list.tail();

    minHeap.enqueue({
      first: curr.getPrev(),
      second: curr,
      cost: nums[i] + nums[i - 1],
    });

    if (nums[i - 1] > nums[i]) {
      decreaseCount++;
    }
  }

  while (decreaseCount > 0) {
    const { first, second, cost } = minHeap.dequeue();

    if (merged[first.left] || merged[second.left] || first.value + second.value !== cost) {
      continue;
    }

    count++;

    if (first.value > second.value) {
      decreaseCount--;
    }

    const prev = first.getPrev();
    const next = second.getNext();

    if (prev) {
      if (prev.value > first.value && prev.value <= cost) {
        decreaseCount--;
      }
      if (prev.value <= first.value && prev.value > cost) {
        decreaseCount++;
      }

      minHeap.enqueue({
        first: prev,
        second: first,
        cost: prev.value + cost,
      });
    }

    if (next) {
      if (second.value > next.value && cost <= next.value) {
        decreaseCount--;
      }
      if (second.value <= next.value && cost > next.value) {
        decreaseCount++;
      }

      minHeap.enqueue({
        first,
        second: next,
        cost: cost + next.value,
      });
    }

    list.remove(second);
    first.value = cost;
    merged[second.left] = true;
  }

  return count;
};

class Node {
  constructor(value, left) {
    this.value = value;
    this.left = left;
    this.prev = null;
    this.next = null;
  }

  getPrev() {
    return this.prev;
  }

  getNext() {
    return this.next;
  }
}

class DoublyLinked {
  headNode = null;
  tailNode = null;
  size = 0;

  head() {
    return this.headNode;
  }

  tail() {
    return this.tailNode;
  }

  insertLast(node) {
    if (this.headNode) {
      node.prev = this.tailNode;
      this.tailNode.next = node;
      this.tailNode = node;
    } else {
      this.headNode = node;
      this.tailNode = node;
    }

    this.size++;
  }

  remove(node) {
    if (!node) return;

    const prev = node.prev;
    const next = node.next;

    if (prev) {
      prev.next = next;
    } else {
      this.headNode = next;
    }

    if (next) {
      next.prev = prev;
    } else {
      this.tailNode = prev;
    }

    node.prev = null;
    node.next = null;
    this.size--;
  }
}
