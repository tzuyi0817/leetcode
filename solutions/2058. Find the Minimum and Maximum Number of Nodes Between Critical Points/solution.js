/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
const nodesBetweenCriticalPoints = function (head) {
  let firstCriticalPoint = -1;
  let previousCriticalPoint = -1;
  let previousValue = null;
  let index = 0;
  let minDistance = Number.MAX_SAFE_INTEGER;

  while (head.next) {
    const { val, next } = head;

    if (previousValue) {
      const isMaxima = val > previousValue && val > next.val;
      const isMinima = val < previousValue && val < next.val;

      if (isMaxima || isMinima) {
        firstCriticalPoint === -1
          ? (firstCriticalPoint = index)
          : (minDistance = Math.min(minDistance, index - previousCriticalPoint));

        previousCriticalPoint = index;
      }
    }
    previousValue = val;
    head = next;
    index += 1;
  }
  if (minDistance === Number.MAX_SAFE_INTEGER) return [-1, -1];
  return [minDistance, previousCriticalPoint - firstCriticalPoint];
};
