# [539. Minimum Time Difference](https://leetcode.com/problems/minimum-time-difference)

## Description

<div class="elfjS" data-track-load="description_content">Given a list of 24-hour clock time points in <strong>"HH:MM"</strong> format, return <em>the minimum <b>minutes</b> difference between any two time-points in the list</em>.
<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> timePoints = ["23:59","00:00"]
<strong>Output:</strong> 1
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> timePoints = ["00:00","23:59","00:00"]
<strong>Output:</strong> 0
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= timePoints.length &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>timePoints[i]</code> is in the format <strong>"HH:MM"</strong>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**
- Time complexity: <em>O(Max(n,24*60))</em>
- Space complexity: <em>O(24*60)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function(timePoints) {
    const MAX_MINUTE = 24 * 60;
    const n = timePoints.length;
    const times = Array(MAX_MINUTE + 1).fill(false);
    let result = MAX_MINUTE;
    let minTime = MAX_MINUTE;

    for (let index = 0; index < n; index++) {
        const [hour, minute] = timePoints[index].split(':');
        const time = hour * 60 + +minute;

        if (times[time]) return 0;
        times[time] = true;
        minTime = Math.min(time, minTime);
    }
    let previous = minTime;

    for (let time = 1; time < times.length; time++) {
        if (!times[time] || time === minTime) continue;

        result = Math.min(time - previous, result);
        previous = time;
    }
    const headTailDiff = minTime - previous + MAX_MINUTE;

    return Math.min(result, headTailDiff);
};
```
