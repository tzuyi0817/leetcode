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
const insertGreatestCommonDivisors = function (head) {
  let current = head;
  let previousVal = head.val;

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  while (current.next) {
    const { next } = current;

    current.next = new ListNode(gcd(previousVal, next.val), next);
    previousVal = next.val;
    current = next;
  }
  return head;
};
