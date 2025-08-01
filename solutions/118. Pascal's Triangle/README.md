# [118. Pascal's Triangle](https://leetcode.com/problems/pascals-triangle)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an integer <code>numRows</code>, return the first numRows of <strong>Pascal's triangle</strong>.</p>

<p>In <strong>Pascal's triangle</strong>, each number is the sum of the two numbers directly above it as shown:</p>
<img alt="" src="https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif" style="height: 240px; width: 260px;">
<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> numRows = 5
<strong>Output:</strong> [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> numRows = 1
<strong>Output:</strong> [[1]]
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= numRows &lt;= 30</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} numRows
 * @return {number[][]}
 */
const generate = function (numRows) {
  const result = [[1]];

  for (let row = 2; row <= numRows; row++) {
    const prev = result.at(-1);
    const values = [1];

    for (let index = 1; index < prev.length; index++) {
      values.push(prev[index] + prev[index - 1]);
    }

    values.push(1);
    result.push(values);
  }

  return result;
};
```
