/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    const groups = [];
    const reverseNodes = (node, nextNode) => {
        const nodes = [];
        
        for (let kth = 1; kth <= k; kth++) {
            nodes.push(node);
            node = node.next;
        }
        nodes[0].next = nextNode;
        let previous = nodes[0];
        
        for (let index = 1; index < nodes.length; index++) {
            nodes[index].next = previous;
            previous = nodes[index];
        }
        return previous;
    };
    let current = head;
    let kth = 0;

    while (current) {
        kth += 1;
        if (kth === 1) groups.push(current);
        if (kth === k) kth = 0;
        current = current.next;
    }
    let nextNode = kth && kth < k ? groups.pop() : null;

    for (let index = groups.length - 1; index >= 0; index--) {
        nextNode = reverseNodes(groups[index], nextNode);
    }
    return nextNode;
};
