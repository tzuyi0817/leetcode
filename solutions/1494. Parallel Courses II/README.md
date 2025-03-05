# [1494. Parallel Courses II](https://leetcode.com/problems/parallel-courses-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer <code>n</code>, which indicates that there are <code>n</code> courses labeled from <code>1</code> to <code>n</code>. You are also given an array <code>relations</code> where <code>relations[i] = [prevCourse<sub>i</sub>, nextCourse<sub>i</sub>]</code>, representing a prerequisite relationship between course <code>prevCourse<sub>i</sub></code> and course <code>nextCourse<sub>i</sub></code>: course <code>prevCourse<sub>i</sub></code> has to be taken before course <code>nextCourse<sub>i</sub></code>. Also, you are given the integer <code>k</code>.</p>

<p>In one semester, you can take <strong>at most</strong> <code>k</code> courses as long as you have taken all the prerequisites in the <strong>previous</strong> semesters for the courses you are taking.</p>

<p>Return <em>the <strong>minimum</strong> number of semesters needed to take all courses</em>. The testcases will be generated such that it is possible to take every course.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/05/22/leetcode_parallel_courses_1.png" style="width: 269px; height: 147px;">
<pre><strong>Input:</strong> n = 4, relations = [[2,1],[3,1],[1,4]], k = 2
<strong>Output:</strong> 3
<strong>Explanation:</strong> The figure above represents the given graph.
In the first semester, you can take courses 2 and 3.
In the second semester, you can take course 1.
In the third semester, you can take course 4.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/05/22/leetcode_parallel_courses_2.png" style="width: 271px; height: 211px;">
<pre><strong>Input:</strong> n = 5, relations = [[2,1],[3,1],[4,1],[1,5]], k = 2
<strong>Output:</strong> 4
<strong>Explanation:</strong> The figure above represents the given graph.
In the first semester, you can only take courses 2 and 3 since you cannot take more than two per semester.
In the second semester, you can take course 4.
In the third semester, you can take course 1.
In the fourth semester, you can take course 5.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 15</code></li>
	<li><code>1 &lt;= k &lt;= n</code></li>
	<li><code>0 &lt;= relations.length &lt;= n * (n-1) / 2</code></li>
	<li><code>relations[i].length == 2</code></li>
	<li><code>1 &lt;= prevCourse<sub>i</sub>, nextCourse<sub>i</sub> &lt;= n</code></li>
	<li><code>prevCourse<sub>i</sub> != nextCourse<sub>i</sub></code></li>
	<li>All the pairs <code>[prevCourse<sub>i</sub>, nextCourse<sub>i</sub>]</code> are <strong>unique</strong>.</li>
	<li>The given graph is a directed acyclic graph.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Bit Manipulation`**

- Time complexity: <em>O(3<sup>n</sup>)</em>
- Space complexity: <em>O(2<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} relations
 * @param {number} k
 * @return {number}
 */
const minNumberOfSemesters = function (n, relations, k) {
  const totalMask = (1 << n) - 1;
  const courses = Array.from({ length: n + 1 }, () => 0);
  const dp = Array.from({ length: totalMask }, () => -1);

  for (const [prevCourse, nextCourse] of relations) {
    courses[nextCourse] |= 1 << (prevCourse - 1);
  }

  const countBits = num => {
    let result = 0;

    while (num > 0) {
      result += num & 1;
      num >>= 1;
    }

    return result;
  };

  const takeCourse = mask => {
    if (mask === totalMask) return 0;
    if (dp[mask] !== -1) return dp[mask];
    let takesMask = 0;
    let result = Number.MAX_SAFE_INTEGER;

    for (let course = 1; course <= n; course++) {
      const courseMask = 1 << (course - 1);

      if (mask & courseMask) continue;
      const needMask = courses[course];

      if ((mask & needMask) !== needMask) continue;

      takesMask |= courseMask;
    }

    for (let subset = takesMask; subset > 0; subset = (subset - 1) & takesMask) {
      if (countBits(subset) > k) continue;
      const semesters = 1 + takeCourse(mask | subset);

      result = Math.min(semesters, result);
    }

    dp[mask] = result;

    return result;
  };

  return takeCourse(0);
};
```
