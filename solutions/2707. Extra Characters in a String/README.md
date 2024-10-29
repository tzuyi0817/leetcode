# [2707. Extra Characters in a String](https://leetcode.com/problems/extra-characters-in-a-string)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> string <code>s</code> and a dictionary of words <code>dictionary</code>. You have to break <code>s</code> into one or more <strong>non-overlapping</strong> substrings such that each substring is present in <code>dictionary</code>. There may be some <strong>extra characters</strong> in <code>s</code> which are not present in any of the substrings.</p>

<p>Return <em>the <strong>minimum</strong> number of extra characters left over if you break up </em><code>s</code><em> optimally.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "leetscode", dictionary = ["leet","code","leetcode"]
<strong>Output:</strong> 1
<strong>Explanation:</strong> We can break s in two substrings: "leet" from index 0 to 3 and "code" from index 5 to 8. There is only 1 unused character (at index 4), so we return 1.

</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "sayhelloworld", dictionary = ["hello","world"]
<strong>Output:</strong> 3
<strong>Explanation:</strong> We can break s in two substrings: "hello" from index 3 to 7 and "world" from index 8 to 12. The characters at indices 0, 1, 2 are not used in any substring and thus are considered as extra characters. Hence, we return 3.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 50</code></li>
	<li><code>1 &lt;= dictionary.length &lt;= 50</code></li>
	<li><code>1 &lt;= dictionary[i].length &lt;= 50</code></li>
	<li><code>dictionary[i]</code>&nbsp;and <code>s</code> consists of only lowercase English letters</li>
	<li><code>dictionary</code> contains distinct words</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>2</sup>\*dictionary.length)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
const minExtraChar = function (s, dictionary) {
  const n = s.length;
  const dp = new Array(n).fill(n);

  dp[-1] = 0;

  for (let a = 0; a < n; a++) {
    dp[a] = dp[a - 1] + 1;

    for (let b = 0; b <= a; b++) {
      const word = s.slice(b, a + 1);

      if (!dictionary.includes(word)) continue;

      dp[a] = Math.min(dp[b - 1], dp[a]);
    }
  }
  return dp[n - 1];
};
```
