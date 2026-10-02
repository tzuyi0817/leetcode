# [3257. Maximum Value Sum by Placing Three Rooks II](https://leetcode.com/problems/maximum-value-sum-by-placing-three-rooks-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given a <code>m x n</code> 2D array <code>board</code> representing a chessboard, where <code>board[i][j]</code> represents the <strong>value</strong> of the cell <code>(i, j)</code>.</p>

<p>Rooks in the <strong>same</strong> row or column <strong>attack</strong> each other. You need to place <em>three</em> rooks on the chessboard such that the rooks <strong>do not</strong> <strong>attack</strong> each other.</p>

<p>Return the <strong>maximum</strong> sum of the cell <strong>values</strong> on which the rooks are placed.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">board = </span>[[-3,1,1,1],[-3,1,-3,1],[-3,2,1,1]]</p>

<p><strong>Output:</strong> 4</p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/08/08/rooks2.png" style="width: 294px; height: 450px;"></p>

<p>We can place the rooks in the cells <code>(0, 2)</code>, <code>(1, 3)</code>, and <code>(2, 1)</code> for a sum of <code>1 + 1 + 2 = 4</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">board = [[1,2,3],[4,5,6],[7,8,9]]</span></p>

<p><strong>Output:</strong> <span class="example-io">15</span></p>

<p><strong>Explanation:</strong></p>

<p>We can place the rooks in the cells <code>(0, 0)</code>, <code>(1, 1)</code>, and <code>(2, 2)</code> for a sum of <code>1 + 5 + 9 = 15</code>.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">board = [[1,1,1],[1,1,1],[1,1,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<p>We can place the rooks in the cells <code>(0, 2)</code>, <code>(1, 1)</code>, and <code>(2, 0)</code> for a sum of <code>1 + 1 + 1 = 3</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= m == board.length &lt;= 500</code></li>
	<li><code>3 &lt;= n == board[i].length &lt;= 500</code></li>
	<li><code>-10<sup>9</sup> &lt;= board[i][j] &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(m)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} board
 * @return {number}
 */
const maximumValueSum = function (board) {
  const m = board.length;
  const n = board[0].length;
  const prefixTop3 = Array.from({ length: m + 1 }, () => []);
  const suffixTop3 = Array.from({ length: m + 1 }, () => []);

  const updateTop3 = (top3, col, value) => {
    const index = top3.findIndex(top => top.col === col);

    if (index === -1) {
      top3.push({ col, value });
    } else {
      if (top3[index].value < value) {
        top3[index] = { col, value };
      }
    }

    top3.sort((a, b) => b.value - a.value);

    return top3.slice(0, 3);
  };

  for (let row = 1; row <= m; row++) {
    const prevTop3 = prefixTop3[row - 1];
    let top3 = [...prevTop3];

    for (let col = 0; col < n; col++) {
      const value = board[row - 1][col];

      top3 = updateTop3(top3, col, value);
    }

    prefixTop3[row] = top3;
  }

  for (let row = m - 1; row >= 0; row--) {
    const prevTop3 = suffixTop3[row + 1];
    let top3 = [...prevTop3];

    for (let col = 0; col < n; col++) {
      const value = board[row][col];

      top3 = updateTop3(top3, col, value);
    }

    suffixTop3[row] = top3;
  }

  let result = Number.MIN_SAFE_INTEGER;

  for (let row = 0; row < m; row++) {
    const prefix = prefixTop3[row];
    const suffix = suffixTop3[row + 1];

    for (let col = 0; col < n; col++) {
      const value = board[row][col];

      for (const { value: v1, col: c1 } of prefix) {
        if (c1 === col) continue;

        for (const { value: v2, col: c2 } of suffix) {
          if (c1 === c2 || c2 === col) continue;

          const sum = value + v1 + v2;

          result = Math.max(sum, result);
        }
      }
    }
  }

  return result;
};
```
