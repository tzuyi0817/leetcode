# [2272. Substring With Largest Variance](https://leetcode.com/problems/substring-with-largest-variance)

## Description

<div class="elfjS" data-track-load="description_content"><p>The <strong>variance</strong> of a string is defined as the largest difference between the number of occurrences of <strong>any</strong> <code>2</code> characters present in the string. Note the two characters may or may not be the same.</p>

<p>Given a string <code>s</code> consisting of lowercase English letters only, return <em>the <strong>largest variance</strong> possible among all <strong>substrings</strong> of</em> <code>s</code>.</p>

<p>A <strong>substring</strong> is a contiguous sequence of characters within a string.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "aababbb"
<strong>Output:</strong> 3
<strong>Explanation:</strong>
All possible variances along with their respective substrings are listed below:
- Variance 0 for substrings "a", "aa", "ab", "abab", "aababb", "ba", "b", "bb", and "bbb".
- Variance 1 for substrings "aab", "aba", "abb", "aabab", "ababb", "aababbb", and "bab".
- Variance 2 for substrings "aaba", "ababbb", "abbb", and "babb".
- Variance 3 for substring "babbb".
Since the largest possible variance is 3, we return it.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "abcde"
<strong>Output:</strong> 0
<strong>Explanation:</strong>
No letter occurs more than once in s, so the variance of every substring is 0.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
	<li><code>s</code> consists of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const largestVariance = function (s) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const codes = [...s].map(char => char.charCodeAt(0) - BASE_CODE);
  let result = 0;

  const kadane = (a, b) => {
    let countA = 0;
    let countB = 0;
    let variance = 0;
    let hasPrevB = false;

    for (const code of codes) {
      if (code !== a && code !== b) continue;

      if (code === a) {
        countA += 1;
      } else {
        countB += 1;
      }

      if (countB > 0) {
        variance = Math.max(countA - countB, variance);
      } else if (hasPrevB) {
        variance = Math.max(countA - 1, variance);
      }

      if (countB > countA) {
        countA = 0;
        countB = 0;
        hasPrevB = true;
      }
    }

    return variance;
  };

  for (let a = 0; a < 26; a++) {
    for (let b = 0; b < 26; b++) {
      if (a === b) continue;

      const variance = kadane(a, b);

      result = Math.max(variance, result);
    }
  }

  return result;
};
```
