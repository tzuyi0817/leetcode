# [1864. Minimum Number of Swaps to Make the Binary String Alternating](https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-binary-string-alternating)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a binary string <code>s</code>, return <em>the <strong>minimum</strong> number of character swaps to make it <strong>alternating</strong>, or </em><code>-1</code><em> if it is impossible.</em></p>

<p>The string is called <strong>alternating</strong> if no two adjacent characters are equal. For example, the strings <code>"010"</code> and <code>"1010"</code> are alternating, while the string <code>"0100"</code> is not.</p>

<p>Any two characters may be swapped, even if they are&nbsp;<strong>not adjacent</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "111000"
<strong>Output:</strong> 1
<strong>Explanation:</strong> Swap positions 1 and 4: "1<u>1</u>10<u>0</u>0" -&gt; "1<u>0</u>10<u>1</u>0"
The string is now alternating.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "010"
<strong>Output:</strong> 0
<strong>Explanation:</strong> The string is already alternating, no swaps are needed.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "1110"
<strong>Output:</strong> -1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 1000</code></li>
	<li><code>s[i]</code> is either <code>'0'</code> or <code>'1'</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**
- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
var minSwaps = function(s) {
    const ones = s.replaceAll('0', '').length;
    const zeros = s.length - ones;
    
    if (Math.abs(ones - zeros) > 1) return -1;
    const swapString = (current) => {
        let times = 0;

        for (const character of s) {
            if (+character !== current) times += 1;
            current ^= 1;
        }
        return times / 2;
    };

    if (ones > zeros) return swapString(1);
    if (ones < zeros) return swapString(0);
    return Math.min(swapString(0), swapString(1));
};
```
