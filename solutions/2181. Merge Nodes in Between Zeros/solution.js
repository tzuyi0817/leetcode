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
const mergeNodes = function (head) {
  const root = new ListNode(0, head);
  let node = root;
  let current = head;
  let sum = 0;

  while (current) {
    if (current.val) {
      sum += current.val;
    } else if (sum) {
      node.next.val = sum;
      node = node.next;
      sum = 0;
    }
    current = current.next;
  }
  node.next = null;

  return root.next;
};
