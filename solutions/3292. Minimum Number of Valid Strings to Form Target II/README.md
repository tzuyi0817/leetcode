# [3292. Minimum Number of Valid Strings to Form Target II](https://leetcode.com/problems/minimum-number-of-valid-strings-to-form-target-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given an array of strings <code>words</code> and a string <code>target</code>.</p>

<p>A string <code>x</code> is called <strong>valid</strong> if <code>x</code> is a <span data-keyword="string-prefix" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_t_" data-state="closed" class="">prefix</button></span> of <strong>any</strong> string in <code>words</code>.</p>

<p>Return the <strong>minimum</strong> number of <strong>valid</strong> strings that can be <em>concatenated</em> to form <code>target</code>. If it is <strong>not</strong> possible to form <code>target</code>, return <code>-1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">words = ["abc","aaaaa","bcdef"], target = "aabcdabc"</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<p>The target string can be formed by concatenating:</p>

<ul>
	<li>Prefix of length 2 of <code>words[1]</code>, i.e. <code>"aa"</code>.</li>
	<li>Prefix of length 3 of <code>words[2]</code>, i.e. <code>"bcd"</code>.</li>
	<li>Prefix of length 3 of <code>words[0]</code>, i.e. <code>"abc"</code>.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">words = ["abababab","ab"], target = "ababaababa"</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>The target string can be formed by concatenating:</p>

<ul>
	<li>Prefix of length 5 of <code>words[0]</code>, i.e. <code>"ababa"</code>.</li>
	<li>Prefix of length 5 of <code>words[0]</code>, i.e. <code>"ababa"</code>.</li>
</ul>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">words = ["abcdef"], target = "xyz"</span></p>

<p><strong>Output:</strong> <span class="example-io">-1</span></p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= words.length &lt;= 100</code></li>
	<li><code>1 &lt;= words[i].length &lt;= 5 * 10<sup>4</sup></code></li>
	<li>The input is generated such that <code>sum(words[i].length) &lt;= 10<sup>5</sup></code>.</li>
	<li><code>words[i]</code> consists only of lowercase English letters.</li>
	<li><code>1 &lt;= target.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>target</code> consists only of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Greedy`**

- Time complexity: <em>O(target.length\*n+S)</em>
  - `S` is the total length of all words
- Space complexity: <em>O(target.length\*n+S)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} words
 * @param {string} target
 * @return {number}
 */
const minValidStrings = function (words, target) {
  const n = words.length;
  const lpsList = [];
  let unmatchedPrefix = target.length;
  let result = 0;

  for (const word of words) {
    const lps = getLPS(`${word}#${target}`);

    lpsList.push(lps);
  }

  while (unmatchedPrefix) {
    let maxMatchSuffix = 0;

    for (let index = 0; index < n; index++) {
      const { length } = words[index];
      const matchSuffix = lpsList[index][length + unmatchedPrefix];

      maxMatchSuffix = Math.max(maxMatchSuffix, matchSuffix);
    }

    if (!maxMatchSuffix) return -1;

    unmatchedPrefix -= maxMatchSuffix;
    result += 1;
  }

  return result;
};

function getLPS(pattern) {
  const n = pattern.length;
  const lps = new Array(n).fill(0);
  let left = 0;

  for (let index = 1; index < n; index++) {
    while (left > 0 && pattern[index] !== pattern[left]) {
      left = lps[left - 1];
    }

    if (pattern[index] === pattern[left]) {
      left += 1;
      lps[index] = left;
    }
  }

  return lps;
}
```
