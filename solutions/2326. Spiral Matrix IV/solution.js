/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number} m
 * @param {number} n
 * @param {ListNode} head
 * @return {number[][]}
 */
var spiralMatrix = function(m, n, head) {
    const result = Array(m).fill('').map(_ => Array(n).fill(-1));
    const move = { row: 0, col: 1 };
    let current = head;
    let row = 0;
    let col = 0;

    const checkMove = (row, col) => {
        const nextRow = row + move.row;
        const nextCol = col + move.col;
        const nextVal = result[nextRow]?.[nextCol];

        if (nextVal === -1) return;
        const isMoveRow = move.row !== 0;

        if (isMoveRow) {
            move.col = move.row > 0 ? -1 : 1;
            move.row = 0;
        } else {
            move.row = move.col > 0 ? 1 : -1;
            move.col = 0;
        }
    };

    while (current) {
        result[row][col] = current.val;
        checkMove(row, col);
        row += move.row;
        col += move.col;
        current = current.next;
    }
    return result;
};