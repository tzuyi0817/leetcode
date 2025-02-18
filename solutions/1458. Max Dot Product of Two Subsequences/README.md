# [1458. Max Dot Product of Two Subsequences](https://leetcode.com/problems/max-dot-product-of-two-subsequences)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given two arrays <code>nums1</code>&nbsp;and <code><font face="monospace">nums2</font></code><font face="monospace">.</font></p>

<p>Return the maximum dot product&nbsp;between&nbsp;<strong>non-empty</strong> subsequences of nums1 and nums2 with the same length.</p>

<p>A subsequence of a array is a new array which is formed from the original array by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie,&nbsp;<code>[2,3,5]</code>&nbsp;is a subsequence of&nbsp;<code>[1,2,3,4,5]</code>&nbsp;while <code>[1,5,3]</code>&nbsp;is not).</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums1 = [2,1,-2,5], nums2 = [3,0,-6]
<strong>Output:</strong> 18
<strong>Explanation:</strong> Take subsequence [2,-2] from nums1 and subsequence [3,-6] from nums2.
Their dot product is (2*3 + (-2)*(-6)) = 18.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums1 = [3,-2], nums2 = [2,-6,7]
<strong>Output:</strong> 21
<strong>Explanation:</strong> Take subsequence [3] from nums1 and subsequence [7] from nums2.
Their dot product is (3*7) = 21.</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums1 = [-1,-1], nums2 = [1,1]
<strong>Output:</strong> -1
<strong>Explanation: </strong>Take subsequence [-1] from nums1 and subsequence [1] from nums2.
Their dot product is -1.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums1.length, nums2.length &lt;= 500</code></li>
	<li><code>-1000 &lt;= nums1[i], nums2[i] &lt;= 1000</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const maxDotProduct = function (nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(Number.MIN_SAFE_INTEGER));

  const subProduct = (a, b) => {
    if (a >= m || b >= n) return Number.MIN_SAFE_INTEGER;
    if (dp[a][b] !== Number.MIN_SAFE_INTEGER) return dp[a][b];
    const ignoreA = subProduct(a + 1, b);
    const ignoreB = subProduct(a, b + 1);
    const product = nums1[a] * nums2[b];
    const totalProduct = product + subProduct(a + 1, b + 1);
    const result = Math.max(ignoreA, ignoreB, product, totalProduct);

    dp[a][b] = result;

    return result;
  };

  return subProduct(0, 0);
};
```
