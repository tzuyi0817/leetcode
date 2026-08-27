# [3720. Lexicographically Smallest Permutation Greater Than Target](https://leetcode.com/problems/lexicographically-smallest-permutation-greater-than-target)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given two strings <code>s</code> and <code>target</code>, both having length <code>n</code>, consisting of lowercase English letters.</p>

<p>Return the <strong>lexicographically smallest <span data-keyword="permutation-string" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_t_" data-state="closed" class="">permutation</button></span></strong> of <code>s</code> that is <strong>strictly</strong> greater than <code>target</code>. If no permutation of <code>s</code> is lexicographically strictly greater than <code>target</code>, return an empty string.</p>

<p>A string <code>a</code> is <strong>lexicographically strictly greater </strong>than a string <code>b</code> (of the same length) if in the first position where <code>a</code> and <code>b</code> differ, string <code>a</code> has a letter that appears later in the alphabet than the corresponding letter in <code>b</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "abc", target = "bba"</span></p>

<p><strong>Output:</strong> <span class="example-io">"bca"</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The permutations of <code>s</code> (in lexicographical order) are <code>"abc"</code>, <code>"acb"</code>, <code>"bac"</code>, <code>"bca"</code>, <code>"cab"</code>, and <code>"cba"</code>.</li>
	<li>The lexicographically smallest permutation that is strictly greater than <code>target</code> is <code>"bca"</code>.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "leet", target = "code"</span></p>

<p><strong>Output:</strong> <span class="example-io">"eelt"</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The permutations of <code>s</code> (in lexicographical order) are <code>"eelt"</code>, <code>"eetl"</code>, <code>"elet"</code>, <code>"elte"</code>, <code>"etel"</code>, <code>"etle"</code>, <code>"leet"</code>, <code>"lete"</code>, <code>"ltee"</code>, <code>"teel"</code>, <code>"tele"</code>, and <code>"tlee"</code>.</li>
	<li>The lexicographically smallest permutation that is strictly greater than <code>target</code> is <code>"eelt"</code>.</li>
</ul>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "baba", target = "bbaa"</span></p>

<p><strong>Output:</strong> <span class="example-io">""</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The permutations of <code>s</code> (in lexicographical order) are <code>"aabb"</code>, <code>"abab"</code>, <code>"abba"</code>, <code>"baab"</code>, <code>"baba"</code>, and <code>"bbaa"</code>.</li>
	<li>None of them is lexicographically strictly greater than <code>target</code>. Therefore, the answer is <code>""</code>.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length == target.length &lt;= 300</code></li>
	<li><code>s</code> and <code>target</code> consist of only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

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
const lexGreaterPermutation = function (s, target) {
  const n = target.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const originCounts = Array.from({ length: 26 }, () => 0);

  for (const char of s) {
    const code = char.charCodeAt(0) - BASE_CODE;

    originCounts[code] += 1;
  }

  const getPossibleCounts = end => {
    const counts = [...originCounts];

    for (let index = 0; index < end; index++) {
      const code = target[index].charCodeAt(0) - BASE_CODE;

      counts[code] -= 1;

      if (counts[code] < 0) return null;
    }

    return counts;
  };

  const getBiggerCode = (counts, targetCode) => {
    for (let code = targetCode + 1; code < 26; code++) {
      if (!counts[code]) continue;

      return code;
    }

    return -1;
  };

  for (let index = n - 1; index >= 0; index--) {
    const counts = getPossibleCounts(index);

    if (!counts) continue;

    const code = target[index].charCodeAt(0) - BASE_CODE;
    const biggerCode = getBiggerCode(counts, code);

    if (biggerCode === -1) continue;

    const biggerChar = String.fromCharCode(biggerCode + BASE_CODE);
    const prefix = `${target.slice(0, index)}${biggerChar}`;
    let suffix = '';

    counts[biggerCode] -= 1;

    for (let code = 0; code < 26; code++) {
      const count = counts[code];

      if (!count) continue;

      const char = String.fromCharCode(code + BASE_CODE);

      suffix += char.repeat(count);
    }

    return `${prefix}${suffix}`;
  }

  return '';
};
```
