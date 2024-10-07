# [2696. Minimum String Length After Removing Substrings](https://leetcode.com/problems/minimum-string-length-after-removing-substrings)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> consisting only of <strong>uppercase</strong> English letters.</p>

<p>You can apply some operations to this string where, in one operation, you can remove <strong>any</strong> occurrence of one of the substrings <code>"AB"</code> or <code>"CD"</code> from <code>s</code>.</p>

<p>Return <em>the <strong>minimum</strong> possible length of the resulting string that you can obtain</em>.</p>

<p><strong>Note</strong> that the string concatenates after removing the substring and could produce new <code>"AB"</code> or <code>"CD"</code> substrings.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "ABFCACDB"
<strong>Output:</strong> 2
<strong>Explanation:</strong> We can do the following operations:
- Remove the substring "<u>AB</u>FCACDB", so s = "FCACDB".
- Remove the substring "FCA<u>CD</u>B", so s = "FCAB".
- Remove the substring "FC<u>AB</u>", so s = "FC".
So the resulting length of the string is 2.
It can be shown that it is the minimum length that we can obtain.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "ACBBD"
<strong>Output:</strong> 5
<strong>Explanation:</strong> We cannot do any operations on the string so the length remains the same.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 100</code></li>
	<li><code>s</code>&nbsp;consists only of uppercase English letters.</li>
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
 * @return {number}
 */
const minLength = function (s) {
  const stack = [];

  for (const letter of s) {
    if (stack.length && /AB|CD/.test(`${stack.at(-1)}${letter}`)) {
      stack.pop();
      continue;
    }
    stack.push(letter);
  }
  return stack.length;
};
```
