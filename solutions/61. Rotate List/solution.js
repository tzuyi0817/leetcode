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
const rotateRight = function (head, k) {
  const nodes = [];

  while (head) {
    const { val, next } = head;

    nodes.push(val);
    head = next;
  }

  const n = nodes.length;
  const rotateTimes = k % n;
  const root = new ListNode();
  let current = root;

  for (let index = 0; index < n; index++) {
    const val = nodes[(n - rotateTimes + index) % n];

    current.next = new ListNode(val);
    current = current.next;
  }

  return root.next;
};
