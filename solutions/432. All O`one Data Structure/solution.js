class Node {
    constructor(count) {
        this.count = count;
        this.keys = new Set();
        this.prev = null;
        this.next = null;
    }
}

var AllOne = function() {
    this.keyMap = new Map();
    this.countMap = new Map();
    this.head = new Node(0);
    this.tail = new Node(0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
};

AllOne.prototype.addNode = function(prevNode, node) {
    const nextNode = prevNode.next;

    prevNode.next = node;
    node.prev = prevNode;
    node.next = nextNode;
    nextNode.prev = node;
};

AllOne.prototype.removeNode = function(node) {
    const { prev: prevNode, next: nextNode } = node;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;
};

AllOne.prototype.addKeyToNode = function(prevNode, count, key) {
    if (!this.countMap.has(count)) {
        const newNode = new Node(count);

        this.countMap.set(count, newNode);
        this.addNode(prevNode, newNode);
    }
    this.countMap.get(count).keys.add(key);
}

AllOne.prototype.deleteKeyFromNode = function(node, key) {
    node.keys.delete(key);
    if (node.keys.size) return;
    this.removeNode(node);
    this.countMap.delete(node.count);
}

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.inc = function(key) {
    if (this.keyMap.has(key)) {
        const count = this.keyMap.get(key);
        const node = this.countMap.get(count);

        this.keyMap.set(key, count + 1);
        this.addKeyToNode(node, count + 1, key);
        this.deleteKeyFromNode(node, key);
        return;
    }
    this.keyMap.set(key, 1);
    this.addKeyToNode(this.head, 1, key);
};

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.dec = function(key) {
    if (!this.keyMap.has(key)) return;
    const count = this.keyMap.get(key);
    const node = this.countMap.get(count);

    if (count > 1) {
        this.keyMap.set(key, count - 1);
        this.addKeyToNode(node.prev, count - 1, key);
    }
    else this.keyMap.delete(key);
    this.deleteKeyFromNode(node, key);
};

/**
 * @return {string}
 */
AllOne.prototype.getMaxKey = function() {
    if (this.tail.prev === this.head) return '';
    return this.tail.prev.keys.values().next().value;
};

/**
 * @return {string}
 */
AllOne.prototype.getMinKey = function() {
    if (this.head.next === this.tail) return '';
    return this.head.next.keys.values().next().value;
};

/** 
 * Your AllOne object will be instantiated and called as such:
 * var obj = new AllOne()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */