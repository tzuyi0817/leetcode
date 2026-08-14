# [3090. Maximum Length Substring With Two Occurrences](https://leetcode.com/problems/maximum-length-substring-with-two-occurrences)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content">Given a string <code>s</code>, return the <strong>maximum</strong> length of a <span data-keyword="substring" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_t_" data-state="closed" class="">substring</button></span>&nbsp;such that it contains <em>at most two occurrences</em> of each character.
<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "bcbbbcba"</span></p>

<p><strong>Output:</strong> <span class="example-io">4</span></p>

<p><strong>Explanation:</strong></p>
The following substring has a length of 4 and contains at most two occurrences of each character: <code>"bcbb<u>bcba</u>"</code>.</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "aaaa"</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>
The following substring has a length of 2 and contains at most two occurrences of each character: <code>"<u>aa</u>aa"</code>.</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= s.length &lt;= 100</code></li>
	<li><code>s</code> consists only of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Sliding Window`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const maximumLengthSubstring = function (s) {
  const n = s.length;
  const countMap = new Map();
  let left = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const char = s[index];
    const count = countMap.get(char) ?? 0;

    countMap.set(char, count + 1);

    while (countMap.get(char) > 2) {
      const leftChar = s[left];
      const leftCount = countMap.get(leftChar);

      if (leftCount === 1) {
        countMap.delete(leftChar);
      } else {
        countMap.set(leftChar, leftCount - 1);
      }

      left += 1;
    }

    const len = index - left + 1;

    result = Math.max(len, result);
  }

  return result;
};
```
