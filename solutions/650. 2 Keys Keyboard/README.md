# [650. 2 Keys Keyboard](https://leetcode.com/problems/2-keys-keyboard)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is only one character <code>'A'</code> on the screen of a notepad. You can perform one of two operations on this notepad for each step:</p>

<ul>
	<li>Copy All: You can copy all the characters present on the screen (a partial copy is not allowed).</li>
	<li>Paste: You can paste the characters which are copied last time.</li>
</ul>

<p>Given an integer <code>n</code>, return <em>the minimum number of operations to get the character</em> <code>'A'</code> <em>exactly</em> <code>n</code> <em>times on the screen</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 3
<strong>Output:</strong> 3
<strong>Explanation:</strong> Initially, we have one character 'A'.
In step 1, we use Copy All operation.
In step 2, we use Paste operation to get 'AA'.
In step 3, we use Paste operation to get 'AAA'.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 1
<strong>Output:</strong> 0
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 1000</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**
- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {number}
 */
var minSteps = function(n) {
    const dp = Array(n + 1).fill(0);

    for (let index = 2; index <= n; index++) {
        let operations = index;

        for (let num = Math.floor(index / 2); num > 1; num--) {
            if (index % num) continue;
            const times = index / num;

            operations = dp[num] + times;
            break;
        }
        dp[index] = operations;
    }
    return dp[n];
};
```
