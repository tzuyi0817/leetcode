# [37. Sudoku Solver](https://leetcode.com/problems/sudoku-solver)

## Description

<div class="elfjS" data-track-load="description_content"><p>Write a program to solve a Sudoku puzzle by filling the empty cells.</p>

<p>A sudoku solution must satisfy <strong>all of the following rules</strong>:</p>

<ol>
	<li>Each of the digits <code>1-9</code> must occur exactly once in each row.</li>
	<li>Each of the digits <code>1-9</code> must occur exactly once in each column.</li>
	<li>Each of the digits <code>1-9</code> must occur exactly once in each of the 9 <code>3x3</code> sub-boxes of the grid.</li>
</ol>

<p>The <code>'.'</code> character indicates empty cells.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png" style="height: 250px; width: 250px;">
<pre><strong>Input:</strong> board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
<strong>Output:</strong> [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
<strong>Explanation:</strong>&nbsp;The input board is shown above and the only valid solution is shown below:

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sudoku-by-L2G-20050714_solution.svg/250px-Sudoku-by-L2G-20050714_solution.svg.png" style="height: 250px; width: 250px;">
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>board.length == 9</code></li>
	<li><code>board[i].length == 9</code></li>
	<li><code>board[i][j]</code> is a digit or <code>'.'</code>.</li>
	<li>It is <strong>guaranteed</strong> that the input board has only one solution.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking`**
- Time complexity: <em>O(NP-Complete)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    const m = board.length;
    const n = board[0].length;
    const isValid = (current, num) => {
        for (let row = 0; row < m; row++) {
            if (board[row][current.col] === `${num}`) return false;
        }
        for (let col = 0; col < n; col++) {
            if (board[current.row][col] === `${num}`) return false;
        }
        const startRow = current.row - current.row % 3;
        const startCol = current.col - current.col % 3;

        for (let row = startRow; row < startRow + 3; row++) {
            for (let col = startCol; col < startCol + 3; col++) {
                if (board[row][col] === `${num}`) return false;
            }
        }
        return true;
    };
    const solveSudokuCell = (row, col) => {
        if (row === 9) return true;
        if (col === 9) return solveSudokuCell(row + 1, 0);
        if (board[row][col] !== '.') return solveSudokuCell(row, col + 1);

        for (let num = 1; num <= 9; num++) {
            if (!isValid({ row, col }, num)) continue;
            board[row][col] = `${num}`;
            if (solveSudokuCell(row, col + 1)) return true;
            board[row][col] = '.';
        }
        return false;
    };

    solveSudokuCell(0, 0);
    return board;
};
```
