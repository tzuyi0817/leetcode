/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {number} a
 * @param {number} b
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeInBetween = function(list1, a, b, list2) {
    let currentNode = list1;
    let current = 0;
    let leftNode = rightNode = null;

    while (current <= b) {
        if (current === a - 1) leftNode = currentNode;
        currentNode = currentNode.next;
        current += 1;
    }
    rightNode = currentNode;
    leftNode.next = list2;
    
    while (leftNode.next) leftNode = leftNode.next;
    leftNode.next = rightNode;
    return list1;
};
