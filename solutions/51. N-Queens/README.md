# [51. N-Queens](https://leetcode.com/problems/n-queens)

## Description

<div class="elfjS" data-track-load="description_content"><p>The <strong>n-queens</strong> puzzle is the problem of placing <code>n</code> queens on an <code>n x n</code> chessboard such that no two queens attack each other.</p>

<p>Given an integer <code>n</code>, return <em>all distinct solutions to the <strong>n-queens puzzle</strong></em>. You may return the answer in <strong>any order</strong>.</p>

<p>Each solution contains a distinct board configuration of the n-queens' placement, where <code>'Q'</code> and <code>'.'</code> both indicate a queen and an empty space, respectively.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/queens.jpg" style="width: 600px; height: 268px;">
<pre><strong>Input:</strong> n = 4
<strong>Output:</strong> [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
<strong>Explanation:</strong> There exist two distinct solutions to the 4-queens puzzle as shown above
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 1
<strong>Output:</strong> [["Q"]]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 9</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = function (n) {
  const chessBoard = Array(n)
    .fill('')
    .map(() => Array(n).fill('.'));
  const result = [];
  const isValid = current => {
    for (let row = current.row - 1; row >= 0; row--) {
      if (chessBoard[row][current.col] === 'Q') return false;
    }
    const maxOffset = Math.max(current.row, current.col);

    for (let offset = 1; offset <= maxOffset; offset++) {
      const { row, col } = current;

      if (chessBoard[row - offset]?.[col - offset] === 'Q') return false;
      if (chessBoard[row - offset]?.[col + offset] === 'Q') return false;
    }
    return true;
  };
  const placementQueen = row => {
    if (row === n) {
      result.push(chessBoard.map(row => row.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (!isValid({ row, col })) continue;
      chessBoard[row][col] = 'Q';
      placementQueen(row + 1);
      chessBoard[row][col] = '.';
    }
  };

  placementQueen(0);
  return result;
};
```
