# [22. Generate Parentheses](https://leetcode.com/problems/generate-parentheses)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>Given <code>n</code> pairs of parentheses, write a function to <em>generate all combinations of well-formed parentheses</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> n = 3
<strong>Output:</strong> ["((()))","(()())","(())()","()(())","()()()"]
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> n = 1
<strong>Output:</strong> ["()"]
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 8</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search`**

- Time complexity: <em>O(2<sup>2n</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) {
  const result = [];

  const dfs = (current, left, right) => {
    if (left === n && right === n) {
      result.push(current);

      return;
    }

    if (left < n) {
      const nextCurrent = `${current}(`;

      dfs(nextCurrent, left + 1, right);
    }

    if (left > right) {
      const nextCurrent = `${current})`;

      dfs(nextCurrent, left, right + 1);
    }
  };

  dfs('', 0, 0);

  return result;
};
```
