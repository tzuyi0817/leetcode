# [3723. Maximize Sum of Squares of Digits](https://leetcode.com/problems/maximize-sum-of-squares-of-digits)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given two <strong>positive</strong> integers <code>num</code> and <code>sum</code>.</p>

<p>A positive integer <code>n</code> is <strong>good</strong> if it satisfies both of the following:</p>

<ul>
	<li>The number of digits in <code>n</code> is <strong>exactly</strong> <code>num</code>.</li>
	<li>The sum of digits in <code>n</code> is <strong>exactly</strong> <code>sum</code>.</li>
</ul>

<p>The <strong>score</strong> of a <strong>good</strong> integer <code>n</code> is the sum of the squares of digits in <code>n</code>.</p>

<p>Return a <strong>string</strong> denoting the <strong>good</strong> integer <code>n</code> that achieves the <strong>maximum</strong> <strong>score</strong>. If there are multiple possible integers, return the <strong>maximum </strong>​​​​​​​one. If no such integer exists, return an empty string.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">num = 2, sum = 3</span></p>

<p><strong>Output:</strong> <span class="example-io">"30"</span></p>

<p><strong>Explanation:</strong></p>

<p>There are 3 good integers: 12, 21, and 30.</p>

<ul>
	<li>The score of 12 is <code>1<sup>2</sup> + 2<sup>2</sup> = 5</code>.</li>
	<li>The score of 21 is <code>2<sup>2</sup> + 1<sup>2</sup> = 5</code>.</li>
	<li>The score of 30 is <code>3<sup>2</sup> + 0<sup>2</sup> = 9</code>.</li>
</ul>

<p>The maximum score is 9, which is achieved by the good integer 30. Therefore, the answer is <code>"30"</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">num = 2, sum = 17</span></p>

<p><strong>Output:</strong> <span class="example-io">"98"</span></p>

<p><strong>Explanation:</strong></p>

<p>There are 2 good integers: 89 and 98.</p>

<ul>
	<li>The score of 89 is <code>8<sup>2</sup> + 9<sup>2</sup> = 145</code>.</li>
	<li>The score of 98 is <code>9<sup>2</sup> + 8<sup>2</sup> = 145</code>.</li>
</ul>

<p>The maximum score is 145. The maximum good integer that achieves this score is 98. Therefore, the answer is <code>"98"</code>.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">num = 1, sum = 10</span></p>

<p><strong>Output:</strong> <span class="example-io">""</span></p>

<p><strong>Explanation:</strong></p>

<p>There are no integers that have exactly 1 digit and whose digits sum to 10. Therefore, the answer is <code>""</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= num &lt;= 2 * 10<sup>5</sup></code></li>
	<li><code>1 &lt;= sum &lt;= 2 * 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(1)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} num
 * @param {number} sum
 * @return {string}
 */
const maxSumOfSquares = function (num, sum) {
  if (sum > 9 * num) return '';

  const multiple = Math.floor(sum / 9);
  const remainder = sum % 9;
  const base = '9'.repeat(multiple);

  if (multiple === num) return base;

  return `${base}${remainder}`.padEnd(num, '0');
};
```
