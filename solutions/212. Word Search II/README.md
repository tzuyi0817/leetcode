# [212. Word Search II](https://leetcode.com/problems/word-search-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an <code>m x n</code> <code>board</code>&nbsp;of characters and a list of strings <code>words</code>, return <em>all words on the board</em>.</p>

<p>Each word must be constructed from letters of sequentially adjacent cells, where <strong>adjacent cells</strong> are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/07/search1.jpg" style="width: 322px; height: 322px;">
<pre><strong>Input:</strong> board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
<strong>Output:</strong> ["eat","oath"]
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/07/search2.jpg" style="width: 162px; height: 162px;">
<pre><strong>Input:</strong> board = [["a","b"],["c","d"]], words = ["abcb"]
<strong>Output:</strong> []
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == board.length</code></li>
	<li><code>n == board[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 12</code></li>
	<li><code>board[i][j]</code> is a lowercase English letter.</li>
	<li><code>1 &lt;= words.length &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= words[i].length &lt;= 10</code></li>
	<li><code>words[i]</code> consists of lowercase English letters.</li>
	<li>All the strings of <code>words</code> are unique.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Trie + Backtracking`**

- Time complexity: <em>O(mn\*max(words[i].length))</em>
- Space complexity: <em>O(words[i])</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
const findWords = function (board, words) {
  const m = board.length;
  const n = board[0].length;
  const result = [];
  const trie = { children: new Map() };
  const backtracking = (row, col, node = trie) => {
    if (row < 0 || col < 0 || row >= m || col >= n) return;
    const value = board[row][col];
    const nextNode = node.children.get(value);

    if (value === '#' || !nextNode) return;
    if (nextNode.word) {
      result.push(nextNode.word);
      nextNode.word = null;
    }
    if (!nextNode.children.size) {
      node.children.delete(value);
      return;
    }
    board[row][col] = '#';
    backtracking(row + 1, col, nextNode);
    backtracking(row - 1, col, nextNode);
    backtracking(row, col + 1, nextNode);
    backtracking(row, col - 1, nextNode);
    board[row][col] = value;
  };

  for (const word of words) {
    let node = trie;

    for (const char of word) {
      const nextNode = node.children.get(char) ?? { children: new Map() };

      node.children.set(char, nextNode);
      node = nextNode;
    }
    node.word = word;
  }
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      backtracking(row, col);
    }
  }
  return result;
};
```
