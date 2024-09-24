/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
const mergeKLists = function (lists) {
  const list = new ListNode();
  const hashMap = new Map();
  let current = list;
  let maxVal = 0;
  let minVal = Number.MAX_SAFE_INTEGER;

  for (let node of lists) {
    while (node) {
      const { val, next } = node;
      const count = hashMap.get(val) ?? 0;

      hashMap.set(val, count + 1);
      node = next;
      maxVal = Math.max(val, maxVal);
      minVal = Math.min(val, minVal);
    }
  }
  for (let val = minVal; val <= maxVal; val++) {
    if (!hashMap.has(val)) continue;
    let count = hashMap.get(val);

    while (count--) {
      current.next = new ListNode(val);
      current = current.next;
    }
  }
  return list.next;
};
