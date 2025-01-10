# [916. Word Subsets](https://leetcode.com/problems/word-subsets)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given two string arrays <code>words1</code> and <code>words2</code>.</p>

<p>A string <code>b</code> is a <strong>subset</strong> of string <code>a</code> if every letter in <code>b</code> occurs in <code>a</code> including multiplicity.</p>

<ul>
	<li>For example, <code>"wrr"</code> is a subset of <code>"warrior"</code> but is not a subset of <code>"world"</code>.</li>
</ul>

<p>A string <code>a</code> from <code>words1</code> is <strong>universal</strong> if for every string <code>b</code> in <code>words2</code>, <code>b</code> is a subset of <code>a</code>.</p>

<p>Return an array of all the <strong>universal</strong> strings in <code>words1</code>. You may return the answer in <strong>any order</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["e","o"]
<strong>Output:</strong> ["facebook","google","leetcode"]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["l","e"]
<strong>Output:</strong> ["apple","google","leetcode"]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= words1.length, words2.length &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= words1[i].length, words2[i].length &lt;= 10</code></li>
	<li><code>words1[i]</code> and <code>words2[i]</code> consist only of lowercase English letters.</li>
	<li>All the strings of <code>words1</code> are <strong>unique</strong>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Map`**

- Time complexity: <em>O(m⋅l1)+O(n⋅l2)</em>
  - m: `words1.length`
  - n: `words2.length`
  - l1: `words1[i]` max length
  - l2: `words2[i]` max length
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {string[]}
 */
const wordSubsets = function (words1, words2) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const subset = Array.from({ length: 26 }, () => 0);

  const calculateSubset = word => {
    const result = Array.from({ length: 26 }, () => 0);

    for (const letter of word) {
      const code = letter.charCodeAt(0) - BASE_CODE;

      result[code] += 1;
    }
    return result;
  };

  for (const word of words2) {
    const currentSubset = calculateSubset(word);

    for (let code = 0; code < 26; code++) {
      subset[code] = Math.max(currentSubset[code], subset[code]);
    }
  }

  const result = [];

  const isUniversal = currentSubset => {
    for (let code = 0; code < 26; code++) {
      if (currentSubset[code] < subset[code]) return false;
    }
    return true;
  };

  for (const word of words1) {
    const currentSubset = calculateSubset(word);

    if (isUniversal(currentSubset)) {
      result.push(word);
    }
  }
  return result;
};
```
