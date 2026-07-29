# [3518. Smallest Palindromic Rearrangement II](https://leetcode.com/problems/smallest-palindromic-rearrangement-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p data-end="332" data-start="99">You are given a <strong><span data-keyword="palindrome-string" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_1n_" data-state="closed" class="">palindromic</button></span></strong> string <code>s</code> and an integer <code>k</code>.</p>

<p>Return the <strong>k-th</strong> <strong><span data-keyword="lexicographically-smaller-string" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_1o_" data-state="closed" class="">lexicographically smallest</button></span></strong> palindromic <span data-keyword="permutation-string" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_1p_" data-state="closed" class="">permutation</button></span> of <code>s</code>. If there are fewer than <code>k</code> distinct palindromic permutations, return an empty string.</p>

<p><strong>Note:</strong> Different rearrangements that yield the same palindromic string are considered identical and are counted once.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "abba", k = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">"baab"</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The two distinct palindromic rearrangements of <code>"abba"</code> are <code>"abba"</code> and <code>"baab"</code>.</li>
	<li>Lexicographically, <code>"abba"</code> comes before <code>"baab"</code>. Since <code>k = 2</code>, the output is <code>"baab"</code>.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "aa", k = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">""</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>There is only one palindromic rearrangement: <code data-end="1112" data-start="1106">"aa"</code>.</li>
	<li>The output is an empty string since <code>k = 2</code> exceeds the number of possible rearrangements.</li>
</ul>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "bacab", k = 1</span></p>

<p><strong>Output:</strong> <span class="example-io">"abcba"</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The two distinct palindromic rearrangements of <code>"bacab"</code> are <code>"abcba"</code> and <code>"bacab"</code>.</li>
	<li>Lexicographically, <code>"abcba"</code> comes before <code>"bacab"</code>. Since <code>k = 1</code>, the output is <code>"abcba"</code>.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
	<li><code>s</code> consists of lowercase English letters.</li>
	<li><code>s</code> is guaranteed to be palindromic.</li>
	<li><code>1 &lt;= k &lt;= 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Combinatorics`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
const smallestPalindrome = function (s, k) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const counts = Array.from({ length: 26 }, () => 0);
  const halfCounts = Array.from({ length: 26 }, () => 0);
  let middleChar = '';

  for (const char of s) {
    const code = char.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;
  }

  for (let code = 0; code < 26; code++) {
    const count = counts[code];

    if (count % 2) {
      middleChar = String.fromCharCode(code + BASE_CODE);
    }

    halfCounts[code] = Math.floor(count / 2);
  }

  if (getCountArrangements(halfCounts, k + 1) < k) {
    return '';
  }

  const n = s.length;
  const left = [];
  let len = Math.floor(n / 2);

  while (len) {
    for (let code = 0; code < 26; code++) {
      if (!halfCounts[code]) continue;

      halfCounts[code] -= 1;

      const arrangements = getCountArrangements(halfCounts, k + 1);

      if (arrangements >= k) {
        const char = String.fromCharCode(code + BASE_CODE);

        left.push(char);
        break;
      }

      halfCounts[code] += 1;
      k -= arrangements;
    }

    len -= 1;
  }

  return `${left.join('')}${middleChar}${left.toReversed().join('')}`;
};

function getCountArrangements(counts, max) {
  let total = counts.reduce((sum, count) => sum + count);
  let result = 1;

  for (const count of counts) {
    if (!count) continue;

    result *= nCk(total, count, max);

    if (result >= max) {
      return max;
    }

    total -= count;
  }

  return result;
}

function nCk(n, k, max) {
  const limit = Math.min(k, n - k);
  let result = 1;

  for (let index = 1; index <= limit; index++) {
    result = Math.floor((result * (n - index + 1)) / index);

    if (result >= max) {
      return max;
    }
  }

  return result;
}
```
