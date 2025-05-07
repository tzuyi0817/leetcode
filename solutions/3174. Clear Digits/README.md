# [3174. Clear Digits](https://leetcode.com/problems/clear-digits)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code>.</p>

<p>Your task is to remove <strong>all</strong> digits by doing this operation repeatedly:</p>

<ul>
	<li>Delete the <em>first</em> digit and the <strong>closest</strong> <b>non-digit</b> character to its <em>left</em>.</li>
</ul>

<p>Return the resulting string after removing all digits.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "abc"</span></p>

<p><strong>Output:</strong> <span class="example-io">"abc"</span></p>

<p><strong>Explanation:</strong></p>

<p>There is no digit in the string.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "cb34"</span></p>

<p><strong>Output:</strong> <span class="example-io">""</span></p>

<p><strong>Explanation:</strong></p>

<p>First, we apply the operation on <code>s[2]</code>, and <code>s</code> becomes <code>"c4"</code>.</p>

<p>Then we apply the operation on <code>s[1]</code>, and <code>s</code> becomes <code>""</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 100</code></li>
	<li><code>s</code> consists only of lowercase English letters and digits.</li>
	<li>The input is generated such that it is possible to delete all digits.</li>
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
const clearDigits = function (s) {
  const stack = [];

  for (const str of s) {
    if (Number.isNaN(Number(str))) {
      stack.push(str);
    } else {
      stack.pop();
    }
  }

  return stack.join('');
};
```
