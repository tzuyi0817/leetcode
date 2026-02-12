# [3713. Longest Balanced Substring I](https://leetcode.com/problems/longest-balanced-substring-i)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> consisting of lowercase English letters.</p>

<p>A <strong><span data-keyword="substring-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1k:" data-state="closed" class="">substring</button></span></strong> of <code>s</code> is called <strong>balanced</strong> if all <strong>distinct</strong> characters in the <strong>substring</strong> appear the <strong>same</strong> number of times.</p>

<p>Return the <strong>length</strong> of the <strong>longest balanced substring</strong> of <code>s</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "abbac"</span></p>

<p><strong>Output:</strong> <span class="example-io">4</span></p>

<p><strong>Explanation:</strong></p>

<p>The longest balanced substring is <code>"abba"</code> because both distinct characters <code>'a'</code> and <code>'b'</code> each appear exactly 2 times.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "zzabccy"</span></p>

<p><strong>Output:</strong> <span class="example-io">4</span></p>

<p><strong>Explanation:</strong></p>

<p>The longest balanced substring is <code>"zabc"</code> because the distinct characters <code>'z'</code>, <code>'a'</code>, <code>'b'</code>, and <code>'c'</code> each appear exactly 1 time.​​​​​​​</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "aba"</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p><strong>​​​​​​​</strong>One of the longest balanced substrings is <code>"ab"</code> because both distinct characters <code>'a'</code> and <code>'b'</code> each appear exactly 1 time. Another longest balanced substring is <code>"ba"</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 1000</code></li>
	<li><code>s</code> consists of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(26 -> 1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const longestBalanced = function (s) {
  const n = s.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  let result = 0;

  const isBalance = counts => {
    let targetCount = 0;

    for (const count of counts) {
      if (!count) continue;

      if (!targetCount) {
        targetCount = count;
      }

      if (count !== targetCount) return false;
    }

    return true;
  };

  for (let a = 0; a < n; a++) {
    const counts = new Array(26).fill(0);

    for (let b = a; b < n; b++) {
      const code = s[b].charCodeAt(0) - BASE_CODE;

      counts[code] += 1;

      if (isBalance(counts)) {
        const len = b - a + 1;

        result = Math.max(len, result);
      }
    }
  }

  return result;
};
```
