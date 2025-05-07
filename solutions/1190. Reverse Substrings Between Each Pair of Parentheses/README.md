# [1190. Reverse Substrings Between Each Pair of Parentheses](https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> that consists of lower case English letters and brackets.</p>

<p>Reverse the strings in each pair of matching parentheses, starting from the innermost one.</p>

<p>Your result should <strong>not</strong> contain any brackets.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "(abcd)"
<strong>Output:</strong> "dcba"
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "(u(love)i)"
<strong>Output:</strong> "iloveu"
<strong>Explanation:</strong> The substring "love" is reversed first, then the whole string is reversed.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "(ed(et(oc))el)"
<strong>Output:</strong> "leetcode"
<strong>Explanation:</strong> First, we reverse the substring "oc", then "etco", and finally, the whole string.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 2000</code></li>
	<li><code>s</code> only contains lower case English characters and parentheses.</li>
	<li>It is guaranteed that all parentheses are balanced.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Stack`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {string}
 */
const reverseParentheses = function (s) {
  const n = s.length;
  const stack = [];
  const pairMap = new Map();

  for (let index = 0; index < n; index++) {
    const char = s[index];

    if (char === '(') stack.push(index);
    if (char === ')') {
      const pair = stack.pop();

      pairMap.set(index, pair);
      pairMap.set(pair, index);
    }
  }

  let index = 0;
  let move = 1;
  let result = '';

  while (index < n) {
    const char = s[index];

    if (char === '(' || char === ')') {
      index = pairMap.get(index);
      move = -move;
    } else {
      result += char;
    }

    index += move;
  }
  return result;
};
```
