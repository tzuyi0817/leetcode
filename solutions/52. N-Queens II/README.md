# [52. N-Queens II](https://leetcode.com/problems/n-queens-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>The <strong>n-queens</strong> puzzle is the problem of placing <code>n</code> queens on an <code>n x n</code> chessboard such that no two queens attack each other.</p>

<p>Given an integer <code>n</code>, return <em>the number of distinct solutions to the&nbsp;<strong>n-queens puzzle</strong></em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/queens.jpg" style="width: 600px; height: 268px;">
<pre><strong>Input:</strong> n = 4
<strong>Output:</strong> 2
<strong>Explanation:</strong> There are two distinct solutions to the 4-queens puzzle as shown.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 1
<strong>Output:</strong> 1
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
- Space complexity: <em>O(2n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {number}
 */
const totalNQueens = function (n) {
  const cols = Array(n).fill(false);
  const diagonals = Array(n * 2).fill(false);
  const inverseDiagonals = Array(n * 2).fill(false);
  const placementQueen = row => {
    if (row === n) return 1;
    let result = 0;

    for (let col = 0; col < n; col++) {
      const diag1 = col - row + n;
      const diag2 = col + row;

      if (cols[col] || diagonals[diag1] || inverseDiagonals[diag2]) continue;
      cols[col] = diagonals[diag1] = inverseDiagonals[diag2] = true;
      result += placementQueen(row + 1);
      cols[col] = diagonals[diag1] = inverseDiagonals[diag2] = false;
    }
    return result;
  };

  return placementQueen(0);
};
```
