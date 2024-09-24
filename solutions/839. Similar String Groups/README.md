# [839. Similar String Groups](https://leetcode.com/problems/similar-string-groups)

## Description

<div class="elfjS" data-track-load="description_content"><p>Two strings, <code>X</code> and <code>Y</code>, are considered similar if either they are identical or we can make them equivalent by swapping at most two letters (in distinct positions) within the string <code>X</code>.</p>

<p>For example, <code>"tars"</code>&nbsp;and <code>"rats"</code>&nbsp;are similar (swapping at positions <code>0</code> and <code>2</code>), and <code>"rats"</code> and <code>"arts"</code> are similar, but <code>"star"</code> is not similar to <code>"tars"</code>, <code>"rats"</code>, or <code>"arts"</code>.</p>

<p>Together, these form two connected groups by similarity: <code>{"tars", "rats", "arts"}</code> and <code>{"star"}</code>.&nbsp; Notice that <code>"tars"</code> and <code>"arts"</code> are in the same group even though they are not similar.&nbsp; Formally, each group is such that a word is in the group if and only if it is similar to at least one other word in the group.</p>

<p>We are given a list <code>strs</code> of strings where every string in <code>strs</code> is an anagram of every other string in <code>strs</code>. How many groups are there?</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> strs = ["tars","rats","arts","star"]
<strong>Output:</strong> 2
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> strs = ["omv","ovm"]
<strong>Output:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= strs.length &lt;= 300</code></li>
	<li><code>1 &lt;= strs[i].length &lt;= 300</code></li>
	<li><code>strs[i]</code> consists of lowercase letters only.</li>
	<li>All words in <code>strs</code> have the same length and are anagrams of each other.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Union Find`**

- Time complexity: <em>O(n<sup>2</sup>\*strs[i].length)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} strs
 * @return {number}
 */
const numSimilarGroups = function (strs) {
  const n = strs.length;
  const groups = Array(n)
    .fill('')
    .map((_, index) => index);

  const isSimilar = (a, b) => {
    let diff = 0;

    for (let index = 0; index < a.length; index++) {
      if (a[index] === b[index]) continue;
      diff += 1;
      if (diff > 2) return false;
    }
    return true;
  };

  const unionFind = x => {
    return groups[x] === x ? x : unionFind(groups[x]);
  };

  for (let a = 0; a < n - 1; a++) {
    for (let b = a + 1; b < n; b++) {
      if (!isSimilar(strs[a], strs[b])) continue;
      const groupA = unionFind(a);
      const groupB = unionFind(b);

      groups[groupB] = groupA;
    }
  }
  let result = 0;

  for (let index = 0; index < n; index++) {
    if (groups[index] === index) result += 1;
  }
  return result;
};
```
