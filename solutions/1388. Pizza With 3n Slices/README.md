# [1388. Pizza With 3n Slices](https://leetcode.com/problems/pizza-with-3n-slices)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a pizza with <code>3n</code> slices of varying size, you and your friends will take slices of pizza as follows:</p>

<ul>
	<li>You will pick <strong>any</strong> pizza slice.</li>
	<li>Your friend Alice will pick the next slice in the anti-clockwise direction of your pick.</li>
	<li>Your friend Bob will pick the next slice in the clockwise direction of your pick.</li>
	<li>Repeat until there are no more slices of pizzas.</li>
</ul>

<p>Given an integer array <code>slices</code> that represent the sizes of the pizza slices in a clockwise direction, return <em>the maximum possible sum of slice sizes that you can pick</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/02/18/sample_3_1723.png" style="width: 500px; height: 266px;">
<pre><strong>Input:</strong> slices = [1,2,3,4,5,6]
<strong>Output:</strong> 10
<strong>Explanation:</strong> Pick pizza slice of size 4, Alice and Bob will pick slices with size 3 and 5 respectively. Then Pick slices with size 6, finally Alice and Bob will pick slice of size 2 and 1 respectively. Total = 4 + 6.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/02/18/sample_4_1723.png" style="width: 500px; height: 299px;">
<pre><strong>Input:</strong> slices = [8,9,8,6,1,1]
<strong>Output:</strong> 16
<strong>Explanation:</strong> Pick pizza slice of size 8 in each turn. If you pick slice with size 9 your partners will pick slices of size 8.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 * n == slices.length</code></li>
	<li><code>1 &lt;= slices.length &lt;= 500</code></li>
	<li><code>1 &lt;= slices[i] &lt;= 1000</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(nk)</em>
- Space complexity: <em>O(nk + k)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} slices
 * @return {number}
 */
const maxSizeSlices = function (slices) {
  const n = slices.length;
  const k = n / 3;

  const pickPizza = (index, end, groups, dp) => {
    if (end - index < groups * 2 - 1) return Number.MIN_SAFE_INTEGER;

    if (groups === 1) {
      return Math.max(...slices.slice(index, end));
    }

    if (dp[index][groups]) return dp[index][groups];
    const pick = slices[index] + pickPizza(index + 2, end, groups - 1, dp);
    const unPick = pickPizza(index + 1, end, groups, dp);
    const result = Math.max(pick, unPick);

    dp[index][groups] = result;

    return result;
  };

  const dp1 = Array.from({ length: n }, () => new Array(k + 1).fill(0));
  const dp2 = Array.from({ length: n }, () => new Array(k + 1).fill(0));
  const startFirst = pickPizza(0, n - 1, k, dp1);
  const startSecond = pickPizza(1, n, k, dp2);

  return Math.max(startFirst, startSecond);
};
```
