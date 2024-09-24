/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseEvenLengthGroups = function (head) {
  let current = head;
  let currentGroup = 1;
  let nodeCount = 0;
  let reverseNode = null;
  let reverseStack = [];
  const reverseGroup = (node, count) => {
    if (count % 2) return;

    while (count) {
      node.val = reverseStack.pop();
      count -= 1;
      node = node.next;
    }
  };

  while (current) {
    nodeCount += 1;
    reverseStack.push(current.val);

    if (nodeCount === 1) reverseNode = current;
    if (nodeCount === currentGroup) {
      reverseGroup(reverseNode, nodeCount);
      currentGroup += 1;
      nodeCount = 0;
      reverseStack = [];
    }
    current = current.next;
  }
  if (nodeCount !== currentGroup) {
    reverseGroup(reverseNode, nodeCount);
  }
  return head;
};
