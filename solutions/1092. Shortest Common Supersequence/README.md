# [1092. Shortest Common Supersequence](https://leetcode.com/problems/shortest-common-supersequence)

## Description

<div class="elfjS" data-track-load="description_content">
  <p>Given two strings <code>str1</code> and <code>str2</code>, return <em>the shortest string that has both </em><code>str1</code><em> and </em><code>str2</code><em> as <strong>subsequences</strong></em>. If there are multiple valid strings, return <strong>any</strong> of them.</p>

  <p>A string <code>s</code> is a <strong>subsequence</strong> of string <code>t</code> if deleting some number of characters from <code>t</code> (possibly <code>0</code>) results in the string <code>s</code>.</p>

  <p>&nbsp;</p>

  <p><strong class="example">Example 1:</strong></p>

  <pre>
    <strong>Input:</strong> str1 = "abac", str2 = "cab"
    <strong>Output:</strong> "cabac"
    <strong>Explanation:</strong> 
    str1 = "abac" is a subsequence of "cabac" because we can delete the first "c".
    str2 = "cab" is a subsequence of "cabac" because we can delete the last "ac".
    The answer provided is the shortest such string that satisfies these properties.
  </pre>

  <p><strong class="example">Example 2:</strong></p>

  <pre>
    <strong>Input:</strong> str1 = "aaaaaaaa", str2 = "aaaaaaaa"
    <strong>Output:</strong> "aaaaaaaa"
  </pre>

  <p>&nbsp;</p>

  <p><strong>Constraints:</strong></p>

  <ul>
    <li><code>1 &lt;= str1.length, str2.length &lt;= 1000</code></li>
    <li><code>str1</code> and <code>str2</code> consist of lowercase English letters.</li>
  </ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
const shortestCommonSupersequence = function (str1, str2) {
  const m = str1.length;
  const n = str2.length;
  let lcs = Array.from({ length: n + 1 }, () => '');

  for (const letter of str1) {
    const nextLcs = new Array(n + 1).fill('');

    for (let index = 1; index <= n; index++) {
      const prevSub = lcs[index];
      const currentSub = nextLcs[index - 1];

      if (letter === str2[index - 1]) {
        nextLcs[index] = lcs[index - 1] + letter;
      } else {
        nextLcs[index] = prevSub.length > currentSub.length ? prevSub : currentSub;
      }
    }

    lcs = nextLcs;
  }

  let a = 0;
  let b = 0;
  let commonSubseq = '';

  for (const letter of lcs[n]) {
    while (a < m && str1[a] !== letter) {
      commonSubseq += str1[a];
      a += 1;
    }

    while (b < n && str2[b] !== letter) {
      commonSubseq += str2[b];
      b += 1;
    }

    commonSubseq += letter;
    a += 1;
    b += 1;
  }

  return `${commonSubseq}${str1.slice(a)}${str2.slice(b)}`;
};
```
