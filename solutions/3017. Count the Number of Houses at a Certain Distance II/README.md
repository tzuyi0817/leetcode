# [3017. Count the Number of Houses at a Certain Distance II](https://leetcode.com/problems/count-the-number-of-houses-at-a-certain-distance-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given three <strong>positive</strong> integers <code>n</code>, <code>x</code>, and <code>y</code>.</p>

<p>In a city, there exist houses numbered <code>1</code> to <code>n</code> connected by <code>n</code> streets. There is a street connecting the house numbered <code>i</code> with the house numbered <code>i + 1</code> for all <code>1 &lt;= i &lt;= n - 1</code> . An additional street connects the house numbered <code>x</code> with the house numbered <code>y</code>.</p>

<p>For each <code>k</code>, such that <code>1 &lt;= k &lt;= n</code>, you need to find the number of <strong>pairs of houses</strong> <code>(house<sub>1</sub>, house<sub>2</sub>)</code> such that the <strong>minimum</strong> number of streets that need to be traveled to reach <code>house<sub>2</sub></code> from <code>house<sub>1</sub></code> is <code>k</code>.</p>

<p>Return <em>a <strong>1-indexed</strong> array </em><code>result</code><em> of length </em><code>n</code><em> where </em><code>result[k]</code><em> represents the <strong>total</strong> number of pairs of houses such that the <strong>minimum</strong> streets required to reach one house from the other is </em><code>k</code>.</p>

<p><strong>Note</strong> that <code>x</code> and <code>y</code> can be <strong>equal</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/12/20/example2.png" style="width: 474px; height: 197px;">
<pre><strong>Input:</strong> n = 3, x = 1, y = 3
<strong>Output:</strong> [6,0,0]
<strong>Explanation:</strong> Let's look at each pair of houses:
- For the pair (1, 2), we can go from house 1 to house 2 directly.
- For the pair (2, 1), we can go from house 2 to house 1 directly.
- For the pair (1, 3), we can go from house 1 to house 3 directly.
- For the pair (3, 1), we can go from house 3 to house 1 directly.
- For the pair (2, 3), we can go from house 2 to house 3 directly.
- For the pair (3, 2), we can go from house 3 to house 2 directly.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/12/20/example3.png" style="width: 668px; height: 174px;">
<pre><strong>Input:</strong> n = 5, x = 2, y = 4
<strong>Output:</strong> [10,8,2,0,0]
<strong>Explanation:</strong> For each distance k the pairs are:
- For k == 1, the pairs are (1, 2), (2, 1), (2, 3), (3, 2), (2, 4), (4, 2), (3, 4), (4, 3), (4, 5), and (5, 4).
- For k == 2, the pairs are (1, 3), (3, 1), (1, 4), (4, 1), (2, 5), (5, 2), (3, 5), and (5, 3).
- For k == 3, the pairs are (1, 5), and (5, 1).
- For k == 4 and k == 5, there are no pairs.
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/12/20/example5.png" style="width: 544px; height: 130px;">
<pre><strong>Input:</strong> n = 4, x = 1, y = 1
<strong>Output:</strong> [6,4,2,0]
<strong>Explanation:</strong> For each distance k the pairs are:
- For k == 1, the pairs are (1, 2), (2, 1), (2, 3), (3, 2), (3, 4), and (4, 3).
- For k == 2, the pairs are (1, 3), (3, 1), (2, 4), and (4, 2).
- For k == 3, the pairs are (1, 4), and (4, 1).
- For k == 4, there are no pairs.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= x, y &lt;= n</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number} x
 * @param {number} y
 * @return {number[]}
 */
const countOfPairs = function (n, x, y) {
  if (x > y) {
    return countOfPairs(n, y, x);
  }

  const result = Array.from({ length: n }, () => 0);
  const leftDis = x - 1;
  const rightDis = n - y;
  const ringDis = y - x + 1;

  combineVectors(result, bothInRing(n, ringDis));
  combineVectors(result, bothInSameLine(n, leftDis));
  combineVectors(result, bothInSameLine(n, rightDis));
  combineVectors(result, lineToRing(n, leftDis, ringDis));
  combineVectors(result, lineToRing(n, rightDis, ringDis));
  combineVectors(result, lineToLine(n, x, y, leftDis, rightDis));

  return result.map(val => val * 2);
};

function bothInRing(n, ringDis) {
  const result = Array.from({ length: n }, () => 0);
  const center = Math.floor((ringDis - 1) / 2);

  for (let k = 1; k <= center; k++) {
    result[k - 1] += ringDis;
  }

  if (ringDis % 2 === 0) {
    const halfRing = ringDis / 2;

    result[halfRing - 1] += halfRing;
  }

  return result;
}

function bothInSameLine(n, dis) {
  const result = Array.from({ length: n }, () => 0);

  for (let k = 1; k <= dis; k++) {
    result[k - 1] += dis - k;
  }

  return result;
}

function lineToRing(n, dis, ringDis) {
  const result = Array.from({ length: n }, () => 0);
  const halfRing = Math.floor(ringDis / 2);

  for (let k = 1; k <= dis + ringDis; k++) {
    const maxRingDis = Math.min(k - 1, halfRing);
    const minRingDis = Math.max(0, k - dis);

    if (minRingDis > maxRingDis) continue;

    result[k - 1] += (maxRingDis - minRingDis + 1) * 2;

    if (minRingDis === 0) {
      result[k - 1] -= 1;
    }

    if (maxRingDis * 2 === ringDis) {
      result[k - 1] -= 1;
    }
  }

  return result;
}

function lineToLine(n, x, y, leftDis, ringDis) {
  const result = Array.from({ length: n }, () => 0);
  const hasBridge = x === y ? 0 : 1;

  for (let k = 1; k <= leftDis + ringDis + 2; k++) {
    const maxLeftDis = Math.min(leftDis, k - 1 - hasBridge);
    const minLeftDis = Math.max(1, k - ringDis - hasBridge);

    if (minLeftDis <= maxLeftDis) {
      result[k - 1] += maxLeftDis - minLeftDis + 1;
    }
  }

  return result;
}

function combineVectors(a, b) {
  const n = a.length;

  for (let index = 0; index < n; index++) {
    a[index] += b[index];
  }
}
```
