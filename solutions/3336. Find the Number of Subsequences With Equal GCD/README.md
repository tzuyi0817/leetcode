# [3336. Find the Number of Subsequences With Equal GCD](https://leetcode.com/problems/find-the-number-of-subsequences-with-equal-gcd)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given an integer array <code>nums</code>.</p>

<p>Your task is to find the number of pairs of <strong>non-empty</strong> <span data-keyword="subsequence-array" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_1m_" data-state="closed" class="">subsequences</button></span> <code>(seq1, seq2)</code> of <code>nums</code> that satisfy the following conditions:</p>

<ul>
	<li>The subsequences <code>seq1</code> and <code>seq2</code> are <strong>disjoint</strong>, meaning <strong>no index</strong> of <code>nums</code> is common between them.</li>
	<li>The <span data-keyword="gcd-function" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_1n_" data-state="closed" class="">GCD</button></span> of the elements of <code>seq1</code> is equal to the GCD of the elements of <code>seq2</code>.</li>
</ul>

<p>Return the total number of such pairs.</p>

<p>Since the answer may be very large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,2,3,4]</span></p>

<p><strong>Output:</strong> <span class="example-io">10</span></p>

<p><strong>Explanation:</strong></p>

<p>The subsequence pairs which have the GCD of their elements equal to 1 are:</p>

<ul>
	<li><code>([<strong><u>1</u></strong>, 2, 3, 4], [1, <strong><u>2</u></strong>, <strong><u>3</u></strong>, 4])</code></li>
	<li><code>([<strong><u>1</u></strong>, 2, 3, 4], [1, <strong><u>2</u></strong>, <strong><u>3</u></strong>, <strong><u>4</u></strong>])</code></li>
	<li><code>([<strong><u>1</u></strong>, 2, 3, 4], [1, 2, <strong><u>3</u></strong>, <strong><u>4</u></strong>])</code></li>
	<li><code>([<strong><u>1</u></strong>, <strong><u>2</u></strong>, 3, 4], [1, 2, <strong><u>3</u></strong>, <strong><u>4</u></strong>])</code></li>
	<li><code>([<strong><u>1</u></strong>, 2, 3, <strong><u>4</u></strong>], [1, <strong><u>2</u></strong>, <strong><u>3</u></strong>, 4])</code></li>
	<li><code>([1, <strong><u>2</u></strong>, <strong><u>3</u></strong>, 4], [<strong><u>1</u></strong>, 2, 3, 4])</code></li>
	<li><code>([1, <strong><u>2</u></strong>, <strong><u>3</u></strong>, 4], [<strong><u>1</u></strong>, 2, 3, <strong><u>4</u></strong>])</code></li>
	<li><code>([1, <strong><u>2</u></strong>, <strong><u>3</u></strong>, <strong><u>4</u></strong>], [<strong><u>1</u></strong>, 2, 3, 4])</code></li>
	<li><code>([1, 2, <strong><u>3</u></strong>, <strong><u>4</u></strong>], [<strong><u>1</u></strong>, 2, 3, 4])</code></li>
	<li><code>([1, 2, <strong><u>3</u></strong>, <strong><u>4</u></strong>], [<strong><u>1</u></strong>, <strong><u>2</u></strong>, 3, 4])</code></li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [10,20,30]</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>The subsequence pairs which have the GCD of their elements equal to 10 are:</p>

<ul>
	<li><code>([<strong><u>10</u></strong>, 20, 30], [10, <strong><u>20</u></strong>, <strong><u>30</u></strong>])</code></li>
	<li><code>([10, <strong><u>20</u></strong>, <strong><u>30</u></strong>], [<strong><u>10</u></strong>, 20, 30])</code></li>
</ul>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,1,1,1]</span></p>

<p><strong>Output:</strong> <span class="example-io">50</span></p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 200</code></li>
	<li><code>1 &lt;= nums[i] &lt;= 200</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n\*Max(nums)<sup>2</sup>)</em>
- Space complexity: <em>O(n\*Max(nums)<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const subsequencePairCount = function (nums) {
  const n = nums.length;
  const MODULO = 10 ** 9 + 7;
  const maxNum = Math.max(...nums);
  const dp = Array.from({ length: n }, () => {
    return new Array(maxNum + 1)
      .fill('')
      .map(_ => new Array(maxNum + 1).fill(-1));
  });

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  const getPairCount = (index, x, y) => {
    if (index >= n) return x > 0 && x === y ? 1 : 0;

    if (dp[index][x][y] !== -1) return dp[index][x][y];

    const num = nums[index];
    const skip = getPairCount(index + 1, x, y);
    const pickX = getPairCount(index + 1, gcd(num, x), y);
    const pickY = getPairCount(index + 1, x, gcd(num, y));
    const result = (skip + pickX + pickY) % MODULO;

    dp[index][x][y] = result;

    return result;
  };

  return getPairCount(0, 0, 0);
};
```
