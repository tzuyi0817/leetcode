# [1307. Verbal Arithmetic Puzzle](https://leetcode.com/problems/verbal-arithmetic-puzzle)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an equation, represented by <code>words</code> on the left side and the <code>result</code> on the right side.</p>

<p>You need to check if the equation is solvable under the following rules:</p>

<ul>
	<li>Each character is decoded as one digit (0 - 9).</li>
	<li>No two characters can map to the same digit.</li>
	<li>Each <code>words[i]</code> and <code>result</code> are decoded as one number <strong>without</strong> leading zeros.</li>
	<li>Sum of numbers on the left side (<code>words</code>) will equal to the number on the right side (<code>result</code>).</li>
</ul>

<p>Return <code>true</code> <em>if the equation is solvable, otherwise return</em> <code>false</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> words = ["SEND","MORE"], result = "MONEY"
<strong>Output:</strong> true
<strong>Explanation:</strong> Map 'S'-&gt; 9, 'E'-&gt;5, 'N'-&gt;6, 'D'-&gt;7, 'M'-&gt;1, 'O'-&gt;0, 'R'-&gt;8, 'Y'-&gt;'2'
Such that: "SEND" + "MORE" = "MONEY" ,  9567 + 1085 = 10652</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> words = ["SIX","SEVEN","SEVEN"], result = "TWENTY"
<strong>Output:</strong> true
<strong>Explanation:</strong> Map 'S'-&gt; 6, 'I'-&gt;5, 'X'-&gt;0, 'E'-&gt;8, 'V'-&gt;7, 'N'-&gt;2, 'T'-&gt;1, 'W'-&gt;'3', 'Y'-&gt;4
Such that: "SIX" + "SEVEN" + "SEVEN" = "TWENTY" ,  650 + 68782 + 68782 = 138214</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> words = ["LEET","CODE"], result = "POINT"
<strong>Output:</strong> false
<strong>Explanation:</strong> There is no possible mapping to satisfy the equation, so we return false.
Note that two different characters cannot map to the same digit.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= words.length &lt;= 5</code></li>
	<li><code>1 &lt;= words[i].length, result.length &lt;= 7</code></li>
	<li><code>words[i], result</code> contain only uppercase English letters.</li>
	<li>The number of different characters used in the expression is at most <code>10</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking`**

- Time complexity: <em>O(P(10,k)\*mn)</em>
- Space complexity: <em>O(k)</em>
  - `k` is the number of letters

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} words
 * @param {string} result
 * @return {boolean}
 */
const isSolvable = function (words, result) {
  const allWords = [...words, result];
  const m = allWords.length;
  const decodeMap = new Map();
  let n = 0;

  for (const word of allWords) {
    n = Math.max(word.length, n);
  }

  const solveEquation = (row, col, sum, digitMask) => {
    if (col === n) return sum === 0;
    if (row === m) {
      const isEqual = sum % 10 === 0;
      const carry = Math.floor(sum / 10);

      return isEqual && solveEquation(0, col + 1, carry, digitMask);
    }
    const word = allWords[row];

    if (col >= word.length) {
      return solveEquation(row + 1, col, sum, digitMask);
    }
    const letter = word[word.length - 1 - col];
    const sign = row === m - 1 ? -1 : 1;
    const isLeading = word.length > 1 && col === word.length - 1;

    if (decodeMap.has(letter)) {
      const digit = decodeMap.get(letter);

      if (isLeading && digit === 0) return false;
      const nextSum = digit * sign + sum;

      return solveEquation(row + 1, col, nextSum, digitMask);
    }
    const startDigit = isLeading ? 1 : 0;

    for (let digit = startDigit; digit < 10; digit++) {
      const mask = 1 << digit;

      if (digitMask & mask) continue;
      const nextSum = digit * sign + sum;

      decodeMap.set(letter, digit);
      if (solveEquation(row + 1, col, nextSum, digitMask | mask)) return true;

      decodeMap.delete(letter);
    }
    return false;
  };

  return solveEquation(0, 0, 0, 0);
};
```
