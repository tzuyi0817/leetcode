# [1520. Maximum Number of Non-Overlapping Substrings](https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>s</code> of lowercase letters, you need to find the maximum number of <strong>non-empty</strong> substrings of <code>s</code> that meet the following conditions:</p>

<ol>
	<li>The substrings do not overlap, that is for any two substrings <code>s[i..j]</code> and <code>s[x..y]</code>, either <code>j &lt; x</code> or <code>i &gt; y</code> is true.</li>
	<li>A substring that contains a certain character <code>c</code> must also contain all occurrences of <code>c</code>.</li>
</ol>

<p>Find <em>the maximum number of substrings that meet the above conditions</em>. If there are multiple solutions with the same number of substrings, <em>return the one with minimum total length. </em>It can be shown that there exists a unique solution of minimum total length.</p>

<p>Notice that you can return the substrings in <strong>any</strong> order.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "adefaddaccc"
<strong>Output:</strong> ["e","f","ccc"]
<b>Explanation:</b>&nbsp;The following are all the possible substrings that meet the conditions:
[
&nbsp; "adefaddaccc"
&nbsp; "adefadda",
&nbsp; "ef",
&nbsp; "e",
  "f",
&nbsp; "ccc",
]
If we choose the first string, we cannot choose anything else and we'd get only 1. If we choose "adefadda", we are left with "ccc" which is the only one that doesn't overlap, thus obtaining 2 substrings. Notice also, that it's not optimal to choose "ef" since it can be split into two. Therefore, the optimal way is to choose ["e","f","ccc"] which gives us 3 substrings. No other solution of the same number of substrings exist.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "abbaccd"
<strong>Output:</strong> ["d","bb","cc"]
<b>Explanation: </b>Notice that while the set of substrings ["d","abba","cc"] also has length 3, it's considered incorrect since it has larger total length.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> contains only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(26n -> n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {string[]}
 */
const maxNumOfSubstrings = function (s) {
  const n = s.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const leftIndices = Array.from({ length: 26 }, () => n);
  const rightIndices = Array.from({ length: 26 }, () => -1);

  for (let index = 0; index < n; index++) {
    const code = s[index].charCodeAt(0) - BASE_CODE;

    leftIndices[code] = Math.min(index, leftIndices[code]);
    rightIndices[code] = Math.max(index, rightIndices[code]);
  }

  const result = [];
  let currentRight = -1;

  const getRight = (start, end) => {
    let right = end;

    for (let index = start; index <= right; index++) {
      const code = s[index].charCodeAt(0) - BASE_CODE;

      if (leftIndices[code] < start) return -1;

      right = Math.max(rightIndices[code], right);
    }

    return right;
  };

  for (let index = 0; index < n; index++) {
    const code = s[index].charCodeAt(0) - BASE_CODE;

    if (leftIndices[code] !== index) continue;
    const right = getRight(index, rightIndices[code]);

    if (right === -1) continue;
    const subStr = s.slice(index, right + 1);

    if (result.length && index < currentRight) {
      result[result.length - 1] = subStr;
    } else {
      result.push(subStr);
    }

    currentRight = right;
  }

  return result;
};
```
