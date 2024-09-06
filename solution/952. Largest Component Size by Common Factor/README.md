# [952. Largest Component Size by Common Factor](https://leetcode.com/problems/largest-component-size-by-common-factor)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array of unique positive integers <code>nums</code>. Consider the following graph:</p>

<ul>
	<li>There are <code>nums.length</code> nodes, labeled <code>nums[0]</code> to <code>nums[nums.length - 1]</code>,</li>
	<li>There is an undirected edge between <code>nums[i]</code> and <code>nums[j]</code> if <code>nums[i]</code> and <code>nums[j]</code> share a common factor greater than <code>1</code>.</li>
</ul>

<p>Return <em>the size of the largest connected component in the graph</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/01/ex1.png" style="width: 500px; height: 97px;">
<pre><strong>Input:</strong> nums = [4,6,15,35]
<strong>Output:</strong> 4
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/01/ex2.png" style="width: 500px; height: 85px;">
<pre><strong>Input:</strong> nums = [20,50,9,63]
<strong>Output:</strong> 2
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/01/ex3.png" style="width: 500px; height: 260px;">
<pre><strong>Input:</strong> nums = [2,3,6,7,4,12,21,39]
<strong>Output:</strong> 8
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
	<li>All the values of <code>nums</code> are <strong>unique</strong>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Union Find`**
- Time complexity: <em>O(n * Max(Sqrt(nums)))</em>
- Space complexity: <em>O(Max(nums))</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var largestComponentSize = function(nums) {
    const n = nums.length;
    const maxNum = Math.max(...nums);
    const groups = Array(maxNum + 1).fill('').map((_, index) => index);

    const unionFind = (value) => {
        return groups[value] === value ? value : unionFind(groups[value]);
    };

    for (const num of nums) {
        const sqrt = Math.floor(Math.sqrt(num));

        for (let value = sqrt; value > 1; value--) {
            if (num % value) continue;
            const groupA = unionFind(value);
            const groupB = unionFind(num);
            const groupC = unionFind(num / value);

            groups[groupB] = groupA;
            groups[groupC] = groupA;
        }
    }
    const countMap = new Map();
    let result = 0;

    for (const num of nums) {
        const group = unionFind(num);
        const count = countMap.get(group) ?? 0;

        countMap.set(group, count + 1);
        result = Math.max(count + 1, result);
    }
    return result;
};
```
