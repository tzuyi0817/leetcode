# [1316. Distinct Echo Substrings](https://leetcode.com/problems/distinct-echo-substrings)

## Description

<div class="elfjS" data-track-load="description_content"><p>Return the number of <strong>distinct</strong> non-empty substrings of <code>text</code>&nbsp;that can be written as the concatenation of some string with itself (i.e. it can be written as <code>a + a</code>&nbsp;where <code>a</code> is some string).</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> text = "abcabcabc"
<strong>Output:</strong> 3
<b>Explanation: </b>The 3 substrings are "abcabc", "bcabca" and "cabcab".
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> text = "leetcodeleetcode"
<strong>Output:</strong> 2
<b>Explanation: </b>The 2 substrings are "ee" and "leetcodeleetcode".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= text.length &lt;= 2000</code></li>
	<li><code>text</code>&nbsp;has only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Sliding Window`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} text
 * @return {number}
 */
const distinctEchoSubstrings = function (text) {
  const n = text.length;
  const distinctSubStr = new Set();

  for (let length = 1; length <= Math.floor(n / 2); length++) {
    let left = 0;
    let sameCount = 0;

    for (let index = length; index < n; index++) {
      const letter = text[index];

      sameCount = text[left] === letter ? sameCount + 1 : 0;
      left += 1;

      if (sameCount !== length) continue;
      const subStr = text.slice(index - length + 1, index + 1);

      distinctSubStr.add(subStr);
      sameCount -= 1;
    }
  }
  return distinctSubStr.size;
};
```
