# [1980. Find Unique Binary String](https://leetcode.com/problems/find-unique-binary-string)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an array of strings <code>nums</code> containing <code>n</code> <strong>unique</strong> binary strings each of length <code>n</code>, return <em>a binary string of length </em><code>n</code><em> that <strong>does not appear</strong> in </em><code>nums</code><em>. If there are multiple answers, you may return <strong>any</strong> of them</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = ["01","10"]
<strong>Output:</strong> "11"
<strong>Explanation:</strong> "11" does not appear in nums. "00" would also be correct.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = ["00","01"]
<strong>Output:</strong> "11"
<strong>Explanation:</strong> "11" does not appear in nums. "10" would also be correct.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = ["111","011","001"]
<strong>Output:</strong> "101"
<strong>Explanation:</strong> "101" does not appear in nums. "000", "010", "100", and "110" would also be correct.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == nums.length</code></li>
	<li><code>1 &lt;= n &lt;= 16</code></li>
	<li><code>nums[i].length == n</code></li>
	<li><code>nums[i] </code>is either <code>'0'</code> or <code>'1'</code>.</li>
	<li>All the strings of <code>nums</code> are <strong>unique</strong>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking`**
- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} nums
 * @return {string}
 */
var findDifferentBinaryString = function(nums) {
    const size = nums[0].length;
    const backtracking = (current = '') => {
        if (current.length === size) {
            if (nums.includes(current)) return '';
            return current;
        }
        const result = backtracking(`${current}0`);

        if (result) return result;
        return  backtracking(`${current}1`);
    };

    return backtracking();
};
```
