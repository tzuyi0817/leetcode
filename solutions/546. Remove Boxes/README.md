# [546. Remove Boxes](https://leetcode.com/problems/remove-boxes)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given several <code>boxes</code> with different colors represented by different positive numbers.</p>

<p>You may experience several rounds to remove boxes until there is no box left. Each time you can choose some continuous boxes with the same color (i.e., composed of <code>k</code> boxes, <code>k &gt;= 1</code>), remove them and get <code>k * k</code> points.</p>

<p>Return <em>the maximum points you can get</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> boxes = [1,3,2,2,2,3,4,3,1]
<strong>Output:</strong> 23
<strong>Explanation:</strong>
[1, 3, 2, 2, 2, 3, 4, 3, 1] 
----&gt; [1, 3, 3, 4, 3, 1] (3*3=9 points) 
----&gt; [1, 3, 3, 3, 1] (1*1=1 points) 
----&gt; [1, 1] (3*3=9 points) 
----&gt; [] (2*2=4 points)
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> boxes = [1,1,1]
<strong>Output:</strong> 9
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> boxes = [1]
<strong>Output:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= boxes.length &lt;= 100</code></li>
	<li><code>1 &lt;= boxes[i]&nbsp;&lt;= 100</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**
- Time complexity: <em>O(n<sup>4</sup>)</em>
- Space complexity: <em>O(n<sup>3</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} boxes
 * @return {number}
 */
var removeBoxes = function(boxes) {
    const n = boxes.length;
    const dp = Array(n).fill('').map(_ => Array(n).fill('').map(_ => Array(n).fill(0)));

    const calculatePoints = (left, right, count) => {
        if (left > right) return 0;
        if (dp[left][right][count]) return dp[left][right][count];
        const originLeft = left;
        const originCount = count;

        while (left + 1 <= right && boxes[left] === boxes[left + 1]) {
            left += 1;
            count += 1;
        }
        let result = (count + 1) ** 2 + calculatePoints(left + 1, right, 0);

        for (let index = left + 1; index <= right; index++) {
            if (boxes[left] !== boxes[index]) continue;
            const points = calculatePoints(left + 1, index - 1, 0) + calculatePoints(index, right, count + 1);

            result = Math.max(points, result);
        }
        return dp[originLeft][right][originCount] = result;
    };

    return calculatePoints(0, n - 1, 0);
};
```
