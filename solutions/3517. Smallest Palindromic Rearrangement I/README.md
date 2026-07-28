# [3517. Smallest Palindromic Rearrangement I](https://leetcode.com/problems/smallest-palindromic-rearrangement-i)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a <strong><span data-keyword="palindrome-string" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_23_" data-state="closed" class="">palindromic</button></span></strong> string <code>s</code>.</p>

<p>Return the <strong><span data-keyword="lexicographically-smaller-string" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_24_" data-state="closed" class="">lexicographically smallest</button></span></strong> palindromic <span data-keyword="permutation-string" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_25_" data-state="closed" class="">permutation</button></span> of <code>s</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "z"</span></p>

<p><strong>Output:</strong> <span class="example-io">"z"</span></p>

<p><strong>Explanation:</strong></p>

<p>A string of only one character is already the lexicographically smallest palindrome.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "babab"</span></p>

<p><strong>Output:</strong> <span class="example-io">"abbba"</span></p>

<p><strong>Explanation:</strong></p>

<p>Rearranging <code>"babab"</code> → <code>"abbba"</code> gives the smallest lexicographic palindrome.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "daccad"</span></p>

<p><strong>Output:</strong> <span class="example-io">"acddca"</span></p>

<p><strong>Explanation:</strong></p>

<p>Rearranging <code>"daccad"</code> → <code>"acddca"</code> gives the smallest lexicographic palindrome.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists of lowercase English letters.</li>
	<li><code>s</code> is guaranteed to be palindromic.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Counting Sort`**

- Time complexity: <em>O(26+n)</em>
- Space complexity: <em>O(26 -> 1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {string}
 */
const smallestPalindrome = function (s) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const counts = Array.from({ length: 26 }, () => 0);
  let prefix = '';
  let suffix = '';
  let middle = '';

  for (const char of s) {
    const code = char.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;
  }

  for (let code = 0; code < 26; code++) {
    const count = counts[code];

    if (!count) continue;

    const char = String.fromCharCode(code + BASE_CODE);
    const half = Math.floor(count / 2);
    const target = char.repeat(half);

    if (count % 2) {
      middle = char;
    }

    prefix += target;
    suffix = `${target}${suffix}`;
  }

  return `${prefix}${middle}${suffix}`;
};
```
