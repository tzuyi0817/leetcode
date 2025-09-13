class Node {
  constructor(key = null, value = null) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
  frequency = 1;
}

class DoublyLinkedList {
  constructor() {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  addNode(node) {
    const nextNode = this.head.next;

    this.head.next = node;
    node.prev = this.head;
    node.next = nextNode;
    nextNode.prev = node;
  }
  removeNode(node) {
    const { prev: prevNode, next: nextNode } = node;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }
  isEmpty() {
    return this.head.next === this.tail;
  }
  removeTail() {
    if (this.isEmpty()) return null;
    const node = this.tail.prev;

    this.removeNode(node);
    return node;
  }
}

const LFUCache = function (capacity) {
  this.capacity = capacity;
  this.frequencyMap = new Map();
  this.cache = new Map();
  this.minFrequency = 0;
};

LFUCache.prototype.get = function (key) {
  if (!this.cache.has(key)) return -1;
  const node = this.cache.get(key);

  this.updateNode(node);
  return node.value;
};

LFUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    const node = this.cache.get(key);

    node.value = value;
    this.updateNode(node);
    return;
  }
  if (this.cache.size === this.capacity) {
    const linkedList = this.frequencyMap.get(this.minFrequency);
    const node = linkedList.removeTail();

    this.cache.delete(node.key);
  }
  const node = new Node(key, value);

  this.cache.set(key, node);
  if (!this.frequencyMap.has(1)) {
    this.frequencyMap.set(1, new DoublyLinkedList());
  }
  this.frequencyMap.get(1).addNode(node);
  this.minFrequency = 1;
};

LFUCache.prototype.updateNode = function (node) {
  const { frequency } = node;
  const linkedList = this.frequencyMap.get(frequency);

  linkedList.removeNode(node);
  node.frequency += 1;

  if (frequency === this.minFrequency && linkedList.isEmpty()) {
    this.minFrequency += 1;
  }
  if (!this.frequencyMap.has(node.frequency)) {
    this.frequencyMap.set(node.frequency, new DoublyLinkedList());
  }
  this.frequencyMap.get(node.frequency).addNode(node);
};

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
