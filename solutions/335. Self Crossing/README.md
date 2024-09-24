# [335. Self Crossing](https://leetcode.com/problems/self-crossing)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an array of integers <code>distance</code>.</p>

<p>You start at the point <code>(0, 0)</code> on an <strong>X-Y plane,</strong> and you move <code>distance[0]</code> meters to the north, then <code>distance[1]</code> meters to the west, <code>distance[2]</code> meters to the south, <code>distance[3]</code> meters to the east, and so on. In other words, after each move, your direction changes counter-clockwise.</p>

<p>Return <code>true</code> <em>if your path crosses itself or </em><code>false</code><em> if it does not</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/12/21/11.jpg" style="width: 400px; height: 413px;">
<pre><strong>Input:</strong> distance = [2,1,1,2]
<strong>Output:</strong> true
<strong>Explanation:</strong> The path crosses itself at the point (0, 1).
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/12/21/22.jpg" style="width: 400px; height: 413px;">
<pre><strong>Input:</strong> distance = [1,2,3,4]
<strong>Output:</strong> false
<strong>Explanation:</strong> The path does not cross itself at any point.
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/12/21/33.jpg" style="width: 400px; height: 413px;">
<pre><strong>Input:</strong> distance = [1,1,1,2,1]
<strong>Output:</strong> true
<strong>Explanation:</strong> The path crosses itself at the point (0, 0).
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;=&nbsp;distance.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;=&nbsp;distance[i] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} distance
 * @return {boolean}
 */
const isSelfCrossing = function (distance) {
  const situation1 = index => {
    const one = distance[index - 3];
    const two = distance[index - 2];
    const three = distance[index - 1];
    const four = distance[index];

    return one >= three && four >= two;
  };
  const situation2 = index => {
    if (index < 4) return false;
    const one = distance[index - 4];
    const two = distance[index - 3];
    const three = distance[index - 2];
    const four = distance[index - 1];
    const five = distance[index];

    return three >= one && two === four && five >= three - one;
  };
  const situation3 = index => {
    if (index < 5) return false;
    const one = distance[index - 5];
    const two = distance[index - 4];
    const three = distance[index - 3];
    const four = distance[index - 2];
    const five = distance[index - 1];
    const six = distance[index];

    return four >= two && three >= five && one >= three - five && six >= four - two;
  };

  for (let index = 3; index < distance.length; index++) {
    if (situation1(index)) return true;
    if (situation2(index)) return true;
    if (situation3(index)) return true;
  }
  return false;
};
```
