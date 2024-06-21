# [552. Student Attendance Record II](https://leetcode.com/problems/student-attendance-record-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>An attendance record for a student can be represented as a string where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:</p>

<ul>
	<li><code>'A'</code>: Absent.</li>
	<li><code>'L'</code>: Late.</li>
	<li><code>'P'</code>: Present.</li>
</ul>

<p>Any student is eligible for an attendance award if they meet <strong>both</strong> of the following criteria:</p>

<ul>
	<li>The student was absent (<code>'A'</code>) for <strong>strictly</strong> fewer than 2 days <strong>total</strong>.</li>
	<li>The student was <strong>never</strong> late (<code>'L'</code>) for 3 or more <strong>consecutive</strong> days.</li>
</ul>

<p>Given an integer <code>n</code>, return <em>the <strong>number</strong> of possible attendance records of length</em> <code>n</code><em> that make a student eligible for an attendance award. The answer may be very large, so return it <strong>modulo</strong> </em><code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 2
<strong>Output:</strong> 8
<strong>Explanation:</strong> There are 8 records with length 2 that are eligible for an award:
"PP", "AP", "PA", "LP", "PL", "AL", "LA", "LL"
Only "AA" is not eligible because there are 2 absences (there need to be fewer than 2).
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 1
<strong>Output:</strong> 3
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> n = 10101
<strong>Output:</strong> 183236316
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**
- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {number}
 */
var checkRecord = function(n) {
    const MODULO = 10 ** 9 + 7;
    const present = Array(n + 1).fill(0);
    const late = Array(n + 1).fill(0);
    const absent = Array(n + 1).fill(0);

    present[1] = late[1] = absent[1] = 1;

    if (n > 1) {
        late[2] = present[1] + late[1] + absent[1]; // P, L, A
        absent[2] = present[1] + late[1]; // P, L
    }
    if (n > 2) absent[3] = (present[1] + late[1]) * 2; // PP, LL, PL, LP

    const sumTimes = (...nums) => nums.reduce((result, num) => (result + num) % MODULO);

    for (let index = 2; index <= n; index++) {
        const lastPresent = present[index - 1];
        const lastLate = late[index - 1];
        const lastAbsent = absent[index - 1];

        present[index] = sumTimes(lastPresent, lastLate, lastAbsent);
        if (index === 2) continue;

        late[index] = sumTimes(lastPresent, lastAbsent, present[index - 2], absent[index - 2]);
        if (index === 3) continue;

        absent[index] = sumTimes(absent[index - 1], absent[index - 2], absent[index - 3]);
    }
    return sumTimes(present[n], late[n], absent[n]);
};
```
