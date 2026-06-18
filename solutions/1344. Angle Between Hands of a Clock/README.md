# [1344. Angle Between Hands of a Clock](https://leetcode.com/problems/angle-between-hands-of-a-clock)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>Given two numbers, <code>hour</code> and <code>minutes</code>, return <em>the smaller angle (in degrees) formed between the </em><code>hour</code><em> and the </em><code>minute</code><em> hand</em>.</p>

<p>Answers within <code>10<sup>-5</sup></code> of the actual value will be accepted as correct.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/12/26/sample_1_1673.png" style="width: 300px; height: 296px;">
<pre><strong>Input:</strong> hour = 12, minutes = 30
<strong>Output:</strong> 165
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/12/26/sample_2_1673.png" style="width: 300px; height: 301px;">
<pre><strong>Input:</strong> hour = 3, minutes = 30
<strong>Output:</strong> 75
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/12/26/sample_3_1673.png" style="width: 300px; height: 301px;">
<pre><strong>Input:</strong> hour = 3, minutes = 15
<strong>Output:</strong> 7.5
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= hour &lt;= 12</code></li>
	<li><code>0 &lt;= minutes &lt;= 59</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(1)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} hour
 * @param {number} minutes
 * @return {number}
 */
const angleClock = function (hour, minutes) {
  const HOUR_ANGLE = 360 / 12;
  const hourAngle = (hour % 12) * HOUR_ANGLE + (minutes / 60) * HOUR_ANGLE;
  const minutesAngle = (minutes / 5) * HOUR_ANGLE;
  const diffAngle = Math.abs(hourAngle - minutesAngle);

  return Math.min(diffAngle, 360 - diffAngle);
};
```
