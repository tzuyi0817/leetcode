# [301. Remove Invalid Parentheses](https://leetcode.com/problems/remove-invalid-parentheses)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>s</code> that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid.</p>

<p>Return <em>a list of <strong>unique strings</strong> that are valid with the minimum number of removals</em>. You may return the answer in <strong>any order</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "()())()"
<strong>Output:</strong> ["(())()","()()()"]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "(a)())()"
<strong>Output:</strong> ["(a())()","(a)()()"]
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = ")("
<strong>Output:</strong> [""]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 25</code></li>
	<li><code>s</code> consists of lowercase English letters and parentheses <code>'('</code> and <code>')'</code>.</li>
	<li>There will be at most <code>20</code> parentheses in <code>s</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search`**

- Time complexity: <em>O(2<sup>n</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {string[]}
 */
const removeInvalidParentheses = function (s) {
  const isValid = str => {
    let left = 0;

    for (const char of str) {
      if (char === '(') left += 1;
      if (char === ')') left -= 1;
      if (left < 0) return false;
    }
    return left === 0;
  };

  if (isValid(s)) return [s];
  const result = [];
  let queue = new Set([s]);

  while (queue.size) {
    const next = new Set();

    for (const str of queue) {
      for (let index = 0; index < str.length; index++) {
        const current = str[index];

        if (current !== '(' && current !== ')') continue;
        const substr = `${str.slice(0, index)}${str.slice(index + 1)}`;

        if (next.has(substr)) continue;
        if (isValid(substr)) result.push(substr);
        next.add(substr);
      }
    }
    if (result.length) return result;
    queue = next;
  }
  return [];
};
```
