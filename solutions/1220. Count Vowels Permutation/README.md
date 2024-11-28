# [1220. Count Vowels Permutation](https://leetcode.com/problems/count-vowels-permutation)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an integer <code>n</code>, your task is to count how many strings of length <code>n</code> can be formed under the following rules:</p>

<ul>
	<li>Each character is a lower case vowel&nbsp;(<code>'a'</code>, <code>'e'</code>, <code>'i'</code>, <code>'o'</code>, <code>'u'</code>)</li>
	<li>Each vowel&nbsp;<code>'a'</code> may only be followed by an <code>'e'</code>.</li>
	<li>Each vowel&nbsp;<code>'e'</code> may only be followed by an <code>'a'</code>&nbsp;or an <code>'i'</code>.</li>
	<li>Each vowel&nbsp;<code>'i'</code> <strong>may not</strong> be followed by another <code>'i'</code>.</li>
	<li>Each vowel&nbsp;<code>'o'</code> may only be followed by an <code>'i'</code> or a&nbsp;<code>'u'</code>.</li>
	<li>Each vowel&nbsp;<code>'u'</code> may only be followed by an <code>'a'</code>.</li>
</ul>

<p>Since the answer&nbsp;may be too large,&nbsp;return it modulo&nbsp;<code>10^9 + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 1
<strong>Output:</strong> 5
<strong>Explanation:</strong> All possible strings are: "a", "e", "i" , "o" and "u".
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 2
<strong>Output:</strong> 10
<strong>Explanation:</strong> All possible strings are: "ae", "ea", "ei", "ia", "ie", "io", "iu", "oi", "ou" and "ua".
</pre>

<p><strong class="example">Example 3:&nbsp;</strong></p>

<pre><strong>Input:</strong> n = 5
<strong>Output:</strong> 68</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 2 * 10^4</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {number}
 */
const countVowelPermutation = function (n) {
  const MODULO = 10 ** 9 + 7;
  const VOWELS_COUNT = 5;
  const vowelsMap = { a: 0, e: 1, i: 2, o: 3, u: 4 };
  const followedMap = {
    [vowelsMap.a]: [vowelsMap.e, vowelsMap.u, vowelsMap.i],
    [vowelsMap.e]: [vowelsMap.a, vowelsMap.i],
    [vowelsMap.i]: [vowelsMap.e, vowelsMap.o],
    [vowelsMap.o]: [vowelsMap.i],
    [vowelsMap.u]: [vowelsMap.o, vowelsMap.i],
  };
  let dp = Array.from({ length: VOWELS_COUNT }, () => 1);

  for (let index = 2; index <= n; index++) {
    const nextDp = Array.from({ length: VOWELS_COUNT }, () => 0);

    for (let vowels = 0; vowels < VOWELS_COUNT; vowels++) {
      for (const followed of followedMap[vowels]) {
        nextDp[vowels] = (nextDp[vowels] + dp[followed]) % MODULO;
      }
    }
    dp = nextDp;
  }
  return dp.reduce((result, count) => (result + count) % MODULO);
};
```
