/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
const getDecimalValue = function (head) {
  let result = 0;

  while (head) {
    result <<= 1;
    result |= head.val;
    head = head.next;
  }

  return result;
};
