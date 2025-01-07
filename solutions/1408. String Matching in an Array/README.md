# [1408. String Matching in an Array](https://leetcode.com/problems/string-matching-in-an-array)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an array of string <code>words</code>, return <em>all strings in </em><code>words</code><em> that is a <strong>substring</strong> of another word</em>. You can return the answer in <strong>any order</strong>.</p>

<p>A <strong>substring</strong> is a contiguous sequence of characters within a string</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> words = ["mass","as","hero","superhero"]
<strong>Output:</strong> ["as","hero"]
<strong>Explanation:</strong> "as" is substring of "mass" and "hero" is substring of "superhero".
["hero","as"] is also a valid answer.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> words = ["leetcode","et","code"]
<strong>Output:</strong> ["et","code"]
<strong>Explanation:</strong> "et", "code" are substring of "leetcode".
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> words = ["blue","green","bu"]
<strong>Output:</strong> []
<strong>Explanation:</strong> No string of words is substring of another string.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= words.length &lt;= 100</code></li>
	<li><code>1 &lt;= words[i].length &lt;= 30</code></li>
	<li><code>words[i]</code> contains only lowercase English letters.</li>
	<li>All the strings of <code>words</code> are <strong>unique</strong>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Brute Force`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} words
 * @return {string[]}
 */
const stringMatching = function (words) {
  const n = words.length;
  const memo = [];
  const result = new Set();

  words.sort((a, b) => b.length - a.length);

  for (const word of words) {
    for (const memoWord of memo) {
      if (word.length === memoWord.length || !memoWord.includes(word)) continue;

      result.add(word);
    }
    memo.push(word);
  }
  return [...result];
};
```
