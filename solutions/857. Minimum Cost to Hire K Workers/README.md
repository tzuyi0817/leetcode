# [857. Minimum Cost to Hire K Workers](https://leetcode.com/problems/minimum-cost-to-hire-k-workers)

## Description

<div class="elfjS" data-track-load="description_content"><p>There are <code>n</code> workers. You are given two integer arrays <code>quality</code> and <code>wage</code> where <code>quality[i]</code> is the quality of the <code>i<sup>th</sup></code> worker and <code>wage[i]</code> is the minimum wage expectation for the <code>i<sup>th</sup></code> worker.</p>

<p>We want to hire exactly <code>k</code> workers to form a <strong>paid group</strong>. To hire a group of <code>k</code> workers, we must pay them according to the following rules:</p>

<ol>
	<li>Every worker in the paid group must be paid at least their minimum wage expectation.</li>
	<li>In the group, each worker's pay must be directly proportional to their quality. This means if a worker’s quality is double that of another worker in the group, then they must be paid twice as much as the other worker.</li>
</ol>

<p>Given the integer <code>k</code>, return <em>the least amount of money needed to form a paid group satisfying the above conditions</em>. Answers within <code>10<sup>-5</sup></code> of the actual answer will be accepted.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> quality = [10,20,5], wage = [70,50,30], k = 2
<strong>Output:</strong> 105.00000
<strong>Explanation:</strong> We pay 70 to 0<sup>th</sup> worker and 35 to 2<sup>nd</sup> worker.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> quality = [3,1,10,10,1], wage = [4,8,2,2,7], k = 3
<strong>Output:</strong> 30.66667
<strong>Explanation:</strong> We pay 4 to 0<sup>th</sup> worker, 13.33333 to 2<sup>nd</sup> and 3<sup>rd</sup> workers separately.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == quality.length == wage.length</code></li>
	<li><code>1 &lt;= k &lt;= n &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= quality[i], wage[i] &lt;= 10<sup>4</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy + Priority Queue`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} quality
 * @param {number[]} wage
 * @param {number} k
 * @return {number}
 */
const mincostToHireWorkers = function (quality, wage, k) {
  const n = quality.length;
  const workers = quality.map((q, index) => {
    return { perQualityWage: wage[index] / q, quality: q };
  });

  workers.sort((a, b) => a.perQualityWage - b.perQualityWage);

  const qualities = new MaxPriorityQueue();

  let currentTotalQuality = 0;

  for (let index = 0; index < k; index++) {
    const { quality } = workers[index];

    qualities.enqueue(quality);
    currentTotalQuality += quality;
  }
  let result = currentTotalQuality * workers[k - 1].perQualityWage;

  for (let index = k; index < n; index++) {
    const worker = workers[index];
    const maxQuality = qualities.front().element;

    if (maxQuality > worker.quality) {
      qualities.dequeue();
      qualities.enqueue(worker.quality);
      currentTotalQuality += worker.quality - maxQuality;
    }
    const totalWage = currentTotalQuality * worker.perQualityWage;

    result = Math.min(totalWage, result);
  }
  return result;
};
```
