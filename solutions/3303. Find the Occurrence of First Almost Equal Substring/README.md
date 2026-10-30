# [3303. Find the Occurrence of First Almost Equal Substring](https://leetcode.com/problems/find-the-occurrence-of-first-almost-equal-substring)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given two strings <code>s</code> and <code>pattern</code>.</p>

<p>A string <code>x</code> is called <strong>almost equal</strong> to <code>y</code> if you can change <strong>at most</strong> one character in <code>x</code> to make it <em>identical</em> to <code>y</code>.</p>

<p>Return the <strong>smallest</strong> <em>starting index</em> of a <span data-keyword="substring-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_t_" data-state="closed" class="">substring</button></span> in <code>s</code> that is <strong>almost equal</strong> to <code>pattern</code>. If no such index exists, return <code>-1</code>.</p>
A <strong>substring</strong> is a contiguous <b>non-empty</b> sequence of characters within a string.
<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "abcdefg", pattern = "bcdffg"</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>

<p>The substring <code>s[1..6] == "bcdefg"</code> can be converted to <code>"bcdffg"</code> by changing <code>s[4]</code> to <code>"f"</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "ababbababa", pattern = "bacaba"</span></p>

<p><strong>Output:</strong> <span class="example-io">4</span></p>

<p><strong>Explanation:</strong></p>

<p>The substring <code>s[4..9] == "bababa"</code> can be converted to <code>"bacaba"</code> by changing <code>s[6]</code> to <code>"c"</code>.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "abcd", pattern = "dba"</span></p>

<p><strong>Output:</strong> <span class="example-io">-1</span></p>
</div>

<p><strong class="example">Example 4:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "dde", pattern = "d"</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= pattern.length &lt; s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> and <code>pattern</code> consist only of lowercase English letters.</li>
</ul>

<p>&nbsp;</p>
<strong>Follow-up:</strong> Could you solve the problem if <strong>at most</strong> <code>k</code> <strong>consecutive</strong> characters can be changed?</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Z-Function`**

- Time complexity: <em>O(m+n)</em>
- Space complexity: <em>O(m+n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {string} pattern
 * @return {number}
 */
const minStartingIndex = function (s, pattern) {
  const n = s.length;
  const m = pattern.length;
  const z = zFunction(`${pattern}${s}`);
  const reversedPattern = [...pattern].toReversed().join('');
  const reversedS = [...s].toReversed().join('');
  const reversedZ = zFunction(`${reversedPattern}${reversedS}`);

  for (let index = 0; index <= n - m; index++) {
    const len = z[m + index] + reversedZ[n - index];

    if (len + 1 >= m) return index;
  }

  return -1;
};

function zFunction(s) {
  const n = s.length;
  const z = Array.from({ length: n }, () => 0);
  let left = 0;
  let right = 0;

  for (let index = 1; index < n; index++) {
    if (index < right) {
      z[index] = Math.min(z[index - left], right - index);
    }

    while (index + z[index] < n && s[z[index]] === s[index + z[index]]) {
      z[index] += 1;
    }

    if (index + z[index] > right) {
      left = index;
      right = index + z[index];
    }
  }

  return z;
}
```
