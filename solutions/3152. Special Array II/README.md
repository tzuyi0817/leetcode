# [3152. Special Array II](https://leetcode.com/problems/special-array-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>An array is considered <strong>special</strong> if every pair of its adjacent elements contains two numbers with different parity.</p>

<p>You are given an array of integer <code>nums</code> and a 2D integer matrix <code>queries</code>, where for <code>queries[i] = [from<sub>i</sub>, to<sub>i</sub>]</code> your task is to check that <span data-keyword="subarray" class=" cursor-pointer relative text-dark-blue-s text-sm"><div class="popover-wrapper inline-block" data-headlessui-state=""><div><div aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:rk:"><div>subarray</div></div><div style="position: fixed; z-index: 40; inset: 0px auto auto 0px; transform: translate(126px, 283px);"></div></div></div></span> <code>nums[from<sub>i</sub>..to<sub>i</sub>]</code> is <strong>special</strong> or not.</p>

<p>Return an array of booleans <code>answer</code> such that <code>answer[i]</code> is <code>true</code> if <code>nums[from<sub>i</sub>..to<sub>i</sub>]</code> is special.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [3,4,1,2,6], queries = [[0,4]]</span></p>

<p><strong>Output:</strong> <span class="example-io">[false]</span></p>

<p><strong>Explanation:</strong></p>

<p>The subarray is <code>[3,4,1,2,6]</code>. 2 and 6 are both even.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [4,3,1,6], queries = [[0,2],[2,3]]</span></p>

<p><strong>Output:</strong> <span class="example-io">[false,true]</span></p>

<p><strong>Explanation:</strong></p>

<ol>
	<li>The subarray is <code>[4,3,1]</code>. 3 and 1 are both odd. So the answer to this query is <code>false</code>.</li>
	<li>The subarray is <code>[1,6]</code>. There is only one pair: <code>(1,6)</code> and it contains numbers with different parity. So the answer to this query is <code>true</code>.</li>
</ol>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= queries.length &lt;= 10<sup>5</sup></code></li>
	<li><code>queries[i].length == 2</code></li>
	<li><code>0 &lt;= queries[i][0] &lt;= queries[i][1] &lt;= nums.length - 1</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum`**

- Time complexity: <em>O(n + queries.length)</em>
- Space complexity: <em>O(n + queries.length)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean[]}
 */
const isArraySpecial = function (nums, queries) {
  const n = nums.length;
  const specials = Array.from({ length: n }, () => 1);

  for (let index = 1; index < n; index++) {
    const isSpecial = nums[index] % 2 !== nums[index - 1] % 2;

    specials[index] = isSpecial ? specials[index - 1] + 1 : 1;
  }

  return queries.map(([from, to]) => {
    const length = to - from + 1;

    return length === specials[to] - specials[from] + 1;
  });
};
```
