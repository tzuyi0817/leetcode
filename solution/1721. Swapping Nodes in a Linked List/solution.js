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
var swapNodes = function(head, k) {
    let current = rightNode = head;
    let leftNode = null;
    let size = index = 0;

    while (current) {
        size += 1;
        if (size === k) leftNode = current;
        current = current.next;
    }
    while (index < size - k) {
        rightNode = rightNode.next;
        index += 1;
    }

    [leftNode.val, rightNode.val] = [rightNode.val, leftNode.val];
    return head;
};
