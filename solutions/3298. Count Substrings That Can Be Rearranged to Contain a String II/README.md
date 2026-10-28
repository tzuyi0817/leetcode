# [3298. Count Substrings That Can Be Rearranged to Contain a String II](https://leetcode.com/problems/count-substrings-that-can-be-rearranged-to-contain-a-string-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given two strings <code>word1</code> and <code>word2</code>.</p>

<p>A string <code>x</code> is called <strong>valid</strong> if <code>x</code> can be rearranged to have <code>word2</code> as a <span data-keyword="string-prefix" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_u_" data-state="closed" class="">prefix</button></span>.</p>

<p>Return the total number of <strong>valid</strong> <span data-keyword="substring-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_v_" data-state="closed" class="">substrings</button></span> of <code>word1</code>.</p>

<p><strong>Note</strong> that the memory limits in this problem are <strong>smaller</strong> than usual, so you <strong>must</strong> implement a solution with a <em>linear</em> runtime complexity.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">word1 = "bcca", word2 = "abc"</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>

<p>The only valid substring is <code>"bcca"</code> which can be rearranged to <code>"abcc"</code> having <code>"abc"</code> as a prefix.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">word1 = "abcabc", word2 = "abc"</span></p>

<p><strong>Output:</strong> <span class="example-io">10</span></p>

<p><strong>Explanation:</strong></p>

<p>All the substrings except substrings of size 1 and size 2 are valid.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">word1 = "abcabc", word2 = "aaabc"</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= word1.length &lt;= 10<sup>6</sup></code></li>
	<li><code>1 &lt;= word2.length &lt;= 10<sup>4</sup></code></li>
	<li><code>word1</code> and <code>word2</code> consist only of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Sliding Window`**

- Time complexity: <em>O(m+n)</em>
- Space complexity: <em>O(26 -> 1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const validSubstringCount = function (word1, word2) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = word1.length;
  const counts = Array.from({ length: 26 }, () => 0);
  const targetCounts = Array.from({ length: 26 }, () => 0);
  let uniqueCount = 0;
  let left = 0;
  let isValid = false;
  let result = 0;

  for (const char of word2) {
    const code = char.charCodeAt(0) - BASE_CODE;

    targetCounts[code] += 1;

    if (targetCounts[code] === 1) {
      uniqueCount += 1;
    }
  }

  for (let index = 0; index < n; index++) {
    const char = word1[index];
    const code = char.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;

    if (counts[code] === targetCounts[code]) {
      uniqueCount -= 1;
    }

    while (!uniqueCount) {
      const leftChar = word1[left];
      const leftCode = leftChar.charCodeAt(0) - BASE_CODE;

      counts[leftCode] -= 1;
      left += 1;
      isValid = true;

      if (targetCounts[leftCode] - counts[leftCode] === 1) {
        uniqueCount += 1;
      }
    }

    if (isValid) {
      result += left;
    }
  }

  return result;
};
```
