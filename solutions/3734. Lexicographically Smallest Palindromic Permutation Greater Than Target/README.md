# [3734. Lexicographically Smallest Palindromic Permutation Greater Than Target](https://leetcode.com/problems/lexicographically-smallest-palindromic-permutation-greater-than-target)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given two strings <code>s</code> and <code>target</code>, each of length <code>n</code>, consisting of lowercase English letters.</p>

<p>Return the <strong><span data-keyword="lexicographically-smaller-string" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_1a_" data-state="closed" class="">lexicographically smallest</button></span> string</strong> that is <strong>both</strong> a <strong><span data-keyword="palindrome-string" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_1b_" data-state="closed" class="">palindromic</button></span> <span data-keyword="permutation" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_1c_" data-state="closed" class="">permutation</button></span></strong> of <code>s</code> and <strong>strictly</strong> greater than <code>target</code>. If no such permutation exists, return an empty string.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "baba", target = "abba"</span></p>

<p><strong>Output:</strong> <span class="example-io">"baab"</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The palindromic permutations of <code>s</code> (in lexicographical order) are <code>"abba"</code> and <code>"baab"</code>.</li>
	<li>The lexicographically smallest permutation that is strictly greater than <code>target</code> is <code>"baab"</code>.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "baba", target = "bbaa"</span></p>

<p><strong>Output:</strong> <span class="example-io">""</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The palindromic permutations of <code>s</code> (in lexicographical order) are <code>"abba"</code> and <code>"baab"</code>.</li>
	<li>None of them is lexicographically strictly greater than <code>target</code>. Therefore, the answer is <code>""</code>.</li>
</ul>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "abc", target = "abb"</span></p>

<p><strong>Output:</strong> <span class="example-io">""</span></p>

<p><strong>Explanation:</strong></p>

<p><code>s</code> has no palindromic permutations. Therefore, the answer is <code>""</code>.</p>
</div>

<p><strong class="example">Example 4:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "aac", target = "abb"</span></p>

<p><strong>Output:</strong> <span class="example-io">"aca"</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The only palindromic permutation of <code>s</code> is <code>"aca"</code>.</li>
	<li><code>"aca"</code> is strictly greater than <code>target</code>. Therefore, the answer is <code>"aca"</code>.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n == s.length == target.length &lt;= 300</code></li>
	<li><code>s</code> and <code>target</code> consist of only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `BackTracking`**

- Time complexity: <em>O(26n -> n)</em>
- Space complexity: <em>O(26 -> 1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {string} target
 * @return {string}
 */
const lexPalindromicPermutation = function (s, target) {
  const n = s.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const counts = Array.from({ length: 26 }, () => 0);
  let middleChar = '';

  for (const char of s) {
    const code = char.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;
  }

  for (let code = 0; code < 26; code++) {
    const count = counts[code];

    if (count % 2 === 0) continue;

    if (middleChar) return '';

    middleChar = String.fromCharCode(code + BASE_CODE);
  }

  const half = Math.floor(n / 2);
  const halfCounts = counts.map(count => Math.floor(count / 2));
  const currentPrefix = [];
  let result = '';

  const findPalindromic = (index, isTight) => {
    if (result) return;

    if (index >= half) {
      const prefix = currentPrefix.join('');
      const suffix = currentPrefix.toReversed().join('');
      const palindromic = `${prefix}${middleChar}${suffix}`;

      if (palindromic > target) {
        result = palindromic;
      }

      return;
    }

    const targetCode = target[index].charCodeAt(0) - BASE_CODE;
    const start = isTight ? targetCode : 0;

    for (let code = start; code < 26; code++) {
      if (!halfCounts[code]) continue;

      const nextTight = isTight && code === targetCode;

      halfCounts[code] -= 1;
      currentPrefix.push(String.fromCharCode(code + BASE_CODE));
      findPalindromic(index + 1, nextTight);
      currentPrefix.pop();
      halfCounts[code] += 1;

      if (result) return;
    }
  };

  findPalindromic(0, true);

  return result;
};
```
