# [3031. Minimum Time to Revert Word to Initial State II](https://leetcode.com/problems/minimum-time-to-revert-word-to-initial-state-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> string <code>word</code> and an integer <code>k</code>.</p>

<p>At every second, you must perform the following operations:</p>

<ul>
	<li>Remove the first <code>k</code> characters of <code>word</code>.</li>
	<li>Add any <code>k</code> characters to the end of <code>word</code>.</li>
</ul>

<p><strong>Note</strong> that you do not necessarily need to add the same characters that you removed. However, you must perform <strong>both</strong> operations at every second.</p>

<p>Return <em>the <strong>minimum</strong> time greater than zero required for</em> <code>word</code> <em>to revert to its <strong>initial</strong> state</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> word = "abacaba", k = 3
<strong>Output:</strong> 2
<strong>Explanation:</strong> At the 1st second, we remove characters "aba" from the prefix of word, and add characters "bac" to the end of word. Thus, word becomes equal to "cababac".
At the 2nd second, we remove characters "cab" from the prefix of word, and add "aba" to the end of word. Thus, word becomes equal to "abacaba" and reverts to its initial state.
It can be shown that 2 seconds is the minimum time greater than zero required for word to revert to its initial state.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> word = "abacaba", k = 4
<strong>Output:</strong> 1
<strong>Explanation:</strong> At the 1st second, we remove characters "abac" from the prefix of word, and add characters "caba" to the end of word. Thus, word becomes equal to "abacaba" and reverts to its initial state.
It can be shown that 1 second is the minimum time greater than zero required for word to revert to its initial state.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> word = "abcbabcd", k = 2
<strong>Output:</strong> 4
<strong>Explanation:</strong> At every second, we will remove the first 2 characters of word, and add the same characters to the end of word.
After 4 seconds, word becomes equal to "abcbabcd" and reverts to its initial state.
It can be shown that 4 seconds is the minimum time greater than zero required for word to revert to its initial state.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= word.length &lt;= 10<sup>6</sup></code></li>
	<li><code>1 &lt;= k &lt;= word.length</code></li>
	<li><code>word</code> consists only of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Z-function`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
const minimumTimeToInitialState = function (word, k) {
  const n = word.length;
  const z = zFunction(word);
  const maxOperations = Math.ceil(n / k);

  for (let count = 1; count < maxOperations; count++) {
    const len = count * k;

    if (z[len] >= n - len) return count;
  }

  return maxOperations;
};

function zFunction(s) {
  const n = s.length;
  const z = Array.from({ length: n }, () => 0);
  let l = 0;
  let r = 0;

  for (let index = 1; index < n; index++) {
    if (index < r) {
      z[index] = Math.min(r - index, z[index - l]);
    }

    while (index + z[index] < n && s[z[index]] === s[index + z[index]]) {
      z[index] += 1;
    }

    if (index + z[index] > r) {
      l = index;
      r = index + z[index];
    }
  }

  return z;
}
```
