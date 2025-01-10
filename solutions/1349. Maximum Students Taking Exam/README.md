# [1349. Maximum Students Taking Exam](https://leetcode.com/problems/maximum-students-taking-exam)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a <code>m&nbsp;* n</code>&nbsp;matrix <code>seats</code>&nbsp;&nbsp;that represent seats distributions&nbsp;in a classroom.&nbsp;If a seat&nbsp;is&nbsp;broken, it is denoted by <code>'#'</code> character otherwise it is denoted by a <code>'.'</code> character.</p>

<p>Students can see the answers of those sitting next to the left, right, upper left and upper right, but he cannot see the answers of the student sitting&nbsp;directly in front or behind him. Return the <strong>maximum </strong>number of students that can take the exam together&nbsp;without any cheating being possible.</p>

<p>Students must be placed in seats in good condition.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img height="200" src="https://assets.leetcode.com/uploads/2020/01/29/image.png" width="339">
<pre><strong>Input:</strong> seats = [["#",".","#","#",".","#"],
&nbsp;               [".","#","#","#","#","."],
&nbsp;               ["#",".","#","#",".","#"]]
<strong>Output:</strong> 4
<strong>Explanation:</strong> Teacher can place 4 students in available seats so they don't cheat on the exam. 
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> seats = [[".","#"],
&nbsp;               ["#","#"],
&nbsp;               ["#","."],
&nbsp;               ["#","#"],
&nbsp;               [".","#"]]
<strong>Output:</strong> 3
<strong>Explanation:</strong> Place all students in available seats. 

</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> seats = [["#",".","<strong>.</strong>",".","#"],
&nbsp;               ["<strong>.</strong>","#","<strong>.</strong>","#","<strong>.</strong>"],
&nbsp;               ["<strong>.</strong>",".","#",".","<strong>.</strong>"],
&nbsp;               ["<strong>.</strong>","#","<strong>.</strong>","#","<strong>.</strong>"],
&nbsp;               ["#",".","<strong>.</strong>",".","#"]]
<strong>Output:</strong> 10
<strong>Explanation:</strong> Place students in available seats in column 1, 3 and 5.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>seats</code>&nbsp;contains only characters&nbsp;<code>'.'<font face="sans-serif, Arial, Verdana, Trebuchet MS">&nbsp;and</font></code><code>'#'.</code></li>
	<li><code>m ==&nbsp;seats.length</code></li>
	<li><code>n ==&nbsp;seats[i].length</code></li>
	<li><code>1 &lt;= m &lt;= 8</code></li>
	<li><code>1 &lt;= n &lt;= 8</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(m\*2<sup>2n</sup>)</em>
- Space complexity: <em>O(m+2<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {character[][]} seats
 * @return {number}
 */
const maxStudents = function (seats) {
  const BROKEN_SEAT = '#';
  const m = seats.length;
  const n = seats[0].length;
  const brokenMask = Array.from({ length: m }, () => 0);

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const seat = seats[row][col];

      if (seat !== BROKEN_SEAT) continue;
      brokenMask[row] |= 1 << col;
    }
  }
  const maxMask = 1 << n;
  const maskCount = Array.from({ length: maxMask }, () => 0);

  for (let mask = 0; mask < maxMask; mask++) {
    maskCount[mask] = maskCount[mask >> 1] + (mask & 1);
  }
  let dp = Array.from({ length: maxMask }, () => 0);

  for (let row = 0; row < m; row++) {
    const nextDp = Array.from({ length: maxMask }, () => 0);

    for (let mask = 0; mask < maxMask; mask++) {
      if (mask & (mask << 1)) continue;
      if (mask & brokenMask[row]) continue;

      for (let prevMask = 0; prevMask < maxMask; prevMask++) {
        const prev = (prevMask << 1) | (prevMask >> 1);

        if (mask & prev) continue;
        nextDp[mask] = Math.max(dp[prevMask] + maskCount[mask], nextDp[mask]);
      }
    }
    dp = nextDp;
  }
  return Math.max(...dp);
};
```
