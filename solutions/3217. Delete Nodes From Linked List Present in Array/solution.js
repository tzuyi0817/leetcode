/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number[]} nums
 * @param {ListNode} head
 * @return {ListNode}
 */
const modifiedList = function (nums, head) {
  const maxNum = Math.max(...nums);
  const exists = new Array(maxNum + 1).fill(false);
  const root = new ListNode(null, head);
  let current = root;

  for (const num of nums) {
    exists[num] = true;
  }

  while (current?.next) {
    while (exists[current.next?.val]) {
      current.next = current.next.next;
    }
    current = current.next;
  }
  return root.next;
};
